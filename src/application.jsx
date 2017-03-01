import React from 'react';
import ReactDOM from 'react-dom';
import {remote as Remote} from 'electron';
import ReactBootstrapSlider from 'react-bootstrap-slider';


class CountLabel extends React.Component {
  constructor() {
    super();
    this.state = {count: 0};
  }
  componentDidMount() {
    this.setState({disabled: true});
  }
  increment() {
    this.setState((prevState, props)=>{
      return {count: prevState.count+1};
    });
  }
  formatter(v) {
    switch (v) {
    case 0:
      return "no clicks"
    case 1:
      return "1 click"
    default:
      return v + " clicks!"
    }
  }
  render() {
    return (
      <ReactBootstrapSlider
          value={this.state.count}
          min={0}
          max={100}
          ticks={[0, 50, 100]}
          ticks_labels={["0", "50", "100"]}
          tooltip_position="bottom"
          formatter={(v)=>this.formatter(v)}
          disabled={this.state.disabled? "disabled": ""} />
    );
  }
}


class Application extends React.Component {
  onClick() {
    this.refs.countLabel.increment();
  }
  render() {
    return (
      <div>
        <button type="button" className="btn btn-primary" onClick={()=>{this.onClick()}}>{this.props.label}</button>
        <CountLabel ref="countLabel" />
      </div>
    );
  }
}


const CommandArguments = Remote.getGlobal("sharedObject").commandArguments;
ReactDOM.render(
  <Application label={CommandArguments.label} />,
  document.getElementById('application')
);

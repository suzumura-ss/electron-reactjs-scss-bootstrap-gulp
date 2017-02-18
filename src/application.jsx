import React from 'react';
import ReactDOM from 'react-dom';
import {remote as Remote} from 'electron';


class CountLabel extends React.Component {
  constructor() {
    super();
    this.state = {count: 0};
  }
  increment() {
    this.setState((prevState, props)=>{
      return {count: prevState.count+1};
    });
  }
  render() {
    return (<span className="label label-info">{this.state.count}</span>);
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

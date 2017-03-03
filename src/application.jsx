import React from 'react';
import ReactDOM from 'react-dom';
import {remote as Remote} from 'electron';
import ReactBootstrapSlider from 'react-bootstrap-slider';
import { AlertList, Alert } from "react-bs-notifier";


class CountLabel extends React.Component {
  constructor() {
    super();
    this.state = {count: 0};
  }
  componentDidMount() {
    this.setState({disabled: this.props.disabled});
  }
  increment() {
    this.setState((prevState, props)=>{
      this.props.theApp.alert(prevState.count+1);
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
  changeValue(e) {
    this.props.theApp.alert(e.target.value);
    this.setState((prevState, props)=>{
      return {count: e.target.value};
    });
  }
  render() {
    return (
      <div>
        <span className='label label-info'>{this.state.count}</span>
        <ReactBootstrapSlider
            value={this.state.count}
            min={0}
            max={100}
            ticks={[0, 50, 100]}
            ticks_labels={["0", "50", "100"]}
            tooltip_position="bottom"
            formatter={this.formatter.bind(this)}
            change={this.changeValue.bind(this)}
            disabled={this.state.disabled? "disabled": ""} />
      </div>
    );
  }
}


class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      alerts: []
    };
  }
  onClick() {
    this.refs.countLabel.increment();
  }
  alert(msg) {
    this.setState((prevState, props)=>{
      var alerts = prevState.alerts;
      alerts.unshift({
        id: new Date().getTime(),
        type: "success",
        message: msg
      });
      return {alerts};
    });
  }
  onAlertDismissed(alert) {
    const alerts = this.state.alerts;
    // find the index of the alert that was dismissed
    const idx = alerts.indexOf(alert);
    if (idx >= 0) {
      this.setState({
        // remove the alert from the array
        alerts: [...alerts.slice(0, idx), ...alerts.slice(idx + 1)]
      });
    }
  }
  render() {
    return (
      <div>
        <button type="button" className="btn btn-primary" onClick={this.onClick.bind(this)}>{this.props.label}</button>
        <CountLabel ref="countLabel" disabled={false} theApp={this} />
        <AlertList
          alerts={this.state.alerts}
          timeout={3000}
          onDismiss={this.onAlertDismissed.bind(this)} />
      </div>
    );
  }
}


const CommandArguments = Remote.getGlobal("sharedObject").commandArguments;
ReactDOM.render(
  <Application label={CommandArguments.label} />,
  document.getElementById('application')
);

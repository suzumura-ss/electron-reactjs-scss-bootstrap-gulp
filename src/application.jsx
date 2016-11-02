const React = require('react');
const ReactDOM = require('react-dom');
const Remote = require('electron').remote;

class Application extends React.Component {
  render() {
    return <button type="button" className="btn btn-primary">{this.props.label}</button>
  }
}

ReactDOM.render(
  <Application label={Remote.getGlobal("sharedObject").commandArguments[0] || "world"}/>,
  document.getElementById('application')
);

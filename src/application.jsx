//-----------------------------------------------------------------------------
// Action
const ClickActionTypes = {
  Increment: 'INCREMENT'
}
const ClickActions = {
  increment() {
    ClickDispatcher.dispatch({type: ClickActionTypes.Increment})
  }
}


//-----------------------------------------------------------------------------
// Dispatcher
import {Dispatcher} from 'flux';
const ClickDispatcher = new Dispatcher();


//-----------------------------------------------------------------------------
// Store
import Immutable from 'immutable';
import {ReduceStore} from 'flux/utils';

class ClickStoreBase extends ReduceStore {
  constructor() {
    super(ClickDispatcher);
  }

  getInitialState() {
    return Immutable.Map({count: 0});
  }

  reduce(state, action) {
    switch (action.type) {
    case ClickActionTypes.Increment:
      return state.update("count", (c)=>{
        return c+1;
      });
    default:
      return state;
    }
  }
}
const ClickStore = new ClickStoreBase();


//-----------------------------------------------------------------------------
// View(Container)
import {Container} from 'flux/utils';
import {remote as Remote} from 'electron';

function getStores() {
  return [ ClickStore ];
}

function getState() {
  return {
    click: ClickStore.getState(),
    onIncrement: ClickActions.increment,
  };
}

const ButtonLabel = Remote.getGlobal("sharedObject").commandArguments.label;
function AppView(props) {
  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={()=>props.onIncrement()}>{ButtonLabel}</button>
      <span className="label label-info">{props.click.get("count")}</span>
    </div>
  );
}
const AppContainer = Container.createFunctional(AppView, getStores, getState);


//-----------------------------------------------------------------------------
// Entry
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<AppContainer />, document.getElementById('application'));

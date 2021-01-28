import './App.css';
import React from 'react';

import EditableTimerList from './components/EditableTimerList';
import ToggleableTimerForm from './components/ToggleableTimerForm';
import { newTimer } from './utils/helpers';
import { getTimers } from './network/client';

class App extends React.Component {
  state = {
    timers: [],
  };

  componentDidMount() {
    console.log( `App > componentDidMount` );
    this.loadTimersFromServer();
    setInterval( this.loadTimersFromServer, 5000 );
  }

  loadTimersFromServer = () => {
    getTimers( ( serverTimers ) => {
      console.log( `App > loadTimersFromServer > ${serverTimers}` );
      this.setState( { timers: serverTimers } );
    } );
  };

  handleCreateFormSubmit = ( timer ) => {
    this.createTimer( timer );
  };

  createTimer = ( timer ) => {
    const t = newTimer( timer );
    this.setState( {
      timers: this.state.timers.concat( t )
    } );
  };

  handleEditFormSubmit = ( attrs ) => {
    this.updateTimer( attrs );
  };

  handleTrashClick = ( timerId ) => {
    this.setState( {
      timers: this.state.timers.filter( t => t.id !== timerId )
    } );
  };

  handleStartClick = ( timerId ) => {
    this.startTimer( timerId );
  };

  handleStopClick = ( timerId ) => {
    this.stopTimer( timerId );
  };

  startTimer = ( timerId ) => {
    const now = Date.now();

    this.setState( {
      timers: this.state.timers.map( ( timer ) => {
        if ( timer.id === timerId ) {
          return Object.assign( {}, timer, {
            runningSince: now,
          } );
        } else {
          return timer;
        }
      } )
    } );
  };

  stopTimer = ( timerId ) => {
    const now = Date.now();

    this.setState( {
      timer: this.state.timers.map( ( timer ) => {
        if ( timer.id === timerId ) {
          const lastElapsed = now - timer.runningSince;
          return Object.assign( {}, timer, {
            elapsed: timer.elapsed + lastElapsed,
            runningSince: null,
          } );
        } else {
          return timer;
        }
      } )
    } );
  };

  updateTimer = ( attrs ) => {
    this.setState( {
      timers: this.state.timers.map( ( timer ) => {
        if ( timer.id === attrs.id ) {
          return Object.assign( {}, timer, {
            title: attrs.title,
            project: attrs.project,
          } );
        } else {
          return timer;
        }
      } )
    } );
  };

  render() {
    return (
      <div className="ui three column centered grid">
        <div className="column">
          <EditableTimerList
            timers={ this.state.timers }
            onFormSubmit={ this.handleEditFormSubmit }
            onTrashClick={ this.handleTrashClick }
            onStartClick={ this.handleStartClick }
            onStopClick={ this.handleStopClick }
          />
          <ToggleableTimerForm
            onFormSubmit={ this.handleCreateFormSubmit }
            isOpen={ false }
          />
        </div>
      </div>
    );
  }
};

export default App;
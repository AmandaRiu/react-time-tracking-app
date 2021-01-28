import './App.css';
import React from 'react';

import EditableTimerList from './components/EditableTimerList';
import ToggleableTimerForm from './components/ToggleableTimerForm';
import { newTimer } from './utils/helpers';
import * as client from './network/client';

class App extends React.Component {
  state = {
    timers: [],
  };

  componentDidMount() {
    this.loadTimersFromServer();
    this.interval = setInterval( this.loadTimersFromServer, 5000 );
  }

  componentWillUnmount() {
    clearInterval( this.interval );
  }

  /**
   * Request timers from the API and load
   * result into state. 
   */
  loadTimersFromServer = () => {
    client.getTimers( ( serverTimers ) => {
      this.setState( { timers: serverTimers } );
    } );
  };

  createTimer = ( timer ) => {
    const t = newTimer( timer );
    this.setState( {
      timers: this.state.timers.concat( t )
    } );

    client.createTimer( t );
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

    client.startTimer( { id: timerId, start: now } );
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

    client.stopTimer( { id: timerId, stop: now } );
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

    client.updateTimer( attrs );
  };

  handleCreateFormSubmit = ( timer ) => {
    this.createTimer( timer );
  };

  handleEditFormSubmit = ( attrs ) => {
    this.updateTimer( attrs );
  };

  handleStartClick = ( timerId ) => {
    this.startTimer( timerId );
  };

  handleStopClick = ( timerId ) => {
    this.stopTimer( timerId );
  };

  handleTrashClick = ( timerId ) => {
    this.setState( {
      timers: this.state.timers.filter( t => t.id !== timerId )
    } );
    client.deleteTimer( { id: timerId } );
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
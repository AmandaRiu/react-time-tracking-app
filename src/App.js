import './App.css';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import EditableTimerList from './components/EditableTimerList';
import ToggleableTimerForm from './components/ToggleableTimerForm';
import { newTimer } from './utils/helpers';

function App() {
  const [ timers, setTimers ] = useState( [
    {
      title: 'Practice squat',
      project: 'Gym chores',
      id: uuidv4(),
      elapsed: 5456099,
      runningSince: Date.now(),
    },
    {
      title: 'Bake squash',
      project: 'Kitchen chores',
      id: uuidv4(),
      elapsed: 1273998,
      runningSince: null,
    },
  ] );

  const handleCreateFormSubmit = ( timer ) => {
    createTimer( timer );
  };

  const createTimer = ( timer ) => {
    const t = newTimer( timer );
    setTimers( timers.concat( t ) );
  };

  const handleEditFormSubmit = ( attrs ) => {
    updateTimer( attrs );
  };

  const handleTrashClick = ( timerId ) => {
    setTimers( timers.filter( t => t.id !== timerId ) );
  };

  const handleStartClick = ( timerId ) => {
    startTimer( timerId );
  };

  const handleStopClick = ( timerId ) => {
    stopTimer( timerId );
  };

  const startTimer = ( timerId ) => {
    const now = Date.now();

    setTimers( timers.map( ( timer ) => {
      if ( timer.id === timerId ) {
        return Object.assign( {}, timer, {
          runningSince: now,
        } );
      } else {
        return timer;
      }
    } ) );
  };

  const stopTimer = ( timerId ) => {
    const now = Date.now();

    setTimers( timers.map( ( timer ) => {
      if ( timer.id === timerId ) {
        const lastElapsed = now - timer.runningSince;
        return Object.assign( {}, timer, {
          elapsed: timer.elapsed + lastElapsed,
          runningSince: null,
        } );
      } else {
        return timer;
      }
    } ) );
  };

  const updateTimer = ( attrs ) => {
    setTimers( timers.map( ( timer ) => {
      if ( timer.id === attrs.id ) {
        return Object.assign( {}, timer, {
          title: attrs.title,
          project: attrs.project,
        } );
      } else {
        return timer;
      }
    } ) );
  };

  return (
    <div className="ui three column centered grid">
      <div className="column">
        <EditableTimerList
          timers={ timers }
          onFormSubmit={ handleEditFormSubmit }
          onTrashClick={ handleTrashClick }
          onStartClick={ handleStartClick }
          onStopClick={ handleStopClick }
        />
        <ToggleableTimerForm
          onFormSubmit={ handleCreateFormSubmit }
          isOpen={ false }
        />
      </div>
    </div>
  );
};

export default App;

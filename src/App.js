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

  return (
    <div className="ui three column centered grid">
      <div className="column">
        <EditableTimerList
          timers={ timers }
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

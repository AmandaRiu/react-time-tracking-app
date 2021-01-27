import './App.css';
import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import EditableTimerList from './components/EditableTimerList';
import ToggleableTimerForm from './components/ToggleableTimerForm';

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

  return (
    <div className="ui three column centered grid">
      <div className="column">
        <EditableTimerList
          timers={ timers }
        />
        <ToggleableTimerForm
          isOpen={ false }
        />
      </div>
    </div>
  );
}

export default App;

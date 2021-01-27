import './App.css';
import React from 'react';

import EditableTimerList from './components/EditableTimerList';
import ToggleableTimerForm from './components/ToggleableTimerForm';

function App() {
  return (
    <div className="ui three column centered grid">
      <div className="column">
        <EditableTimerList />
        <ToggleableTimerForm
          isOpen={ false }
        />
      </div>
    </div>
  );
}

export default App;

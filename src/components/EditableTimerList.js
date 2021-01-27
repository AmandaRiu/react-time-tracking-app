import React from 'react';

import EditableTimer from './EditableTimer';

export default class EditableTimerList extends React.Component {
    render() {
        const { timers } = this.props;
        const timerElements = timers.map( ( timer ) => (
            <EditableTimer
                key={ timer.id }
                id={ timer.id }
                title={ timer.title }
                project={ timer.project }
                elapsed={ timer.elapsed }
                runningSince={ timer.runningSince ? timer.runningSince : null }
                onFormSubmit={ this.props.onFormSubmit }
                onTrashClick={ this.props.onTrashClick }
                onStartClick={ this.props.onStartClick }
                onStopClick={ this.props.onStopClick }
            />
        ) );
        return (
            <div id='timers'>
                { timerElements }
            </div>
        );
    }
}
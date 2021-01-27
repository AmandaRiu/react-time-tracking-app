import React from 'react';

import TimerForm from './TimerForm';
import Timer from './Timer';

export default class EditableTimer extends React.Component {
    render() {
        const {
            editFormOpen,
            title,
            project,
            elapsed,
            runningSince
        } = this.props;

        if ( editFormOpen ) {
            return (
                <TimerForm
                    title={ title }
                    project={ project }
                />
            );
        } else {
            return (
                <Timer
                    title={ title }
                    project={ project }
                    elapsed={ elapsed }
                    runningSince={ runningSince }
                />
            );
        }
    }
}
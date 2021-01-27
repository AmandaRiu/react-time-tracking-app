import React from 'react';

import TimerForm from './TimerForm';
import Timer from './Timer';

export default class EditableTimer extends React.Component {
    state = {
        editFormOpen: false,
    };

    render() {
        const {
            id,
            title,
            project,
            elapsed,
            runningSince
        } = this.props;

        if ( this.state.editFormOpen ) {
            return (
                <TimerForm
                    id={ id }
                    title={ title }
                    project={ project }
                />
            );
        } else {
            return (
                <Timer
                    id={ id }
                    title={ title }
                    project={ project }
                    elapsed={ elapsed }
                    runningSince={ runningSince }
                />
            );
        }
    }
}
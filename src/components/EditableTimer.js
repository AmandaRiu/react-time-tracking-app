import React from 'react';

import TimerForm from './TimerForm';
import Timer from './Timer';

export default class EditableTimer extends React.Component {
    state = {
        editFormOpen: false,
    };

    handleEditClick = () => {
        this.openForm();
    };

    handleFormClose = () => {
        this.closeForm();
    };

    handleSubmit = ( timer ) => {
        this.props.onFormSubmit( timer );
        this.closeForm();
    };

    closeForm = () => {
        this.setState( { editFormOpen: false } );
    };

    openForm = () => {
        this.setState( { editFormOpen: true } );
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
                    onFormSubmit={ this.handleSubmit }
                    onFormClose={ this.handleFormClose }
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
                    onEditClick={ this.handleEditClick }
                />
            );
        }
    }
}
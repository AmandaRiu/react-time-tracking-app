import React from 'react';

import { renderElapsedString } from "../utils/helpers";

export default function Timer( props ) {
    const elapsedString = renderElapsedString( props.elapsed );

    const handleTrashClick = () => {
        props.onTrashClick( props.id );
    };

    return (
        <div className='ui centered card'>
            <div className='content'>
                <div className='header'>
                    { props.title }
                </div>
                <div className='meta'>
                    { props.project }
                </div>
                <div className='center aligned description'>
                    <h2>
                        { elapsedString }
                    </h2>
                </div>
                <div className='extra content'>
                    <span
                        className='right floated edit icon'
                        onClick={ props.onEditClick }
                    >
                        <i className='edit icon' />
                    </span>
                    <span
                        className='right floated trash icon'
                        onClick={ handleTrashClick }
                    >
                        <i className='trash icon' />
                    </span>
                </div>
            </div>
            <div className='ui bottom attached blue basic button'>
                Start
            </div>
        </div>
    );
}
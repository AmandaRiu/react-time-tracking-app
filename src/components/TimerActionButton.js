import React from 'react';

export default function TimerActionButton( props ) {
    return (
        <div>
            {props.timerIsRunning
                ? <div className='ui bottom attached red basic button' onClick={ props.onStopClick }>Stop</div>
                : <div className='ui bottom attached green basic button' onClick={ props.onStartClick }>Start</div>
            }
        </div>
    );
}
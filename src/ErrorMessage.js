import React from 'react';

export default function ErrorMessage(props) {
    if (!props.isDisplayed) return null;
    return (
        <div style={{color: 'red', fontSize: '.9em'}}>
            User must select an answer to submit.
        </div>
    );
}
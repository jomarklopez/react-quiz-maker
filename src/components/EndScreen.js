import React from 'react';

const EndScreen = (props) => {
    return (
        <div class="ui centered raised card">
            <div class="content">
                {props.content}
            </div>
            <div class="extra content">
                {props.actions}
            </div>
        </div>
    )
};

export default EndScreen;
import React from 'react';

class StackedCards extends React.Component {

    constructor(content) {
        super();
        this.content = content;
    }

    render() {
        return (
            <div className="content">
                <div className="ui card centered">
                    <div className="content">
                        {this.props.content}
                    </div>
                </div>
            </div>
        )
    }
}

export default StackedCards;
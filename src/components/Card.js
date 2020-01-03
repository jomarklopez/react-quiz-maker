import React from 'react';

class Card extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="ui card centered card-item">
                <div className="content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export default Card;
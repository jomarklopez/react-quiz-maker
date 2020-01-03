import React from 'react';
//import '../styles/stackedCards.css';

class StackedCards extends React.Component {
    state = {
        items: 3,
        elementsMargin: 10,
    }

    render() {
        return (
            <>
                <div id="stacked-cards-block" className="content stackedcards stackedcards--animatable init">
                    <div className="stackedcards-container">
                        {this.props.children}
                    </div>
                </div>
                <div class="global-actions">
                    <div class="left-action">Left</div>
                    <div class="top-action">Top</div>
                    <div class="right-action">Right</div>
                </div>
            </>
        )
    }
}

export default StackedCards;
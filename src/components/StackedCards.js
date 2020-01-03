import React from 'react';
//import '../styles/stackedCards.css';

class StackedCards extends React.Component {
    state = {
        items: 3,
        elementsMargin: 10,
    }

    constructor() {
        super();
    }

    render() {
        return (
            <>
                <div id="stacked-cards-block" className="content stackedcards stackedcards--animatable init">
                    <div className="stackedcards-container" style={{ marginBottom: "30px" }}>
                        {this.props.children}
                    </div>
                    <div class="stackedcards--animatable stackedcards-overlay top">TOP</div>
                    <div class="stackedcards--animatable stackedcards-overlay right">RIGHT</div>
                    <div class="stackedcards--animatable stackedcards-overlay left">LEFT</div>
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

/* const stackTheCards = () => {
    for (i = items; i < maxElements; i++) {
        listElNodesObj[i].style.zIndex = 0;
        listElNodesObj[i].style.opacity = 0;
        listElNodesObj[i].style.webkitTransform = 'scale(' + (1 - (items * 0.04)) + ') translateX(0) translateY(' + elTrans + 'px) translateZ(0)';
        listElNodesObj[i].style.transform = 'scale(' + (1 - (items * 0.04)) + ') translateX(0) translateY(' + elTrans + 'px) translateZ(0)';
    }
} */

export default StackedCards;
import React from 'react';
import classNames from 'classnames';
import '../styles/stackedCards.css';

class StackedCards extends React.Component {
    constructor(props) {
        super(props);
        this.elTrans = null;
        this.items = 3; //Number of visible elements when the stacked options are bottom or top.
        this.elementsMargin = 10; //Define the distance of each element when the stacked options are bottom or top.
        this.state = {
        };
    }

    componentDidMount() {
        // If the number of items visible declared is greater than the number of cards available, make it so that the visible cards matches the number of cards available.
        /* this.setState({ maxElements: React.Children.count(this.listElNodesObj) })
        if (this.state.items > this.state.maxElements) {
            this.setState({ items: this.state.maxElements })
        } */
    }

    componentDidUpdate() {
        // Update listElNodesObj
        // Set the current element obj
        //this.setState({ currentElementObj: this.state.listElNodesObj[this.state.currentPosition] });
    }

    renderCards() {
        var cardList = this.props.children;

        this.elTrans = 0;
        let elZindex = 5;
        let elScale = 1;
        let elOpac = 1;
        let elTransTop = this.items;
        let elTransInc = this.elementsMargin;
        let addedClass = 'stackedcards-top stackedcards--animatable stackedcards-origin-top';

        const clones = React.Children.map(cardList, child => {
            this.elTrans = elTransInc * elTransTop;
            elTransTop--;
            const clone = React.cloneElement(child, {
                className: classNames(child.props.className, addedClass),
                style: {
                    transform: `scale(${elScale}) translateX(0px) translateY(${this.elTrans - elTransInc}px) translateZ(0px)`,
                    WebkitTransform: `scale(${elScale}) translateX(0px) translateY(${this.elTrans - elTransInc}px) translateZ(0px)`,
                    opacity: elOpac,
                    zIndex: elZindex
                }
            });
            elScale = elScale - 0.04;
            elOpac = elOpac - (1 / this.items);
            elZindex--;
            return clone;
        });
        return clones;
    }

    render() {
        return (
            <>
                <div id="stacked-cards-block" className="content stackedcards stackedcards--animatable init">
                    <div className="stackedcards-container">
                        {this.renderCards()}
                    </div>
                </div>
            </>
        )
    }
}

export default StackedCards;
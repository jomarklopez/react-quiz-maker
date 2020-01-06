import React from 'react';
import classNames from 'classnames';
import '../styles/stackedCards.css';

class StackedCards extends React.Component {
    constructor(props) {
        super(props);
        this.contentList = [];
        this.currentPosition = 0;
        this.items = 3;
        this.elementsMargin = 10;
        this.currentCard = React.createRef();
        this.state = {
            currentPosition: 0
        }
    }

    onClickLeft() {
        // Rotation to left still not working.
        /*  this.currentCard.current.style.transform = `translateX(" ${-1000} "px) translateY("${this.elTrans}"px) translateZ(0) rotate(" + rotateElement + "deg)`;
         this.swipeLeftAnimate(-1000, 0, 0, this.currentCard.current); */
        this.setState({ currentPosition: this.state.currentPosition + 1 });
    }

    swipeLeftAnimate(moveX, moveY, opacity, elementObj) {
        let element = elementObj;
        let rotateElement = RotateRegulator(moveX);
        console.log(element);

        // Function to set rotate direction 
        function RotateRegulator(value) {
            if (value / 10 > 15) {
                return 15; // Rotate to the right
            }
            else if (value / 10 < -15) {
                return -15; // Rotate to the left
            }
            return value / 10;
        }

        this.elTrans = this.elementsMargin * (this.items - 1);
        if (element) {
            element.style.WebkitTransform = "translateX(" + moveX + "px) translateY(" + (moveY + this.elTrans) + "px) translateZ(0) rotate(" + rotateElement + "deg)";
            element.style.transform = "translateX(" + moveX + "px) translateY(" + (moveY + this.elTrans) + "px) translateZ(0) rotate(" + rotateElement + "deg)";
            element.style.opacity = opacity;
        }
    };

    renderCardStackStyle(cards) {

        this.elTrans = 0;
        this.maxElements = cards.length;
        let elZindex = 5;
        let elScale = 1;
        let elOpac = 1;
        let elTransTop = this.items;
        let elTransInc = this.elementsMargin;
        let addedClass = 'stackedcards-top stackedcards--animatable stackedcards-origin-top';

        // Cards container
        let clones = [];

        for (let i = this.state.currentPosition; i < this.maxElements; i++) {
            if (i < (this.state.currentPosition + this.items)) {
                // Set the style for each cards in the view
                const element = cards[i];
                if (element) {
                    //console.log(i + ' is less than ' + (this.currentPosition + this.items));
                    this.elTrans = elTransInc * elTransTop;
                    elTransTop--;
                    const clone = React.cloneElement(element, {
                        className: classNames(element.props.className, addedClass),
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
                    clones.push(clone);
                }
            } else {
                // Set the style for each cards in the outside of the set view
                const element = cards[i];
                let elTrans = this.elementsMargin * (this.items - 1);
                if (element) {
                    const clone = React.cloneElement(element, {
                        className: classNames(element.props.className, addedClass),
                        style: {
                            transform: `scale(${1 - (this.items * 0.04)}) translateX(0px) translateY(${elTrans}px) translateZ(0px)`,
                            WebkitTransform: `scale(${1 - (this.items * 0.04)}) translateX(0px) translateY(${elTrans}px) translateZ(0px)`,
                            opacity: 0,
                            zIndex: 0
                        }
                    });
                    clones.push(clone);
                }
            }

        }
        return clones;
    }

    componentDidMount() {

    }

    renderCards(contentList) {
        this.contentList = contentList;
        // Insert content to cards and put ref to currentCard
        const cards = this.contentList.map(content => {
            if (Number(content.key) === this.state.currentPosition) {
                return (
                    <div
                        className="ui card card-item"
                        ref={this.currentCard}
                        key={content.key}
                    >
                        {content}
                    </div>
                )
            } else {
                return (
                    <div
                        className="ui card card-item"
                        key={content.key}
                    >
                        {content}
                    </div>
                )
            }
        })

        return this.renderCardStackStyle(cards);
    }

    render() {
        return (
            <>
                <div id="stacked-cards-block" className="content stackedcards stackedcards--animatable init">
                    <div className="stackedcards-container">
                        {this.renderCards(this.props.children)}
                    </div>
                </div>
                <div className="global-actions">
                    <button className="left-action" onClick={() => this.onClickLeft()
                    }>Next Question</button>
                </div>
            </>
        )
    }
}

export default StackedCards;
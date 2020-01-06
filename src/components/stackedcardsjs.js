// JavaScript Document
document.addEventListener("DOMContentLoaded", function (event) {

    function stackedCards() {

        var stackedOptions = 'Top'; //Change stacked cards view from 'Bottom', 'Top' or 'None'.
        var rotate = true; //Activate the elements' rotation for each move on stacked cards.
        var items = 3; //Number of visible elements when the stacked options are bottom or top.
        var elementsMargin = 10; //Define the distance of each element when the stacked options are bottom or top.
        var maxElements; //Total of stacked cards on DOM.
        var currentPosition = 0; //Keep the position of active stacked card.
        var listElNodesObj; //Keep the list of nodes from stacked cards.
        var currentElementObj; //Keep the stacked card element to swipe.
        var stackedCardsObj;
        var obj;
        var elTrans;

        obj = document.getElementById('stacked-cards-block');
        stackedCardsObj = obj.querySelector('.stackedcards-container');
        listElNodesObj = stackedCardsObj.children;


        countElements();
        currentElement();

        // Get the total numbers of cards
        function countElements() {
            maxElements = listElNodesObj.length;
            // If the number of items visible declared is greater than the number of cards available, make it so that the visible cards matches the number of cards available.
            if (items > maxElements) {
                items = maxElements;
            }
        };

        // Set the card that can be swiped
        function currentElement() {
            currentElementObj = listElNodesObj[currentPosition];
        };

        // 
        currentElementObj = listElNodesObj[0];
        updateUi();

        //Prepare elements on DOM
        addMargin = elementsMargin * (items - 1) + 'px';

        if (stackedOptions === "Top") {
            for (i = items; i < maxElements; i++) {
                listElNodesObj[i].classList.add('stackedcards-top', 'stackedcards--animatable', 'stackedcards-origin-top');
            }
            elTrans = elementsMargin * (items - 1);
            stackedCardsObj.style.marginBottom = addMargin;
        }

        // Prepare the card out of view 
        for (i = items; i < maxElements; i++) {
            listElNodesObj[i].style.zIndex = 0;
            listElNodesObj[i].style.opacity = 0;
            listElNodesObj[i].style.webkitTransform = 'scale(' + (1 - (items * 0.04)) + ') translateX(0) translateY(' + elTrans + 'px) translateZ(0)';
            listElNodesObj[i].style.transform = 'scale(' + (1 - (items * 0.04)) + ') translateX(0) translateY(' + elTrans + 'px) translateZ(0)';
        }

        // if there is still a card then set it to the active card
        if (listElNodesObj[currentPosition]) {
            listElNodesObj[currentPosition].classList.add('stackedcards-active');
        }

        //Functions to swipe left elements on logic external action.
        function onActionLeft() {

            // Check if the current position is less than the number of cards to prevent the current position from incrementing too much.
            if (currentPosition < maxElements) {
                onSwipeLeft();
            }
            /* For carousel effect
            else {
                currentPosition = 0;
                onSwipeLeft();
            }
            */
        };

        //Swipe active card to left.
        function onSwipeLeft() {
            //removeNoTransition();
            transformUi(-1000, 0, 0, currentElementObj);
            currentPosition = currentPosition + 1;
            updateUi();
            currentElement();
            setActiveHidden();
        };

        //Remove transitions from all elements to be moved in each swipe movement to improve perfomance of stacked cards.
        function removeNoTransition() {
            if (listElNodesObj[currentPosition]) {
                listElNodesObj[currentPosition].classList.remove('no-transition');
                listElNodesObj[currentPosition].style.zIndex = 6;
            }
        };

        function setActiveHidden() {
            if (!(currentPosition >= maxElements)) {
                listElNodesObj[currentPosition - 1].classList.remove('stackedcards-active');
                listElNodesObj[currentPosition - 1].classList.add('stackedcards-hidden');
                listElNodesObj[currentPosition].classList.add('stackedcards-active');
            }
        };

        //Set the new z-index for specific card.
        function setZindex(zIndex) {
            if (listElNodesObj[currentPosition]) {
                listElNodesObj[currentPosition].style.zIndex = zIndex;
            }
        };

        //Add translate X and Y to active card for each frame.
        function transformUi(moveX, moveY, opacity, elementObj) {
            requestAnimationFrame(function () {
                var element = elementObj;

                if (rotate) {
                    rotateElement = RotateRegulator(moveX);
                } else {
                    rotateElement = 0;
                }

                // Function to generate rotate value 
                function RotateRegulator(value) {
                    if (value / 10 > 15) {
                        return 15; // Rotate to the right
                    }
                    else if (value / 10 < -15) {
                        return -15; // Rotate to the left
                    }
                    return value / 10;
                }

                if (stackedOptions === "Top") {
                    elTrans = elementsMargin * (items - 1);
                    if (element) {
                        element.style.webkitTransform = "translateX(" + moveX + "px) translateY(" + (moveY + elTrans) + "px) translateZ(0) rotate(" + rotateElement + "deg)";
                        element.style.transform = "translateX(" + moveX + "px) translateY(" + (moveY + elTrans) + "px) translateZ(0) rotate(" + rotateElement + "deg)";
                        element.style.opacity = opacity;
                    }
                }
            });
        };

        //Action to update all elements on the DOM for each stacked card.
        function updateUi() {
            requestAnimationFrame(function () {
                elTrans = 0;
                var elZindex = 5;
                var elScale = 1;
                var elOpac = 1;
                var elTransTop = items;
                var elTransInc = elementsMargin;

                for (i = currentPosition; i < (currentPosition + items); i++) {
                    if (listElNodesObj[i]) {
                        if (stackedOptions === "Top") {
                            listElNodesObj[i].classList.add('stackedcards-top', 'stackedcards--animatable', 'stackedcards-origin-top');
                            elTrans = elTransInc * elTransTop;
                            elTransTop--;
                        }

                        listElNodesObj[i].style.transform = 'scale(' + elScale + ') translateX(0) translateY(' + (elTrans - elTransInc) + 'px) translateZ(0)';
                        listElNodesObj[i].style.webkitTransform = 'scale(' + elScale + ') translateX(0) translateY(' + (elTrans - elTransInc) + 'px) translateZ(0)';
                        listElNodesObj[i].style.opacity = elOpac;
                        listElNodesObj[i].style.zIndex = elZindex;

                        elScale = elScale - 0.04;
                        elOpac = elOpac - (1 / items);
                        elZindex--;
                    }
                }
            });
        };

        //Add listeners to call global action for swipe cards
        var buttonLeft = document.querySelector('.left-action');
        buttonLeft.addEventListener('click', onActionLeft, false);

    }

    stackedCards();
});

/*
For touch controls

        // Function to put the active card back in the middle if gesture ends to early for a swipe to register
        function backToMiddle() {
            removeNoTransition();
            transformUi(0, 0, 1, currentElementObj);
            setZindex(5);
            if (!(currentPosition >= maxElements)) {
                //roll back the opacity of second element
                if ((currentPosition + 1) < maxElements) {
                    listElNodesObj[currentPosition + 1].style.opacity = '.8';
                }
            }
        };

        var velocity = 0.3; //Minimum velocity allowed to trigger a swipe.
        var listElNodesWidth; //Keep the stacked cards width.

        var elementHeight;

        //Touch events block
        var element = obj;
        var startTime;
        var startX;
        var startY;
        var translateX;
        var translateY;
        var currentX;
        var currentY;
        var touchingElement = false;
        var timeTaken;

        function gestureStart(evt) {
            startTime = new Date().getTime();

            startX = evt.changedTouches[0].clientX;
            startY = evt.changedTouches[0].clientY;

            currentX = startX;
            currentY = startY;


            touchingElement = true;
            if (!(currentPosition >= maxElements)) {
                if (listElNodesObj[currentPosition]) {
                    listElNodesObj[currentPosition].classList.add('no-transition');
                    setZindex(6);

                    if ((currentPosition + 1) < maxElements) {
                        listElNodesObj[currentPosition + 1].style.opacity = '1';
                    }

                    elementHeight = listElNodesObj[currentPosition].offsetHeight / 3;
                }

            }

        };

        function gestureMove(evt) {
            currentX = evt.changedTouches[0].pageX;
            currentY = evt.changedTouches[0].pageY;

            translateX = currentX - startX;
            translateY = currentY - startY;

            if (!(currentPosition >= maxElements)) {
                evt.preventDefault();
                transformUi(translateX, translateY, 1, currentElementObj);
            }
        };

        function gestureEnd(evt) {

            if (!touchingElement) {
                return;
            }

            translateX = currentX - startX;
            translateY = currentY - startY;
            timeTaken = new Date().getTime() - startTime;
            touchingElement = false;

            if (!(currentPosition >= maxElements)) {
                if (translateY < (elementHeight * -1) && translateX > ((listElNodesWidth / 2) * -1) && translateX < (listElNodesWidth / 2)) {  //is Top?

                    if (translateY < (elementHeight * -1) || (Math.abs(translateY) / timeTaken > velocity)) { // Did It Move To Top?
                        onSwipeTop();
                    } else {
                        backToMiddle();
                    }

                } else {

                    if (translateX < 0) {
                        if (translateX < ((listElNodesWidth / 2) * -1) || (Math.abs(translateX) / timeTaken > velocity)) { // Did It Move To Left?
                            onSwipeLeft();
                        } else {
                            backToMiddle();
                        }
                    } else if (translateX > 0) {

                        if (translateX > (listElNodesWidth / 2) && (Math.abs(translateX) / timeTaken > velocity)) { // Did It Move To Right?
                            onSwipeRight();
                        } else {
                            backToMiddle();
                        }

                    }
                }
            }
        };

        element.addEventListener('touchstart', gestureStart, false);
        element.addEventListener('touchmove', gestureMove, false);
        element.addEventListener('touchend', gestureEnd, false);

*/
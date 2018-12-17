/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *d  - if the list already has another card, check to see if the two cards match
 *d   + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *d   + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Put all cards into an array
let allCards = document.querySelectorAll('.card');
// Create an array for all open cards
let openCards = [];
let matchCounter = 0;
//Add event flip funcitonality to cards using click event listener.
allCards.forEach(function(card){
    card.addEventListener('click',function(event){
        openCards.push(card);// Add clicked card to openCard array.
        if (openCards.length <= 2) {// flip cards using show and open class.
            card.classList.add('show', 'open');
            if (openCards.length == 2){
                if (openCards[0].firstElementChild.className == openCards[1].firstElementChild.className){
                    matchActions();
                } else {
                    noMatchActions();
                }   
            }
        }
        finalScore();
    });           

});


function matchActions(){
    // If true add 'match' class, remove 'open' 'show' class 
    setTimeout(function(){ 
        openCards[0].classList.add('match');
        openCards[0].classList.remove('open', 'show');
        openCards[1].classList.add('match');
        openCards[1].classList.remove('open', 'show');
        // remove cards from openCards array
        openCards = [];
    }, 500);
    matchCounter++; 
}

function noMatchActions(){
    // if false add 'noMatch'class
    setTimeout(function(){ 
        openCards[0].classList.add('noMatch');
        openCards[1].classList.add('noMatch');
        // Wait a period of time before removing open, show, noMatch classes
        setTimeout(function(){ 
            openCards[0].classList.remove('open', 'show', 'noMatch');
            openCards[1].classList.remove('open', 'show', 'noMatch');
            // remove cards from openCards array
            openCards = [];
        }, 1500);
    }, 250);
}

function finalScore(){
    if (matchCounter == 8){
        setTimeout(function(){ 
            window.alert('Final Score is 100%!');
        }, 510);
    }
}
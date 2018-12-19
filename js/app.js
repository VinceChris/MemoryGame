/*
 * Create a list that holds all of your cards
 */
let allCards = document.querySelectorAll('.card'); // Array holds the cards
let deck = document.querySelector('.deck');
let cardList = []; // Array to hold the card type.

allCards.forEach(function(cardX,index){
    cardList[index] = cardX.firstElementChild.className;
    console.log('cardList initialized ' + cardList[index]);
});
//*** 1. implement the restart button   ***
//*** 2. implement the star rating      ***
//*** 3. implement the timer            ***

/*
 * Display the cards on the page
 *d  - shuffle the list of cards using the provided "shuffle" method below
 *d  - loop through each card and create its HTML
 *d  - add each card's HTML to the page
 */

//Initialize the game on first click. Shuffle cards and place on board.
let clickCounter = 0;
function isFirstClick(){
    ++clickCounter
    if (clickCounter == 1){
        cardList = shuffle(cardList);
        removeCardsClass(allCards);
        placeShuffledCards();
    } 
}

function removeCardsClass(){
    allCards.forEach(function(card){        
        card.firstElementChild.className = '';
    });
}
function placeShuffledCards(){
    cardList.forEach(function(card,index){  
        allCards[index].firstElementChild.className = card; 
    });
}

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
 *d? - display the card's symbol (put this functionality in another function that you call from this one)
 *d? - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *d  - if the list already has another card, check to see if the two cards match
 *d   + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *d   + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *d   + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *d   + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */


let openCards = [];
let matchCounter = 0;
let moveCounter = document.getElementsByClassName('moves');
let clickedCard = '';
//Add card flip funcitonality using click event listener.
deck.addEventListener('click', respondToTheClick);

function respondToTheClick(event){
    console.log(event.target);
    clickedCard = event.target;
    isFirstClick(); // shuffle cards at start of game
    addCardToOpenList(clickedCard);
    
    //*** check if card is matched or open already, ignore click if so.***
    
    finalScore();// Once all cards are matched show final score, reset the game.
}   

function addCardToOpenList(card){
    //check if clicked card is already open, matched, or the card type.
    if(card.classList.contains('open') || card.classList.contains('match') || card.classList.contains('fa')){
        console.log('open card was clicked.');
    }else {
        openCards.push(card);// Add card to openCard array.
        displayCardSymbol(card);
    }

}

function displayCardSymbol(card){
    if (openCards.length <= 2) {// flip cards using show and open class.
        card.classList.add('show', 'open');
        if (openCards.length == 2){
            ++moveCounter[0].innerText //increment the move counter 
            if (openCards[0].firstElementChild.className == openCards[1].firstElementChild.className){
                matchActions();
            } else {
                noMatchActions();
            }   
        }
    }
}
//------------------------------------------------------------------------------------
function matchActions(){
    // If true add 'match' class, remove 'open' 'show' class 
    setTimeout(function(){ 
        openCards[0].classList.add('match');
        openCards[0].classList.remove('open', 'show');
        openCards[1].classList.add('match');
        openCards[1].classList.remove('open', 'show');
        openCards = [];     // remove cards from openCards array
    }, 500);
    matchCounter++; 
}

function noMatchActions(){
    // flash cards red to indicate no match.
    setTimeout(function(){ 
        openCards[0].classList.add('noMatch');
        openCards[1].classList.add('noMatch');
        // Wait a period of time before hiding card again.
        setTimeout(function(){ 
            openCards[0].classList.remove('open', 'show', 'noMatch');
            openCards[1].classList.remove('open', 'show', 'noMatch');
            openCards = [];     // remove cards from openCards array
        }, 1500);
    }, 250);
}

function finalScore(){
    if (matchCounter == allCards.length/2){
        setTimeout(function(){ 
            // ***add button to play again, how much time it took, how many stars***
            window.alert('Final Score is 100%!');
            matchCounter = 0;                   // reset the card match counter 
            moveCounter[0].innerText = 0;       // reset the move counter
            allCards.forEach(function(card){
                card.classList.remove('match'); // hide all the cards
            })
            clickCounter = 0;                   //reset the clickCounter
        }, 510);
    }
}


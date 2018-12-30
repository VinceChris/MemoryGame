// Create a list that holds all of your cards
let allCards = document.querySelectorAll('.card');  // Array holds all card class objects on the game board.
let deck = document.querySelector('.deck');         // variable to hold the deck class object on the game board.
let cardList = [];                                  // Array to hold the card type used for shuffling.

allCards.forEach(function(cardX,index){
    cardList[index] = cardX.firstElementChild.className;
});

// Initializes the gameClock variable.  Used in functions isFirstClick & resetTimer
let gameClock = 0; 

/* function isFirstClick uses variable clickCounter to check for first click then initializes the game.
** is called by the eventlistener function attached to the deck. clickCounter is incremented after each function call.
** if statement checks for the first click and if is then starts the gameClock, shuffles cards in cardList array, 
** then clears gameboard and places shuffled cards.
*/
 let clickCounter = 0;
function isFirstClick(){
    ++clickCounter
    if (clickCounter == 1){
        gameClock = setInterval(updateTimer, 1000); // implement the TIMER with gameClock which runs the updateTimer function every 1000ms
        cardList = shuffle(cardList);               // shuffle the cards.
        removeCardsClass(allCards);                 // remove cards from gameboard.
        placeShuffledCards();                       // place shuffled cards on gameboard.
    } 
}

// function clears cards from the board by removing card class names from allCards.
function removeCardsClass(){
    allCards.forEach(function(card){        
        card.firstElementChild.className = '';
    });
}
// function places shuffled cards (cardList) on the game board (allCards).
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


let openCards = [];             // array to hold open card list
let matchCounter = 0;           // variable to count number of matched cards used to evaluate win condition
let moveCounter = document.getElementsByClassName('moves'); // variable to display number of moves
let clickedCard = '';           // variable to hold the last clicked card element.

//Add card flip funcitonality using click event listener onto the deck.
deck.addEventListener('click', respondToTheClick);


// Main funtionality of the game happens in this funcion.
function respondToTheClick(event){
    clickedCard = event.target;     // hold the card which was clicked.
    isFirstClick();                 // start game clock, shuffle and place cards at start of game
    addCardToOpenList(clickedCard); // Flip Cards and Card matching Evaluation
    finalScore();                   // Win Game with final score, reset the game.
}   


// function takes in the clicked object and checks its class, if its a card that is not open or matched
function addCardToOpenList(card){
    if(card.classList.contains('deck') || card.classList.contains('open') || card.classList.contains('match') || card.classList.contains('fa')){
        // do nothing if clicked object is wrong class type, open, or matched.
    }else {
        openCards.push(card);       // Add card to openCard array.
        displayCardSymbol(card);    // Perform MEMORY GAME LOGIC and flip cards
    }
}

// Performs MEMORY GAME LOGIC Checks number of open cards, flips card, 
function displayCardSymbol(card){
    if (openCards.length <= 2) {
        // flip card if 0 or 1 other card is open.  Perform the flip by adding class types open & show.
        card.classList.add('show', 'open');     
        if (openCards.length == 2){
            // When two cards are open perform matching logic and scoring.
            starRating();           // function to handle the player score STAR rating.
            if (openCards[0].firstElementChild.className == openCards[1].firstElementChild.className){
                matchActions();     // implements logic for matching cards
            } else {
                noMatchActions();   // implements logic for not matching cards
            }   
        }
    }
}


// Match Logic adds 'match' class, removes 'open', 'show' classes, keeps track of openCards array
function matchActions(){
    setTimeout(function(){ 
        openCards[0].classList.add('match');
        openCards[0].classList.remove('open', 'show');
        openCards[1].classList.add('match');
        openCards[1].classList.remove('open', 'show');
        openCards = [];     // remove cards from openCards array
    }, 500);
    matchCounter++;         // increment the matchCounter, used to evaluate win condition
}

// No Match logic flashes cards red to indicate no match, waits a period of time, then flips card over.
function noMatchActions(){
    setTimeout(function(){ 
        openCards[0].classList.add('noMatch');              // indicate no match by changing card color to red wiht noMatch class
        openCards[1].classList.add('noMatch');              // indicate no match by changing card color to red with noMatch class
        // Wait a period of time before hiding card again.
        setTimeout(function(){ 
            openCards[0].classList.remove('open', 'show', 'noMatch');   // flip card1 over by removing open, show, noMatch
            openCards[1].classList.remove('open', 'show', 'noMatch');   // flip card2 over by removing open, show, noMatch
            openCards = [];     // remove cards from openCards array
        }, 1500);
    }, 250);
}


// STAR RATING: Accesses the individual stars on the game board and keeps counter of open stars.
let stars = document.querySelector('.stars');   // selects all stars from game board
let star3 = stars.children[2];                  // selects 3rd star from game board
let star2 = stars.children[1];                  // selects 2nd star from game board
let star1 = stars.children[0];                  // selects 1st star from game board
let starCount = 3;                              // initializes the star score to 3 stars.

// Uses the moveCounter to give the player a STAR RATING.  Removes stars from game board after a number of moves.
function starRating(){
    ++moveCounter[0].innerText              //increment the move counter
    if (moveCounter[0].innerText == 16){
        starCount = 2;                                          // after 16 moves remove a star from the starScore.
        star3.firstElementChild.style.visibility = 'collapse';  // hide the 3rd star on the game board.
    } if (moveCounter[0].innerText == 24){
        starCount = 1;                                          // after 24 moves remove a star from the starScore.
        star2.firstElementChild.style.visibility = 'collapse';  // hide the 2nd star on the game board.
    } else{}
}

// Checks number of matched card pairs and if all are matched implement win condition.  
function finalScore(){
    if (matchCounter == 8){
        setTimeout(function(){ 
            let winMessage = `Congratulations!  It only took you ${minutesLabel.innerHTML} : ${secondsLabel.innerHTML} and your rating is ${starCount} stars! Click ok to start a new game.`
            window.alert(winMessage);
            resetGame();    
        }, 510);
    }
}

/* RESTART BUTTON
** the click event listener is attached to the restartButton which holds the restart class,
** then calls resetGame function on click. 
*/
let restartButton = document.querySelector('.restart');
restartButton.addEventListener('click',function(){
    resetGame();
});


/* resetGame function sets variables to ready the game board for a new game.
*/
function resetGame(){
    matchCounter = 0;                   // reset the card match counter 
    moveCounter[0].innerText = 0;       // reset the move counter
    allCards.forEach(function(card){
        card.classList.remove('match'); // hide all the cards
        card.classList.remove('open');  // hide all the cards
        card.classList.remove('show');  // hide all the cards
    })
    clickCounter = 0;                   //reset the clickCounter
    starCount = 3;                      // reset the star rating
    star3.firstElementChild.style.visibility = 'visible';
    star2.firstElementChild.style.visibility = 'visible';
    resetTimer();                       // reset the game clock
}


// TIMER: initialize the variables needed to keep track of and display the TIMER. 
let minutesLabel = document.getElementById("minutes");  // variable to hold the object ID named minutes on the game board.
let secondsLabel = document.getElementById("seconds");  // variable to hold the object ID named seconds on the game board.
let totalSeconds = 0;                                   // variable to keep track of elapsed time during a game.

// function to increment elapsed time and update time on the game board.
function updateTimer() {
  ++totalSeconds;                                                   // increment elapsed time
  secondsLabel.innerHTML = calcTime(totalSeconds % 60);             // update seconds on game board, adds leading zero if needed.
  minutesLabel.innerHTML = calcTime(parseInt(totalSeconds / 60));   // update minutes on game board, adds leading zero if needed.
}

// function to handle the TIMER when game is reset or won.
function resetTimer(){
    clearInterval(gameClock);       // stops gameClock from running updateTimer function every 1000 ms.
    totalSeconds = 0;               // reset seconds counter.
    secondsLabel.innerHTML = "00";  // clear seconds on game board TIMER.
    minutesLabel.innerHTML = "00";  // clear minutes on game board TIMER.
}

// function adds a leading zero to seconds or minutes if they are single digit.
function calcTime(val) {
  let valString = val + "";     // variable to convert min or sec to string.
  if (valString.length < 2) {
    return "0" + valString;     // add leading zero if single character    
  } else {
    return valString;           // return the string if not single character
  }
}
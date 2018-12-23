/*
 * Create a list that holds all of your cards
 */
let allCards = document.querySelectorAll('.card'); // Array holds the cards
let deck = document.querySelector('.deck');
let cardList = []; // Array to hold the card type.

allCards.forEach(function(cardX,index){
    cardList[index] = cardX.firstElementChild.className;
});
//*** 1. implement the restart button   ***
let restartButton = document.querySelector('.restart');
restartButton.addEventListener('click',function(){
    resetGame();
});

//*** 2. implement the star rating      ***
let stars = document.querySelector('.stars');
let star3 = stars.children[2];
let star2 = stars.children[1];
let star1 = stars.children[0];
let starCount = 3;
let startTime = 0; 
let endTime = 0;
let timeDiff = 0;
let seconds = 0;
let minutes = 0;
let completionTime = 0;
let gameclock = 0;

//Initialize the game on first click. Shuffle cards and place on board.
let clickCounter = 0;
function isFirstClick(){
    ++clickCounter
    if (clickCounter == 1){
        gameClock = setInterval(updateTimer, 1000);
        startTime = new Date();
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


let openCards = [];             // array to hold open card list
let matchCounter = 0;           // variable to count number of matched cards
let moveCounter = document.getElementsByClassName('moves'); // variable to display number of moves
let clickedCard = '';           // variable to hold the last clicked card element.

//Add card flip funcitonality using click event listener.
deck.addEventListener('click', respondToTheClick);

function respondToTheClick(event){
    clickedCard = event.target;      
    isFirstClick();                 // shuffle cards at start of game
    addCardToOpenList(clickedCard); // Flip Cards and Card Evaluation
    finalScore();                   // Win Game with final score, reset the game.
}   

function addCardToOpenList(card){
    //check if clicked card is already open, matched, or the card type.
    if(card.classList.contains('deck') || card.classList.contains('open') || card.classList.contains('match') || card.classList.contains('fa')){
        // do nothing.
    }else {
        openCards.push(card);// Add card to openCard array.
        displayCardSymbol(card);
    }

}

// Checks number of open cards, flips card, 
function displayCardSymbol(card){
    if (openCards.length <= 2) {// flip cards using show and open class.
        card.classList.add('show', 'open');
        if (openCards.length == 2){
            starRating(); 
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

function starRating(){
    ++moveCounter[0].innerText //increment the move counter
    if (moveCounter[0].innerText == 16){
        starCount = 2;
        star3.firstElementChild.style.color = 'black';
    } if (moveCounter[0].innerText == 24){
        starCount = 1;
        star2.firstElementChild.style.color = 'black';
    } else{}
}

function finalScore(){
    if (matchCounter == allCards.length/2){
        endTime = new Date();
        //calcTime();
        setTimeout(function(){ 
            // ***add button to play again, how much time it took, how many stars***
            window.alert('Congratulations!  It only took you ' + completionTime + ' and your rating is ' + starCount + ' stars! Click ok to start a new game.');
            resetGame();    
        }, 510);
    }
}



function resetGame(){
    matchCounter = 0;                   // reset the card match counter 
    moveCounter[0].innerText = 0;       // reset the move counter
    allCards.forEach(function(card){
        card.classList.remove('match'); // hide all the cards
        card.classList.remove('open'); // hide all the cards
        card.classList.remove('show'); // hide all the cards
    })
    clickCounter = 0;                   //reset the clickCounter
    starCount = 3;
    star3.firstElementChild.style.color = 'gold';
    star2.firstElementChild.style.color = 'gold';
    resetTimer();
}

let minutesLabel = document.getElementById("minutes");
let secondsLabel = document.getElementById("seconds");
let totalSeconds = 0;


function updateTimer() {
  ++totalSeconds;
  secondsLabel.innerHTML = calcTime(totalSeconds % 60);
  minutesLabel.innerHTML = calcTime(parseInt(totalSeconds / 60));
}

function resetTimer(){
    clearInterval(gameClock);
    totalSeconds = 0;
    secondsLabel.innerHTML = "00";
    minutesLabel.innerHTML = "00";
}

function calcTime(val) {
  let valString = val + "";
  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}

/*
function calcTime(){
    timeDiff = (endTime - startTime)/1000;
    if (timeDiff >= 60){
        seconds = timeDiff % 60;
        minutes = Math.floor(timediff / 60);
        completionTime = minutes + " minutes" + seconds + " seconds";
    } else{
        completionTime = timeDiff + " seconds";
    }
}
*/
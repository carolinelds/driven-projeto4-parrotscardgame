// global constants
const backgroundGifs = [1, 2, 3, 4, 5, 6, 7];
const validQtyCards = [4, 6, 8, 10, 12, 14];

// global variables
let cards = {
    backImg: [],
    posFirst: [],
    posSecond: []
};
let numberOfMoves = 0;
let discoveredPairs = 0;
let index1 = null;
let index2 = null;
let currentCard = null;
let back = [];
let front = [];
let backBefore = [];
let frontBefore = [];
let moveBlocker = 0;
let finalTime = null;
let interval = null;


beginGame(); // call first prompt

function beginGame() {

    // reset clock 
    let clock = document.querySelector(".clock");
    clock.innerHTML = "0";

    let qtyCards = prompt("Com quantas cartas deseja jogar? (números pares de 4 até 14)");

    qtyCards = parseInt(qtyCards);

    if (validQtyCards.includes(qtyCards)) {
        sortCards(qtyCards);
        startClock();
    } else {
        beginGame();
    }
}

function sortCards(number) {

    // select background gifs that will be used
    let backImg = backgroundGifs.slice(0, number / 2);

    // generate unsorted positions array,
    // each gif name (card) appearing twice
    let positions = [];
    let cont = 1;
    for (let i = 0; i < number - 1; i = i + 2) {
        positions[i] = cont;
        positions[i + 1] = cont;
        cont++;
    }

    // sort positions array
    positions = positions.sort(comparator);

    // separate arrays with positions of first cards and second cards 
    // (because each card appears twice)
    let posFirstCard = [];
    let posSecondCard = [];
    for (let i = 0; i < number / 2; i++) {
        posFirstCard[i] = positions.indexOf(i + 1);
        posSecondCard[i] = positions.lastIndexOf(i + 1);
    }

    // update cards object
    cards = {
        backImg: backImg,
        posFirst: posFirstCard,
        posSecond: posSecondCard
    }

    // position cards in their respective first and second positions
    positionCards(number, positions);
}

function comparator() {
    return Math.random() - 0.5;
}

function positionCards(number, order) {

    const firstRow = document.querySelector(".first-row");
    const secondRow = document.querySelector(".second-row");

    for (let i = 0; i < number; i++) {

        if (number > 6) { // if more than 6 cards
            if (i <= number / 2 - 1) { //position first half in .first-row
                firstRow.innerHTML += `
                <div class="card" onclick="turnCard(this)" data-identifier="card">
                    <div class="front-face face" data-identifier="front-face">
                        <img src="./images/front.png">
                    </div>
                    <div class="back-face face" data-identifier="back-face">
                        <img src="./images/${order[i]}.gif">
                    </div>             
                </div>
                `;
            } else { //position second half in .second-row
                secondRow.innerHTML += `
                <div class="card" onclick="turnCard(this)" data-identifier="card">
                    <div class="front-face face" data-identifier="front-face">
                        <img src="./images/front.png">
                    </div>
                    <div class="back-face face" data-identifier="back-face">
                        <img src="./images/${order[i]}.gif">
                    </div>             
                </div>
                `;
            }
        } else { // position in .first-row only
            firstRow.innerHTML += `
                <div class="card" onclick="turnCard(this)" data-identifier="card">
                    <div class="front-face face" data-identifier="front-face">
                        <img src="./images/front.png">
                    </div>
                    <div class="back-face face" data-identifier="back-face">
                        <img src="./images/${order[i]}.gif">
                    </div>             
                </div>
                `;
        }
    }
}

function turnCard(item) {

    // check if new movement is allowed or blocked for now
    if (moveBlocker === 0) {

        backBefore = back;
        frontBefore = front;

        numberOfMoves++;

        let allCards = document.querySelectorAll(".card");

        // check if there were any card active before clicking
        let whichMove = document.querySelectorAll(".active");

        // turn card
        back = item.querySelector(".back-face");
        back.classList.add("active");
        front = item.querySelector(".front-face");
        front.classList.add("active");

        if (whichMove.length === 0) { // if first move

            // identify index position of item (first move) inside allCards
            for (let i = 0; i < allCards.length; i++) {
                if (allCards[i] === item) {
                    index1 = i;
                }
            }

            // identify which gif is on the card
            for (let i = 0; i < cards.backImg.length; i++) {
                if ((index1 === cards.posFirst[i]) ||
                    (index1 === cards.posSecond[i])) {
                    currentCard = i + 1; // because their names start at 1
                }
            }

        } else { // if second move

            moveBlocker++; // goes to 1: new movement blocked

            // identify index position of item (second move) inside allCards
            for (let i = 0; i < allCards.length; i++) {
                if (allCards[i] === item) {
                    index2 = i;
                }
            }

            // check if second move matches first move (the same gif)
            if ((index2 === cards.posFirst[currentCard - 1]) ||
                (index2 === cards.posSecond[currentCard - 1])) {
                
                discoveredPairs++;
                
                // keep cards the way they are (same CSS for both classes)
                const allClasses = [back, backBefore, front, frontBefore];
                allClasses.forEach(function (el) {
                    el.classList.remove("active"),
                    el.classList.add("discovered")
                })

                // check if all pairs have been discovered
                if (discoveredPairs === allCards.length / 2) {

                    const clock = document.querySelector(".clock");
                    finalTime = parseInt(clock.innerHTML);

                    setTimeout(youWon, 1000);

                    console.log("You won, the game is over");
                }

                moveBlocker = 0; // new movement unblocked

            } else { // if second move does not match first one

                // wait 1s to turn cards back again
                setTimeout(turnCardBack, 1000);

                console.log("The game goes on");
            }

            // restart movement variables 
            index1 = null;
            index2 = null;
            currentCard = null;
        }
    }
}

function turnCardBack() {

    // remove active status from current and previous selected cards
    // i.e. turn them back again
    const allClasses = [front, back, frontBefore, backBefore];
    allClasses.forEach(function (el) {
        el.classList.remove("active")
    })

    moveBlocker = 0; // new movement unblocked
}

function youWon() {

    alert(`Você ganhou em ${numberOfMoves/2} jogadas e em ${finalTime} segundos!`);

    const playAgain = prompt("Você gostaria de reiniciar a partida?\n\nS/N");
    playAgain.toUpperCase(playAgain);

    // clear screen from old game
    const firstRow = document.querySelector(".first-row");
    const secondRow = document.querySelector(".second-row");
    firstRow.innerHTML = "";
    secondRow.innerHTML = "";

    // restart game variables
    numberOfMoves = 0;
    discoveredPairs = 0;
    finalTime = null;

    // restart game
    if (playAgain === "S") {
        beginGame();
    }    
}

function startClock(){
    interval = setInterval(increaseClock, 1000);
}

function increaseClock() {
    let clock = document.querySelector(".clock");

    if (finalTime !== null){
        clearInterval(interval);
    } else {
        clock.innerHTML = parseInt(clock.innerHTML) + 1;
    }
}

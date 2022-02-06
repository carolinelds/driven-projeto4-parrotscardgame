/*//check if layout is mobile or desktop
if (window.matchMedia("(max-width: 614px)").matches) {
    let checkMobile = true;
} else {
   let checkMobile = false;
}*/

// global constants
const backgroundGifs = [1, 2, 3, 4, 5, 6, 7];
const validQtyCards = [4, 6, 8, 10, 12, 14];

// global variable
let cards = {
    backImg: [],
    posFirst: [],
    posSecond: []
};

beginGame(); // call first prompt

function beginGame(){
    
    let qtyCards = prompt("Com quantas cartas deseja jogar? (números pares de 4 até 14)");

    qtyCards = parseInt(qtyCards);

    if (validQtyCards.includes(qtyCards)) {
        sortCards(qtyCards);
    } else {
        begin();
    }
}

function sortCards(number){
    
    // select background gifs that will be used
    let backImg = backgroundGifs.slice(0,number/2);

    // generate unsorted positions array,
    // each gif name (card) appearing twice
    let positions = [];
    let cont = 1;   
    for (let i = 0; i < number - 1; i = i + 2){
        positions[i] = cont;
        positions[i+1] = cont;
        cont++;
    }

    // sort positions array
    positions = positions.sort(comparator);

    // separate arrays with positions of first cards and second cards 
    // (because each card appears twice)
    let posFirstCard = [];
    let posSecondCard = [];
    for (let i = 0; i < number/2; i++){
        posFirstCard[i] = positions.indexOf(i+1);
        posSecondCard[i] = positions.lastIndexOf(i+1);
    }

    // update cards object
    cards = {
        backImg: backImg,
        posFirst: posFirstCard,
        posSecond: posSecondCard
    }
    
    // position cards in their respective first and second positions
    positionCards(number,positions);
}

function comparator() { 
	return Math.random() - 0.5; 
}

function positionCards(number,order){

    const firstRow = document.querySelector(".first-row");
    const secondRow = document.querySelector(".second-row");

    for (let i = 0; i < number; i++){

        if (i <= number/2 - 1){ //position first half in .first-row
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
    }
}

function turnCard(item){  
        
    const back = item.querySelector(".back-face");
    back.classList.toggle("active");

    const front = item.querySelector(".front-face");
    front.classList.toggle("active");

}
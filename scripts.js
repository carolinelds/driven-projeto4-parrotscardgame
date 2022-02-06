//check if layout is mobile or desktop
if (window.matchMedia("(max-width: 614px)").matches) {
    let checkMobile = true;
} else {
   let checkMobile = false;
}

// global constants
const backgroundGifs = [1, 2, 3, 4, 5, 6, 7];
const validQtyCards = [4, 6, 8, 10, 12, 14];

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

sortCards(number){
    
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
    positions.sort(comparator);

    // separate arrays with positions of first cards and second cards 
    // (because each card appears twice)
    let posFirstCard = [];
    let posSecondCard = [];
    for (let i = 0; i < number/2; i++){
        posFirstCard[i] = positions.indexOf(i+1);
        posSecondCard[i] = positions.lastIndexOf(i+1);
    }

    // create cards object
    const cards = {
        backImg: backImg,
        posFirst: posFirstCard,
        posSecond: posSecondCard
    }
    
}

function comparator() { 
	return Math.random() - 0.5; 
}


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

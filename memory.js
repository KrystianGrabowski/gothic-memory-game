var cardNames = ["diego.jpg", "xardas.jpg", "diego.jpg", "gorn.jpg", "milten.jpg", "lares.jpg", "gorn.jpg", "xardas.jpg", "milten.jpg", "lester.jpg", "lester.jpg", "lares.jpg"]
var secondCard = false;
var prevCard = 0;

function showCard(cardId){
    $("#card" + cardId).css("background-image", "url('images/" + cardNames[cardId] + "')");
    $("#card" + cardId).toggleClass("cardOnOff");
}

function prepareCards(){ 
    for(let i=0; i<12; i++){
        $("<div id='card" + i + "'></div>")
            .addClass("card")
            .addClass("cardOnOff")
            .on("click", function(){cardManager(i)})
            .appendTo("#board");
    }
}

function cardManager(cardId){
    showCard(cardId);
    if (secondCard){
        secondCard = false;
        alert(prevCard + ", " + cardId);
    }
    else{
        prevCard = cardId;
        secondCard = true;
    }
}


prepareCards();
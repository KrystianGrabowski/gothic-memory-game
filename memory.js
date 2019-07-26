var cardNames = ["diego.jpg", "xardas.jpg", "diego.jpg", "gorn.jpg", "milten.jpg", "lares.jpg", "gorn.jpg", "xardas.jpg", "milten.jpg", "lester.jpg", "lester.jpg", "lares.jpg"]
var secondCard = false;
var prevCard = 0;
var defalutImagePath = "images/dragon.jpg"; 

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

function compareCards(cardId1, cardId2){
    return cardNames[cardId1] == cardNames[cardId2];
}

function hideTwoCards(cardId1, cardId2){
    hideCard(cardId1);
    hideCard(cardId2);
}

function hideCard(cardId){
    $("#card" + cardId).css("opacity" , 0);
}

function restoreTwoCards(cardId1, cardId2){
    restoreCard(cardId1);
    restoreCard(cardId2);
}

function restoreCard(cardId){
    $("#card" + cardId).css("background-image", "url(" + defalutImagePath + ")");
}

function updateScore(cardId1, cardId2){
    if (compareCards(cardId1, cardId2)){
        setTimeout(function() {hideTwoCards(cardId1, cardId2)} , 1000);
    }
    else{
        setTimeout(function() {restoreTwoCards(cardId1, cardId2)}, 1000);
    }
}

function cardManager(cardId){
    showCard(cardId);
    if (secondCard){
        secondCard = false;
        updateScore(prevCard, cardId);
    }
    else{
        prevCard = cardId;
        secondCard = true;
    }
}


prepareCards();
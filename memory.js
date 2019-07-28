var cardNames = ["diego.jpg", "xardas.jpg", "diego.jpg", "gorn.jpg", "milten.jpg", "lares.jpg", "gorn.jpg", "xardas.jpg", "milten.jpg", "lester.jpg", "lester.jpg", "lares.jpg"]
var secondCard = false;
var prevCard = 0;
var defalutImagePath = "images/dragon.jpg";
var lock = false;
var numberOfPairs = 6;
var turnNumber = 0;

function showFront(cardId){
    $("#frontCard"+cardId).animate(
        {deg: 0},
        {
            duration: 1000,
            step: function(now) {
                $(this).css({ transform: 'rotateY(' + now + 'deg)' });
            }
        }
    )
}

function hideFront(cardId){
    $("#frontCard"+cardId).animate(
        {deg: 90},
        {
            duration: 1000,
            step: function(now) {
                $(this).css({ transform: 'rotateY(' + now + 'deg)' });
            }
        }
    )
}

function showBack(cardId){
    $("#backCard"+cardId).animate(
        {deg: 90},
        {
            duration: 1000,
            step: function(now) {
                $(this).css({ transform: 'rotateY(' + (90 - now) + 'deg)' });
            }
        }
    )
}

function hideBack(cardId){
    $("#backCard"+cardId).animate(
        {deg: 0},
        {
            duration: 1000,
            step: function(now) {
                console.log("Here" + now);
                $(this).css({ transform: 'rotateY(' + (90 - now) + 'deg)' });
            }
        }
    )
}

function showCard(cardId){
    hideFront(cardId);
    setTimeout(function() {showBack(cardId)}, 1000);

    /*$("#frontCard"+cardId).css("animation", "cardrotation 0.2s ease-in forwards");
    $("#backCard"+cardId).css("animation", "cardrotation 0.2s 0.2s ease-out forwards reverse");*/
}

Array.prototype.shuffle = function(){
    for (let i=this.length-1; i>0; i--){
        let j = Math.floor(Math.random() * (i+1));
        [this[i], this[j]] = [this[j], this[i]]; 
    }
}

function prepareCards(){ 
    cardNames.shuffle();
    $("<ul class='panel'>").appendTo("#board");
    for(let i=0; i<12; i++){
        $("<li id='liitem" + i + "'>")
            .on("click", function(){cardManager(i)})
            .appendTo(".panel");
        $("<div id='backCard" + i + "'></div>")
            .addClass("back")
            .css("background-image", "url('images/" + cardNames[i])
            .appendTo("#liitem" + i);
        $("<div id='frontCard" + i + "'></div>")
            .addClass("front")
            .appendTo("#liitem" + i);
        $("</li>").appendTo(".panel");
    }
    $("</ul>").appendTo("#board");
}

function compareCards(cardId1, cardId2){
    return cardNames[cardId1] == cardNames[cardId2];
}

function myFadeIn(name, msTime){
    $(name).fadeIn(msTime);
}

function fadeAndChange(){
    $("#board").html("<div id=endScreen>Congratulations, you won </br> It took you " + turnNumber 
        + " turns</br>  <div class='resetButton'>Play again</div></div>");
    $(".resetButton").on("click", function() {location.reload()});
    myFadeIn("#board", 2000);
}

function endGame(){
    
    $("#score").fadeOut(900);
    $("#board").fadeOut(1000);
    setTimeout(function() {fadeAndChange()}, 1000);
}

function checkEnd(){
    if(numberOfPairs == 0){
        endGame();
        $("#board").fadeIn(3000);
        
    }
}

function hideTwoCards(cardId1, cardId2){
    hideCard(cardId1);
    hideCard(cardId2);
    lock = false;
}

function hideCard(cardId){
    $("#frontCard" + cardId).css("opacity" , 0);
    $("#backCard" + cardId).css("opacity" , 0);

}

function restoreTwoCards(cardId1, cardId2){
    restoreCard(cardId1);
    restoreCard(cardId2);
    lock = false;
}

function restoreCard(cardId){
    hideBack(cardId);
    setTimeout(function() {showFront(cardId)}, 1000);
}


function updateScore(){
    $("#score").html("TURN: " + turnNumber);
}


function checkResult(cardId1, cardId2){
    turnNumber++;
    if (compareCards(cardId1, cardId2)){
        setTimeout(function() {hideTwoCards(cardId1, cardId2)} , 1000);
        numberOfPairs--;
        checkEnd();
    }
    else{
        setTimeout(function() {restoreTwoCards(cardId1, cardId2)}, 3000);
    }
    setTimeout(function() {updateScore()}, 1000);
}

function cardManager(cardId){
    if (!lock){
        showCard(cardId);
        if (secondCard && (prevCard != cardId)){
            lock = true;
            secondCard = false;
            checkResult(prevCard, cardId);
        }
        else{
            prevCard = cardId;
            secondCard = true;
        }
    }

}


prepareCards();
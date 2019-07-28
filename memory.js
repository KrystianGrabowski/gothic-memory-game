var cardNames = ["diego.jpg", "xardas.jpg", "diego.jpg", "gorn.jpg", "milten.jpg", "lares.jpg", "gorn.jpg", "xardas.jpg", "milten.jpg", "lester.jpg", "lester.jpg", "lares.jpg"]
var secondCard = false;
var prevCard = -1;
var defalutImagePath = "images/dragon.jpg";
var lock = false;
var numberOfPairs = 6;
var turnNumber = 0;
var changeTime = 300;

function toggleFront(cardId, finVal){
    $("#frontCard"+cardId).animate(
        {deg: finVal},
        {
            duration: changeTime,
            step: function(now) {
                $(this).css({ transform: 'rotateY(' + now + 'deg)' });
            }
        }
    )
}

function toggleBack(cardId, finVal){ 
    $("#backCard"+cardId).animate(
        {deg: finVal},
        {
            duration: changeTime,
            step: function(now) {
                console.log("KOL" + now);
                $(this).css({ transform: 'rotateY(' + (90 - now) + 'deg)' });
            }
        }
    )
}

function showCard(cardId){
    toggleFront(cardId, 90);
    setTimeout(function() {toggleBack(cardId, 90)}, changeTime)
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

function unlock(){
    lock = false;
}

function hideTwoCards(cardId1, cardId2){
    hideCard(cardId1);
    hideCard(cardId2);
    setTimeout(function() {unlock()}, changeTime);
}

function hideCard(cardId){
    $("#frontCard" + cardId).css("opacity" , 0);
    $("#backCard" + cardId).css("opacity" , 0);
}

function restoreTwoCards(cardId1, cardId2){
    restoreCard(cardId1);
    restoreCard(cardId2);
    setTimeout(function() {unlock()}, changeTime);
}

function restoreCard(cardId){
    toggleBack(cardId, 0);
    setTimeout(function() {toggleFront(cardId, 0)}, changeTime);
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
        setTimeout(function() {restoreTwoCards(cardId1, cardId2)}, 1500);
    }
    setTimeout(function() {updateScore()}, 1000);
}

function cardManager(cardId){
    var opacityVal = $("#front").css('opacity');
    if (opacityVal != 0 && !lock){
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
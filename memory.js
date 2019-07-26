var cardNames = ["diego.jpg", "xardas.jpg", "diego.jpg", "gorn.jpg", "milten.jpg", "lares.jpg", "gorn.jpg", "xardas.jpg", "milten.jpg", "lester.jpg", "lester.jpg", "lares.jpg"]

function showCard(i){
    $("#card" + i).css("background-image", "url('images/" + cardNames[i] + "')");
}

function prepareCards(){ 
    for(let i=0; i<12; i++){
        $("<div id='card" + i + "' class='card'></div>")
            .on("click", function(){showCard(i)})
            .appendTo("#board");
    }
}



prepareCards();
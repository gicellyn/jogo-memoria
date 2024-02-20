//constantes que representam as classes dos elementos 
const FRONT = "front"
const BACK = "back"
const CARD = "card"
const ICON = "icon"


startGame();

function startGame(){
    
    initializeCards(game.criarCartasdeTechs());
}

//função que vai transformar os modelos das cartas em algo 'visual'
function initializeCards(cards){
    //função responsável por criar e permitir a interação do flip com o onclick
    let gameBoard = document.getElementById("gameBoard");

    gameBoard.innerHTML = '';

    //uma das formas de loop dentro de um array
    game.cards.forEach(card => {
        
        let cardElement = document.createElement('div');
        cardElement.id = card.id;
        cardElement.classList.add(CARD);
        
        //para saber se as cartas são iguais
        cardElement.dataset.icon = card.icon;

        createCardContent(card, cardElement);

        //função click e virar carta
        cardElement.addEventListener('click', flipCard);

        //colocar a carta no tabulerio
        gameBoard.appendChild(cardElement);


    });
    
}

//função para criar o conteúdo da carta, criando o front e o back de cada carta 
function createCardContent(card, cardElement){
    
    createCardFace(FRONT, card, cardElement);
    createCardFace(BACK, card, cardElement);


}

function createCardFace(face, card, element){
    
    let cardElementFace = document.createElement('div');
    cardElementFace.classList.add(face);
    
    if(face === FRONT){
        
        let iconElement = document.createElement('img');
        iconElement.classList.add(ICON);
        iconElement.src = "./assets/images/" + card.icon + ".png"; //endereço das img
        cardElementFace.appendChild(iconElement);

    }else{
        cardElementFace.innerHTML = "&lt/&gt";
    }
    element.appendChild(cardElementFace);

}

function flipCard(){

    if(game.setCard(this.id)){

        this.classList.add("flip");
        
        if(game.secondCard){  
            if(game.checkMatch()){
                game.clearCards();
                if(game.checkGameOver()){
                    let gameOverLayer = document.getElementById("gameOver")
                    gameOverLayer.style.display = 'flex';
                }

            }else{
                setTimeout(()=>{
                let firstCardView = document.getElementById(game.firstCard.id);
                let secondCardView = document.getElementById(game.secondCard.id);

                firstCardView.classList.remove('flip');
                secondCardView.classList.remove('flip');
                game.unflipCards();
                }, 1000) 
            }
        } 
    }
}

function restart(){
    
    game.clearCards();
    startGame();
    
    let gameOverLayer = document.getElementById("gameOver")
    gameOverLayer.style.display = 'none';
}
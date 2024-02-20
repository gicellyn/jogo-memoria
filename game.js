
let game = {

    //lock mode vai servir para ao selecionar a segunda carta e checar
    lockMode: false,

    firstCard: null,
    secondCard: null,

    //variavel que representa as 'tecnologias' de cada pnj
    techs : ['bootstrap',
    'css',
    'electron',
    'firebase',
    'html',
    'javascript',
    'jquery',
    'mongo',
    'node',
    'react'],

    cards : null,

    setCard: function(id){

        //1° identificar a carta 
        let card = this.cards.filter(card=>card.id===id)[0];
        console.log(card);
        //passos para saber se as cartas foram viradas ou não
        
        if(card.flipped || this.lockMode){
            return false;
        }

        if(!this.firstCard){
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true
        }else{
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    //checar se combinam as duas cartas
    checkMatch: function(){
        if(!this.firstCard || !this.secondCard){
            return
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

    //função para liberar as cartas
    clearCards:function(){
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },

    unflipCards(){
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver(){
        
        return this.cards.filter(card => !card.flipped).length == 0;
    },
    

    // as função se tornam métodos aqui -> nome - 'function' - parâmetro || tbm poderia usar arrow functions 
    
    // modelo para cada uma das cartas -- 
    criarCartasdeTechs: function(){

        this.cards = [];
        //uma das formas de loop dentro de um array
        for(let tech of this.techs){
            this.cards.push(this.criarPardeTechs(tech));

        }
        //flatMap = ele separa os itens do array e returna para o array principal
        this.cards =  this.cards.flatMap(pair => pair);
        this.embaralharCards();
        return this.cards;
    }, 

    criarPardeTechs: function (tech){
    
        return[{
            id: this.criarIdcomTechs(tech),
            icon: tech,
            flipped: false,
        }, {
            id: this.criarIdcomTechs(tech),
            icon: tech,
            flipped: false,
        }]
    },

    criarIdcomTechs: function(tech){
        return tech + parseInt(Math.random() * 1000);
    },

    //embaralhar as cartas usando o algoritmo de Fisher-Yates
    embaralharCards: function(cards) {
        let currentIndex = this.cards.length;
        let randomIndex = 0;

        // Enquanto ainda houver elementos para embaralhar
        while (currentIndex !== 0) {
        
            // Escolha um índice aleatório entre 0 e currentIndex
            randomIndex = Math.floor(Math.random() * currentIndex);
            
            // Decrementa o índice atual
            currentIndex--;

            // Troque o elemento no índice atual com o elemento no índice aleatório substituindo o valores das variáveis 
            [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]];
        }
    }


}
// GameController.js

const Card = require("./Card");

class GameController {
    constructor(config) {
        // configuration at start
        this.config = config;
        this.numberOfCards = config.board_size;
        this.cardsPerRow = config.cards_per_row;

        this.gameState = config.game_state_no_turned_card;
        this.firstCard = -1;
        this.secondCard = -1;

        // cards
        this.deck = [];
    }

    setEventListeners() {
        let i;
        let id = "";

        for(i = 0; i < this.numberOfCards; i++){
            id = "card-"+i;

            let card = new Card(id, this, this.config)
            this.deck[i] = card;

            document.getElementById(id).addEventListener("click", (e) => {
                card.onClickHandler(e);
            });
        }
    }

    initialize() {
        console.log(`Shuffling the cards... ${this.numberOfCards/this.cardsPerRow} rows and ${this.cardsPerRow} cards per row`)

        this.createDivs();
        this.setEventListeners();
        this.setIconClassToCards();
    }

    getNextUninitializedCardIndex(idx) {
        let i;
        for(i = 0; i < this.numberOfCards; i++) {
            if(this.deck[(idx+i) % this.numberOfCards].getIconClass() === ""){
                return (idx+i)  % this.numberOfCards;
            }
        }
        return 0;   //never end up here
    }

    setIconClassToCards() {
        let i, icon, x, y;

        for(i = 0; i < this.numberOfCards/2; i++){
            icon = Math.floor(Math.random() * this.config.icon_names.length);

            x = Math.floor(Math.random() * this.numberOfCards);
            y = Math.floor(Math.random() * this.numberOfCards);

            x = this.getNextUninitializedCardIndex(x);
            this.deck[x].setIconClass(this.config.icon_names[icon]);
            y = this.getNextUninitializedCardIndex(y);
            this.deck[y].setIconClass(this.config.icon_names[icon]);

            console.log(`Icon ${icon} set to ${x} and ${y} items`)
        }
    }

    createDivRow(id) {
        let divRow;
        divRow = document.createElement('div');
        divRow.className = 'row';
        divRow.id = 'row-'+id;
        return divRow;
    }

    createCard(cardId) {
        let divCell;
        divCell = document.createElement('div');
        divCell.className = 'col-sm card';
        divCell.id = 'card-'+cardId;
        return divCell;
    }

    createCardBody() {
        let divCell;
        divCell = document.createElement('div');
        divCell.className = 'card-body';
        divCell.style.margin = 'auto';
        return divCell;
    }

    createIcon(cardId) {
        let elem;
        elem = document.createElement('span');
        elem.className = this.config.card_hidden;
        elem.id = 'span-'+cardId;
        elem.setAttribute('aria-hidden', 'true');
        return elem;
    }

    createDivs() {
        let i, j;
        let cardId;
        let rowElement, cardElement, cardBodyElement, iconElement;

        for(i = 0; i < this.numberOfCards/this.cardsPerRow; i++){
            rowElement = this.createDivRow(i);
            for(j = 0; j < this.cardsPerRow; j++){
                cardId = (j + (i * this.cardsPerRow));

                cardElement = this.createCard(cardId);
                cardBodyElement = this.createCardBody();
                iconElement = this.createIcon(cardId);

                cardBodyElement.appendChild(iconElement);
                cardElement.appendChild(cardBodyElement);
                rowElement.appendChild(cardElement);
            }
            document.getElementById('game-content').appendChild(rowElement);
        }
    }
    turnCard(id) {
        if(this.gameState == this.config.game_state_no_turned_card) {
            this.firstCard = id;
            this.deck[id].turnVisible();
            this.gameState = this.config.game_state_1_turned_card;
        }
        else if (this.gameState == this.config.game_state_1_turned_card) {
            if(id == this.firstCard){
                return;
            }
            this.secondCard = id;
            this.deck[id].turnVisible();
            this.gameState = this.config.game_state_2_turned_card;

            if(this.deck[this.firstCard].getIconClass() == this.deck[this.secondCard].getIconClass()){
                //cards match
                this.deck[this.firstCard].setState(this.config.card_state_pair_found);
                this.deck[this.secondCard].setState(this.config.card_state_pair_found);

                setTimeout(() => {
                    this.deck[this.firstCard].turnCardGameOver();
                    this.deck[this.secondCard].turnCardGameOver();
                    this.gameState = this.config.game_state_no_turned_card;
                }, this.config.turn_hidden_delay);
            } else {
                //didnt match
                setTimeout(() => {
                    this.deck[this.firstCard].turnHidden();
                    this.deck[this.secondCard].turnHidden();
                    this.gameState = this.config.game_state_no_turned_card;
                }, this.config.turn_hidden_delay);
            }
        }
    }
}

module.exports = GameController;
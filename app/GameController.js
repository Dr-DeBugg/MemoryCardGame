// GameController.js

class GameController {
    constructor(config) {
        // configuration at start
        this.config = config;
        this.numberOfCards = config.board_size;
        this.cardsPerRow = config.cards_per_row;

        this.gameState = config.game_state_no_turned_card;

        // cards
        this.deck = [];
    }

    setEventListeners() {
        
    }

    initialize() {
        console.log(`Shuffling the cards... ${this.cardsPerRow} rows and ${this.numberOfCards/this.cardsPerRow} cards per row`)

        this.createDivs();
        this.setEventListeners();
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
        elem.className = this.config.card_unturned;
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
}

module.exports = GameController;
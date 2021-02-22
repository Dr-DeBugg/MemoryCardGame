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

    initialize() {
        console.log(`Shuffling the cards... ${this.cardsPerRow} rows and ${this.numberOfCards/this.cardsPerRow} cards per row`)
    }
}

module.exports = GameController;
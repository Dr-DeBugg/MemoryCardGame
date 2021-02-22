// Card.js

class Card {
    constructor(id, gameController, config) {
        this.id = id;

        this.state = config.card_state_in_game;
        this.gameController = gameController;
        this.config = config;
    }
}

module.exports = Card;
// Card.js

class Card {
    constructor(id, gameController, config) {
        this.id = id;

        // get the id-number from string "card-xx"
        this.idNum = this.id.substr(5);

        this.state = config.card_state_in_game;
        this.gameController = gameController;
        this.config = config;

        this.iconClass = "";
    }

    setIconClass(iconClass) {
        this.iconClass = iconClass;
    }
    getIconClass() {
        return this.iconClass;
    }

    onClickHandler(e) {
        if(this.state != this.config.card_state_pair_found){
            this.gameController.turnCard(this.idNum);
        }
        console.log("You clicked a card: " + this.id);
    }
    getState() {
        return this.state;
    }
    setState(state) {
        this.state = state;
    }
    turnVisible(){
        document.getElementById("span-"+this.idNum).className = this.iconClass;
    }
    turnHidden(){
        document.getElementById("span-"+this.idNum).className = this.config.card_hidden;
    }
    turnCardGameOver(){
        document.getElementById("span-"+this.idNum).className = this.config.card_pair_found;
    }
}

module.exports = Card;
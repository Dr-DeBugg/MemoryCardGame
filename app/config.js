// config.js
let icons = require('./icons');

const config = {
    board_size: 20,
    cards_per_row: 4,

    icon_names: icons,
    card_hidden: "oi oi-aperture text-primary",
    card_pair_found: "oi oi-check text-success",

    game_state_no_turned_card: 0,
    game_state_1_turned_card: 1,
    game_state_2_turned_card: 2, //delay timer is on
    game_state_game_over: 3,

    card_state_in_game: 0,
    card_state_pair_found: 1,

    turn_hidden_delay: 1000

};

module.exports = config;
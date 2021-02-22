// config.js
let icons = require('./icons');

const config = {
    board_size: 24,
    cards_per_row: 4,

    icon_names: icons,
    game_state_no_turned_card: 0,
    game_state_1_turned_card: 1,
    game_state_2_turned_card: 2, //delay timer is on
    game_state_game_over: 3,

};

module.exports = config;
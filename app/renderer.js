// renderer.js
let $ = require('jquery');
const GameController = require('./GameController');
require('popper.js');
require('bootstrap');

window.jQuery = $;
window.$ = $;

console.log('renderer started!');
let config = require('./config')

let gameController = new GameController(config);
gameController.initialize();
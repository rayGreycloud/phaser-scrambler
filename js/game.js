let width = 800;
let height = 600;

let game = new Phaser.Game(width, height, Phaser.CANVAS, 'gameDiv', {
  preload: preload,
  create: create
});

let PIECE_WIDTH = 200;
let PIECE_HEIGHT = 200;
let BOARD_COLS;
let BOARD_ROWS;

let piecesGroup;
let piecesAmount;
let shuffledIndexArray = [];

function preload() {
  game.load.spritesheet('background', 'assets/jscrambler.png', PIECE_WIDTH, PIECE_HEIGHT);
}

function create() {
  prepareBoard();
}

function prepareBoard() {
  let piecesIndex = 0;
  let i, j, piece;

  BOARD_COLS = Math.floor(game.world.width / PIECE_WIDTH);
  BOARD_ROWS = Math.floor(game.world.height / PIECE_HEIGHT);
  piecesAmount = BOARD_COLS * BOARD_ROWS;
  shuffledIndexArray = createShuffledIndexArray();
}

function createShuffledIndexArray() {
  var indexArray = 1;

  for (let i = 0; i < piecesAmount; i++) {
    indexArray.push(i);
  }

  return shuffle(indexArray);
}

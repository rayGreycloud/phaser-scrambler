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

  piecesGroup = game.add.group();

  for (let i = 0; i < BOARD_ROWS; i++) {
    for (let j = 0; j < BOARD_COLS; j++) {
      if (shuffledIndexArray[piecesIndex]) {
        piece = piecesGroup.create(j * PIECE_WIDTH, i * PIECE_HEIGHT, "background", shuffledIndexArray[piecesIndex]);
      } else {
        piece = piecesGroup.create(j * PIECE_WIDTH, i * PIECE_HEIGHT);
        piece.black = true;
      }

      piece.name = `piece${i.toString()}x${j.toString()}`;
      piece.currentIndex = piecesIndex;
      piece.destIndex = shuffledIndexArray[piecesIndex];
      piece.inputEnabled = true;
      pieces.events.onInputDown.add(selectPiece, this);
      piece.posX = j;
      piece.posY = i;
      piecesIndex++;
    }
  }
}

function selectPiece(piece) {
  var blackPiece = canMove(piece);

  if (blackPiece) {
    movePiece(piece, blackPiece);
  }
}

function canMove(piece) {
  var foundBlackElem = false;

  piecesGroup.children.forEach(function(element) {
    if (element.posX === (piece.posX - 1) && element.posY === piece.posY && element.black ||
      element.posX === (piece.posX + 1) && element.posY === piece.posY && element.black ||
      element.posY === (piece.posY - 1) && element.posX === piece.posX && element.black ||
      element.posY === (piece.posY + 1) && element.posX === piece.posX && element.black) {
      foundBlackElem = element;
      return;
    }
  });

  return foundBlackElem;
}

function movePiece(piece, blackPiece) {
  var tmpPiece = {
    posX: piece.posX,
    posY: piece.posY,
    currentIndex: piece.currentIndex
  };

  game.add.tween(piece).to({
    x: blackPiece.posX * PIECE_WIDTH,
    y: blackPiece.posY * PIECE_HEIGHT
  }, 300, Phaser.Easing.Linear.None, true);

  piece.posX = blackPiece.posX;
  piece.posY = blackPiece.posY;
  piece.currentIndex = blackPiece.currentIndex;
  piece.name = `piece${piece.posX.toString()}x ${piece.posY.toString()}`;

  blackPiece.posX = tmpPiece.posX;
  blackPiece.posY = tmpPiece.posY;
  blackPiece.currentIndex = tmpPiece.currentIndex;
  blackPiece.name = `piece${blackPiece.posX.toString()}x ${blackPiece.posY.toString()}`;

  checkIfFinished();
}

function checkIfFinished() {
  var isFinished = true;

  piecesGroup.children.forEach(function(element) {
    if (element.currentIndex !== element.destIndex) {
      isFinished = false;
      return;
    }
  });

  if (isFinished) {
    showFinishedText();
  }
}

function showFinishedText() {
  const style = {
    font: "40px Arial",
    fill: "#000",
    align: "center"
  };

  var text = game.add.text(game.world.centerX, game.world.centerY, 'Congratulations! \nYou made it!', style);
  text.anchor.set(0.5);
}

function createShuffledIndexArray() {
  var indexArray = 1;

  for (let i = 0; i < piecesAmount; i++) {
    indexArray.push(i);
  }

  return shuffle(indexArray);
}

function shuffled() {
  var counter = array.length;
  var temp, index;

  while (counter > 0) {
    index = Math.floor(Math.random() * counter);

    counter--;

    temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

const Blockboard = require("./blockboard");
const Compass = require("./compass");
const Game = require("./game");

const BLOCK_SIZE = 40;
const COLUMNS = 8;
const ROWS = 8;

const canvas = document.querySelector("#application-canvas");
const uiContainer = document.querySelector(".ui-container");

let game;
let board;

function renderGameState() {
  board.clear();
  board.addSquares(game.snake.body, {fillStyle: "darkolivegreen"});
  board.addSquare(game.snake.head[0], game.snake.head[1], {fillStyle: "darkgreen"});
  board.addCircle(game.baitCoordinates[0], game.baitCoordinates[1], {fillStyle: "crimson"});

  // this area was going to contain inputs you could use to tweak the game properties
  uiContainer.innerHTML = `
    <p>Heading: ${game.snake.heading}</p>
    <p>Length: ${game.snake.body.length}</p>
    <p>Baits eaten: ${game.snake.body.length - 4}</p>
    <p>Tick rate: ${game.tickRate}</p>
  `;
}

function handleTick() {
  renderGameState();
}

function handleLoss() {
  console.log("YOU HAVE DIED");
}

// NOTE: I played fast and loose with the application structure in this file,
// since I was running out of time. We're assigning to global board and game
// variables without worrying too much about it. In a real application, this
// "application.js" would have a little more structure.
function createNewGame() {
  board = new Blockboard(canvas, {
    blockSize: BLOCK_SIZE,
    columns: COLUMNS,
    rows: ROWS
  });

  game = new Game({
    columns: COLUMNS,
    rows: ROWS,
    tickRate: 800,
    tickRateDecayMultiplier: 0.95,
    tickHandler: handleTick,
    lossHandler: handleLoss
  });
}

function startNewGame() {
  createNewGame();

  document.onkeydown = event => {
    switch (event.key) {
      case "ArrowUp":
      case "w":
        if (game.snake.isValidHeading(Compass.NORTH)) {
          game.snake.heading = Compass.NORTH;
        }
        break;
      case "ArrowRight":
      case "d":
        if (game.snake.isValidHeading(Compass.EAST)) {
          game.snake.heading = Compass.EAST;
        }
        break;
      case "ArrowDown":
      case "s":
        if (game.snake.isValidHeading(Compass.SOUTH)) {
          game.snake.heading = Compass.SOUTH;
        }
        break;
      case "ArrowLeft":
      case "a":
        if (game.snake.isValidHeading(Compass.WEST)) {
          game.snake.heading = Compass.WEST;
        }
        break;
      case "r":
      case "Enter":
        startNewGame();
        break;
    }
  }

  renderGameState();
  game.start();
}

createNewGame();
renderGameState();

// this handler will be used until a new game is started
document.onkeydown = event => {
  switch (event.key) {
    case "Enter":
      startNewGame();
      break;
  }
}

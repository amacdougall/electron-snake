const Blockboard = require("./src/blockboard");

const BLOCK_SIZE = 20;
const COLUMNS = 20;
const ROWS = 20;

const canvas = document.querySelector("#application-canvas");

const board = new Blockboard(canvas, {
  blockSize: BLOCK_SIZE,
  columns: COLUMNS,
  rows: ROWS
});

let coords = [[0, 0], [0, 1], [1, 0]];

board.addSquares(coords, {fillStyle: "black"});

for (let i = 0; i < 20; i++) {
  let red = Math.floor(255 * Math.random());
  let green = Math.floor(255 * Math.random());
  let blue = Math.floor(255 * Math.random());
  let color = `rgb(${red}, ${green}, ${blue})`;
  board.addCircle(Math.floor(20 * Math.random()), i, {
    strokeStyle: color,
    // fillStyle: color,
    lineWidth: 5
  });
}

// so this is all working pretty good

canvas.onclick = event => {
  let x = Math.floor(event.offsetX / BLOCK_SIZE);
  let y = Math.floor(event.offsetY / BLOCK_SIZE);

  board.addSquare(x, y, {fillStyle: "green"});
};

document.onkeydown = event => {
  /*
  console.log("onkeydown: code \"%s\", key \"%s\", charcode %s, keycode %s",
    event.code, event.key, event.charCode, event.keyCode);
  */
  // in Chrome, at least, you can check event.key for:
  // "ArrowRight", and left, etc
  // "w", and asd, etc
};

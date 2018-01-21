const Snake = require("./snake");

const DEFAULT_COLUMNS = 20;
const DEFAULT_ROWS = 20;

/**
 * Core logic for the snake game. Should not be aware of rendering details.
 */
class Game {
  /**
   * Creates a new Game instance. Minimum playfield size is 5 x 5.
   *
   * @param {Object} options - An options hash.
   * @param {Number} options.columns - The width of the playfield. Default 20.
   * @param {Number} options.rows - The height of the playfield. Default 20.
   */
  constructor({columns = DEFAULT_COLUMNS, rows = DEFAULT_ROWS} = {}) {
    if (columns < 5 || rows < 5) {
      throw new Error(`Game playfield must be at least 5 x 5.
        Requested dimensions were ${columns} x ${rows}.`);
    }

    // playfield boundaries
    this.columns = columns;
    this.rows = rows;

    // our humble protagonist
    this.snake = new Snake({game: this});

    // this.baitCoordinates = this.chooseBaitCoordinates();
  }

  /**
   * Returns valid bait coordinates, as an [x, y] pair. Bait will be located
   * within the playfield, on a square not currently occupied by the snake.
   */
  chooseBaitCoordinates() {
    // build a grid of coordinates occupied by the snake, using sparse arrays
    const grid = [];

    this.snake.body.forEach(segment => {
      let [column, row] = segment;
      grid[column] = grid[column] || [];
      grid[column][row] = false; // close candidate
    });

    // zip grid into an array of [x, y] pairs
    const candidates = [];

    for (let column = 0; column < this.columns; column++) {
      for (let row = 0; row < this.rows; row++) {
        if (grid[column] == null || grid[column][row] !== false) {
          // if column was untouched, or cell is not explicitly false, assume open
          candidates.push([column, row]);
        }
      }
    }

    // finally, return a random element from that list
    return candidates[(Math.floor(candidates.length * Math.random()))];
  }
}

module.exports = Game;

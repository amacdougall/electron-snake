const Snake = require("./snake");
const _ = require("lodash");

const DEFAULT_COLUMNS = 20;
const DEFAULT_ROWS = 20;

const DEFAULT_TICK_RATE = 1000;
const DEFAULT_TICK_RATE_DECAY_MULTIPLIER = 0.95;

/**
 * Core logic for the snake game. Should not be aware of rendering details.
 */
class Game {
  /**
   * Creates a new Game instance. Minimum playfield size is 5 x 5.
   *
   * @param {Object} options - An options hash.
   * @param {Number} [options.columns] - The width of the playfield. Default 20.
   * @param {Number} [options.rows] - The height of the playfield. Default 20.
   * @param {Number} [options.tickRate] - The time between game loop ticks, in
   * ms. Default 1000.
   * @param {Number} [options.tickRateDecayMultiplier] - Each time the snake
   * eats the bait, the current tick rate will be multiplied by this value. If
   * it is greater than 1.0, the game will get slower with each bait! Default
   * 0.95.
   * @param {Function} [options.tickHandler] - A function called after each
   * tick of the game loop. Host code may wish to render the game state.
   * @param {Function} [options.lossHandler] - A function called when the user
   * has lost the game.
   */
  constructor({
    columns = DEFAULT_COLUMNS,
    rows = DEFAULT_ROWS,
    tickRate = DEFAULT_TICK_RATE,
    tickRateDecayMultiplier = DEFAULT_TICK_RATE_DECAY_MULTIPLIER,
    tickHandler = null,
    lossHandler = null
  } = {}) {
    if (columns < 5 || rows < 5) {
      throw new Error(`Game playfield must be at least 5 x 5.
        Requested dimensions were ${columns} x ${rows}.`);
    }

    this.columns = columns;
    this.rows = rows;

    this.tickRate = tickRate || DEFAULT_TICK_RATE;
    this.tickRateDecayMultiplier = tickRateDecayMultiplier || DEFAULT_TICK_RATE_DECAY_MULTIPLIER;

    this.tickHandler = tickHandler;
    this.lossHandler = lossHandler;

    this.snake = new Snake({game: this});
    this.baitCoordinates = this.chooseBaitCoordinates();
    this.running = false;
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

  get snakeWillHitWall() {
    return this.snake.destination[0] >= this.columns ||
           this.snake.destination[1] >= this.rows;
  }

  get snakeWillHitSelf() {
    return this.snake.body.some(segment => _.isEqual(segment, this.snake.destination));
  }

  get snakeWillEatBait() {
    return _.isEqual(this.snake.destination, this.baitCoordinates);
  }

  advanceGameLoop() {
    if (this.snakeWillHitWall || this.snakeWillHitSelf) {
      this.endGameWithLoss();
    } else if (this.snakeWillEatBait) {
      this.snake.advanceHead();
      this.tickRate = Math.round(this.tickRate * this.tickRateDecayMultiplier);
      this.baitCoordinates = this.chooseBaitCoordinates();
    } else {
      this.snake.move();
    }
  }

  start() {
    this.running = true;

    const tick = () => {
      console.log("game tick occurring");
      if (this.running) {
        this.advanceGameLoop();
        this.tickHandler && this.tickHandler();
        setTimeout(tick, this.tickRate);
      }
    };

    // don't tick immediately, to give the user a chance to change the heading
    setTimeout(tick, this.tickRate);
  }

  /**
   * YOU HAVE DIED
   */
  endGameWithLoss() {
    this.running = false;
    this.lossHandler && this.lossHandler();
  }
}

module.exports = Game;

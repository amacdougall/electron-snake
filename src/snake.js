const Compass = require("./compass");

/**
 * The slithering hero of our game.
 */
class Snake {
  /**
   * Creates a new Snake. For now, the snake always begins in the upper left
   * square, at a length of four.
   */
  constructor() {
    this._body = [
      [0, 0], // tail
      [1, 0],
      [2, 0],
      [3, 0] // head
    ];

    this.heading = Compass.EAST;
  }

  /**
   * The body of the snake, as an array of coordinate pair arrays. The body
   * array acts as a queue: each time the snake moves, we add the destination
   * coordinates to the array as the new head, and remove the tail, simulating
   * motion. If the snake has eaten the bait, we do the same, but don't remove
   * the tail.
   */
  get body() {
    return this._body;
  }

  set body(value) {
    throw new Error("Attempted to set read-only value Snake.body.");
  }

  /**
   * The coordinates representing the location of the snake's head.
   */
  get head() {
    return this._body[this._body.length - 1];
  }

  set head(value) {
    throw new Error("Attempted to set read-only value Snake.head.");
  }

  get heading() {
    return this._heading;
  }

  set heading(value) {
    if (this.isValidHeading(value)) {
      this._heading = value;
    } else {
      throw new Error(`Attempted to set invalid heading ${value} while head was
        facing ${this.facing}. Remember to check Snake.isValidHeading
        before setting the heading value.`);
    }
  }

  /**
   * Returns the direction the snake's head is facing, based on the relative
   * locations of its head and the preceding segment.
   */
  // NOTE: another approach would have been to log the direction of the most recent step.
  get facing() {
    let [shoulders, head] = this.body.slice(this.body.length - 2);

    if (head[0] > shoulders[0]) {
      return Compass.EAST;
    } else if (head[0] < shoulders[0]) {
      return Compass.WEST;
    } else if (head[1] > shoulders[1]) {
      return Compass.SOUTH;
    } else if (head[1] < shoulders[1]) {
      return Compass.NORTH;
    } else {
      throw new Error(`Failed to discern Snake.facing: head and second segment
        are in invalid positions. Head: ${head}; shoulders: ${shoulders}.`);
    }
  }

  /**
   * True if the supplied compass direction is a valid heading for the snake.
   */
  isValidHeading(value) {
    return value !== Compass.inverse(this.facing);
  }

  /**
   * Returns the [x, y] coordinate pair for the next square the snake will reach.
   */
  get destination() {
    switch (this.heading) {
      case Compass.NORTH:
        return [this.head[0], this.head[1] - 1];
      case Compass.EAST:
        return [this.head[0] + 1, this.head[1]];
      case Compass.SOUTH:
        return [this.head[0], this.head[1] + 1];
      case Compass.WEST:
        return [this.head[0] - 1, this.head[1]];
    }
  }

  /**
   * Moves the snake one square in the current heading. Invalid movement is
   * possible: game code is responsible for collision detection.
   */
  move() {
    this.advanceHead();
    this._body.shift(); // remove previous tail segment
  }

  /**
   * Moves the snake's head one square in the current heading. Invalid movement
   * is possible: game code is responsible for collision detection. Unlike
   * move(), this method does NOT remove the previous tail. This means that the
   * snake will grow by one segment. Use this when eating the bait.
   */
  advanceHead() {
    this._body.push(this.destination);
  }
}

module.exports = Snake;

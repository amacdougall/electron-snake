const assert = require("assert");
const Compass = require("../src/compass");
const Snake = require("../src/snake");

describe("the Snake constructor", function() {
  beforeEach(function() {
    this.snake = new Snake();
  });

  it("should create a four-segment snake", function() {
    assert.equal(4, this.snake.body.length);
  });

  it("should position the segments from 0, 0 to 3, 0", function() {
    assert.equal(0, this.snake.body[0][0]);
    assert.equal(0, this.snake.body[0][1]);

    assert.equal(1, this.snake.body[1][0]);
    assert.equal(0, this.snake.body[1][1]);

    assert.equal(2, this.snake.body[2][0]);
    assert.equal(0, this.snake.body[2][1]);

    assert.equal(3, this.snake.body[3][0]);
    assert.equal(0, this.snake.body[3][1]);
  });

  it("should set the snake heading to Compass.EAST", function() {
    assert.equal(Compass.EAST, this.snake.heading);
  });
});

describe("Snake.isValidHeading", function() {
  beforeEach(function() {
    this.snake = new Snake();
  });

  it("should return true when given a valid value", function() {
    assert.ok(this.snake.isValidHeading(Compass.SOUTH));
  });

  it("should return false when given an invalid value", function() {
    assert.ok(!this.snake.isValidHeading(Compass.WEST));
  });
});

describe("Snake.heading setter", function() {
  beforeEach(function() {
    this.snake = new Snake();
  });

  it("should update the heading when given a valid value", function() {
    assert.doesNotThrow(() => {
      this.snake.heading = Compass.SOUTH;
    });

    assert.equal(Compass.SOUTH, this.snake.heading);
  });

  it("should throw an error when given an invalid value", function() {
    assert.throws(() => this.snake.heading = Compass.WEST, Error);
  });
});

describe("Snake.facing getter", function() {
  // we're gonna white-box this one a bit by updating snake._body
  beforeEach(function() {
    this.snake = new Snake();
  });

  it("should return Compass.EAST when snake is facing east", function() {
    assert.equal(Compass.EAST, this.snake.facing);
  });

  it("should return Compass.SOUTH when snake is facing south", function() {
    this.snake._body = [
      [0, 0], // tail
      [1, 0],
      [2, 0],
      [2, 1] // head; one south of previous
    ];
    assert.equal(Compass.SOUTH, this.snake.facing);
  });

  it("should return Compass.WEST when snake is facing west", function() {
    this.snake._body = [
      [0, 0], // tail
      [1, 0],
      [1, 1],
      [0, 1] // head; one west of previous
    ];
    assert.equal(Compass.WEST, this.snake.facing);
  });

  it("should return Compass.NORTH when snake is facing north", function() {
    this.snake._body = [
      [0, 0], // tail
      [0, 1],
      [1, 1],
      [1, 0] // head; one north of shoulders
    ];
    assert.equal(Compass.NORTH, this.snake.facing);
  });
});

describe("Snake.advanceHead", function() {
  describe("using the default heading", function() {
    it("should place the new head one square in the current heading", function() {
      const snake = new Snake();
      snake.advanceHead();
      assert.deepEqual([4, 0], snake.head);
    });
  });

  describe("using a new heading", function() {
    it("should place the new head one square in the current heading", function() {
      const snake = new Snake();
      snake.heading = Compass.SOUTH;
      snake.advanceHead();
      assert.deepEqual([3, 1], snake.head);
    });
  });
});

describe("Snake.move", function() {
  beforeEach(function() {
    this.snake = new Snake();
  });

  describe("using the default heading", function() {
    it("should place the new head one square in the current heading", function() {
      this.snake.move();
      assert.deepEqual([4, 0], this.snake.head);
    });

    it("should move the snake's tail", function() {
      this.snake.move();
      assert.deepEqual([1, 0], this.snake.body[0]);
    });
  });

  describe("using a new heading", function() {
    it("should place the new head one square in the current heading", function() {
      this.snake.heading = Compass.SOUTH;
      this.snake.move();
      assert.deepEqual([3, 1], this.snake.head);
    });

    it("should move the snake's tail", function() {
      this.snake.heading = Compass.SOUTH;
      this.snake.move();
      assert.deepEqual([1, 0], this.snake.body[0]);
    });
  });
});

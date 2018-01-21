const assert = require("assert");
const Game = require("../src/game");
const Snake = require("../src/snake");

describe("Game constructor", function() {
  describe("without arguments", function() {
    beforeEach(function() {
      this.game = new Game();
    });

    it("creates a game with the default number of columns and rows", function() {
      assert.equal(20, this.game.columns);
      assert.equal(20, this.game.rows);
    });

    it("creates a default snake", function() {
      assert.ok(this.game.snake);
    });
  });

  describe("with column and row arguments", function() {
    describe("when arguments are above the minimum size", function() {
      it("creates a game with the supplied number of columns and rows", function() {
        const game = new Game({columns: 10, rows: 10});
        assert.equal(10, game.columns);
        assert.equal(10, game.rows);
      });
    });

    describe("when arguments are below the minimum size", function() {
      it("throws an error", function() {
        assert.throws(() => {
          const game = new Game({columns: 4, rows: 10});
        });
      });
    });
  });
});

describe("Game.chooseBaitCoordinates", function() {
  it("chooses an open square in the grid", function() {
    const game = new Game();

    // despite the constructor check, nothing stops us from altering the game's
    // dimensions to something easy to test
    game.columns = 5;
    game.rows = 1;

    // now there is only one possible bait square
    assert.deepEqual([4, 0], game.chooseBaitCoordinates());
  });
});

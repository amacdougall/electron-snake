const assert = require("assert");
const Compass = require("../src/compass");

describe("Compass", function() {
  it("has static getters for direction constants", function() {
    assert.equal(Compass.NORTH, 1);
  });

  it("can access static getters as JS properties", function() {
    assert.equal(Compass["NORTH"], 1);
  });

  it("can report when compass values are valid", function() {
    assert.ok(Compass.isCompassDirection(Compass.NORTH));
  });

  it("can report when compass values are invalid", function() {
    assert.ok(!Compass.isCompassDirection("north"));
  });

  it("can get the inverse of its own directions", function() {
    assert.equal(Compass.inverse(Compass.NORTH), Compass.SOUTH);
  });
});

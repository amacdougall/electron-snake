/**
 * Helper functions for working with compass directions.
 */
class Compass {
  // all code should refer to compass directions by these constants; the only
  // class which is expected to know the numeric values of these constants is
  // this one.
  static get NORTH() { return 1; }
  static get EAST() { return 2; }
  static get SOUTH() { return -1; }
  static get WEST() { return -2; }

  static inverse(value) {
    if (Compass.isCompassDirection(value)) {
      return -value;
    } else {
      throw new Error(`Attempted Compass.inverse on invalid compass value
        ${value}. Use the Compass constants such as Compass.NORTH.`);
    }
  }

  static isCompassDirection(value) {
    return [Compass.NORTH, Compass.EAST, Compass.SOUTH, Compass.WEST].some(v => v === value);
  }
}

module.exports = Compass;

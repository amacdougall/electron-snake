/**
 * A <canvas> shim which assists in drawing basic shapes on a grid of squares.
 */
class Blockboard {
  constructor(canvas, {blockSize, columns, rows}) {
    this.canvas = canvas;
    this.context = canvas.getContext("2d"); // CanvasRenderingContext2D

    this.blockSize = blockSize;
    this.columns = columns;
    this.rows = rows;

    this.canvas.width = blockSize * columns;
    this.canvas.height = blockSize * rows;
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draws a square at the supplied grid coordinates. Note that if neither
   * fillStyle nor strokeStyle options are provided, nothing will be drawn.
   *
   * @param {Number} x - The column at which to draw the square.
   * @param {Number} y - The row at which to draw the square.
   * @param {Object} options - An options hash.
   * @param {String} [options.fillStyle] - The fill color for the square. If
   * omitted, the square will not be filled.
   * @param {String} [options.strokeStyle] - The stroke color for the square.
   * If omitted, the square will have no stroke.
   * @param {Number} [options.lineWidth] - The line width for the stroke.
   * Default 1.
   */
  addSquare(x, y, {fillStyle, strokeStyle, lineWidth = 1}) {
    if (fillStyle) {
      this.context.fillStyle = fillStyle;
      this.context.fillRect(
        this.blockSize * x,
        this.blockSize * y,
        this.blockSize,
        this.blockSize
      );
    }

    if (strokeStyle) {
      this.context.strokeStyle = strokeStyle;
      this.context.lineWidth = lineWidth;
      this.context.strokeRect(
        this.blockSize * x,
        this.blockSize * y,
        this.blockSize,
        this.blockSize
      );
    }
  }

  /**
   * Like addSquare, but adds squares at every location in the supplied array.
   *
   * @param {Array} coordinates - An array of [x, y] pairs.
   * @param {Object} options - An options hash which is passed through to addSquare.
   */
  addSquares(coordinates, options) {
    coordinates.forEach(([x, y]) => this.addSquare(x, y, options));
  }

  /**
   * Draws a circle at the supplied grid coordinates. Note that if neither
   * fillStyle nor strokeStyle options are provided, nothing will be drawn.
   *
   * @param {Number} x - The column at which to draw the circle.
   * @param {Number} y - The row at which to draw the circle.
   * @param {Object} options - An options hash.
   * @param {String} [options.fillStyle] - The fill color for the circle. If
   * omitted, the circle will not be filled.
   * @param {String} [options.strokeStyle] - The stroke color for the circle.
   * If omitted, the circle will have no stroke.
   * @param {Number} [options.lineWidth] - The line width for the stroke.
   * Default 1.
   */
  addCircle(x, y, {fillStyle, strokeStyle, lineWidth = 1}) {
    if (!(fillStyle || strokeStyle)) {
      return;
    }

    let radius = Math.round(this.blockSize / 2);

    if (strokeStyle) {
      // keep stroke within grid block
      radius -= Math.ceil(lineWidth / 2);
    }
      
    this.context.beginPath();
    this.context.arc(
      this.blockSize * x + Math.round(this.blockSize / 2), // x center
      this.blockSize * y + Math.round(this.blockSize / 2), // y center
      radius,
      0, // start angle
      Math.PI * 2 // end angle, in radians
    );

    if (fillStyle) {
      this.context.fillStyle = fillStyle;
      this.context.fill();
    }

    if (strokeStyle) {
      this.context.strokeStyle = strokeStyle;
      this.context.lineWidth = lineWidth;
      this.context.stroke();
    }

    this.context.closePath();
  }

  /**
   * Like addCircle, but adds circles at every location in the supplied array.
   *
   * @param {Array} coordinates - An array of [x, y] pairs.
   * @param {Object} options - An options hash which is passed through to addCircle.
   */
  addCircles(coordinates, options) {
    coordinates.forEach(([x, y]) => this.addCircle(x, y, options));
  }
}

module.exports = Blockboard;

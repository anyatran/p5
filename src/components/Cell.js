export default class Cell {
  constructor(p, color, size, x, y) {
    this.p = p
    this.color = color
    this.size = size
    this.x = x
    this.y = y
  }

  setShape(shape) {
    this.shape = shape
  }

  drawBG() {
    this.p.fill(this.color)
    this.p.rect(this.x*this.size, this.y*this.size, this.size, this.size)
  }

  drawShape() {
    if (this.shape) {
      this.shape.draw()
    }
  }
}

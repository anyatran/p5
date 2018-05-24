export default class Cell {
  constructor(p, color, size, x, y, darkMode) {
    this.p = p
    this.color = color
    this.size = size
    this.x = x
    this.y = y
    this.darkMode = darkMode
    // this.m = 1
  }

  setShape(shape) {
    this.shape = shape
  }

  setDarkMode(darkMode) {
    this.darkMode = darkMode
  }

  drawBG() {
    if (this.darkMode) {
      this.p.fill('#000000')
    } else {
      this.p.fill(this.color)
    }
    this.p.rect(this.x*this.size, this.y*this.size, this.size, this.size)
    // this.p.translate(this.m, 0)
    // this.m+=0.01
  }

  drawShape() {
    if (this.shape) {
      this.shape.draw()
    }
  }

  /**
  * move down y axis
  */
  fallDown() {
    this.setDarkMode(true)
    this.setShape(null)
    // if (this.shape) {
    //   this.shape.fallDown()
    // }
  }
}

import { randomInt } from '../../helpers.js'

export default class Cell {
  constructor(p, color, size, x, y, darkMode) {
    this.p = p
    this.color = color
    this.size = size
    this.x = x
    this.y = y
    this.darkMode = darkMode
    this.opacity = 1
    // this.m = 1
  }

  setShape(shape) {
    this.shape = shape
  }

  setDarkMode(darkMode) {
    console.log(darkMode)
    this.darkMode = darkMode
    this.opacity = darkMode ? 0 : 1
  }

  toggleDarkMode() {
    this.setDarkMode(!this.darkMode)
  }

  drawBG() {
    const s = this.p.saturation(this.color)
    const bgColors = [s, this.color]
    // this.p.fill(bgColors[randomInt(bgColors.length)])
    const c = this.p.color(this.color)
    c._array[3] = this.opacity
    this.p.fill(c)
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
  * fade out when transition
  */
  fadeOut() {
    this.setDarkMode(true)
    this.setShape(null)
  }
}

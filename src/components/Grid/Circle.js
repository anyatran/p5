import CONST from '../../constants.js'
import Shape from './Shape.js'
import { randomInt } from '../../helpers.js'

export default class Circle extends Shape {
  constructor(p, size, color, animate, x, y) {
    super(p, size, color, animate, x, y)
    this.size = randomInt(size / 3, size) // pick a random init size
  }

  draw() {
    const offset = CONST.CELL_SIZE / 2
    this.p.fill(this.color)
    this.p.ellipse(this.x*CONST.CELL_SIZE + offset, this.y*CONST.CELL_SIZE + offset, this.size)

    if (this.animate) {
      this.move()
      this.changeSize()
    }
  }
}

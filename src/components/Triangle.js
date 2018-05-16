import CONST from '../constants.js'
import Shape from './Shape.js'
import { randomInt } from '../helpers.js'

/**
* Animation ideas:
* - get bigger/smaller in size
* - rotate
* - become a square
* - move to another cell: translate()?
*/

export default class Triangle extends Shape {
  constructor(p, size, color, animate, x, y) {
    super(p, size, color, animate, x, y)

    this.init_()
  }

  init_() {
    this.direction_ = CONST.TWO_DIRECTIONS[randomInt(CONST.TWO_DIRECTIONS.length)]
  }

  draw() {
    this.p.fill(this.color)
    switch (this.direction_) {
      case 'right':
        this.p.triangle(this.x*this.size, this.y*this.size + this.size, this.x*this.size + this.size, this.y*this.size + this.size, this.x*this.size + this.size, this.y*this.size) //triangle(x1,y1,x2,y2,x3,y3)
        break;

      case 'left':
        this.p.triangle(this.x*this.size, this.y*this.size, this.x*this.size, this.y*this.size + this.size, this.x*this.size + this.size, this.y*this.size + this.size) //triangle(x1,y1,x2,y2,x3,y3)
        break;
      default:
        break;
    }

    if (this.animate) {
      this.moveX()
    }
  }
}

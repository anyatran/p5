import CONST from '../constants.js'
import Shape from './Shape.js'
import { randomInt } from '../helpers.js'

/**
* Animation ideas:
* - get bigger/smaller in size
* - rotate
* - become a full/quarter circle
* - become a square
*/
export default class HalfCircle extends Shape {
  constructor(p, size, color, animate, x, y) {
    super(p, size, color, animate, x, y)

    this.init_()
  }

  init_() {
    this.direction_ = CONST.FOUR_DIRECTIONS[randomInt(CONST.FOUR_DIRECTIONS.length)]
    switch (this.direction_) {
      case 'top':
        this.arcStart_ = -this.p.PI
        this.arcEnd_ = this.p.PI
        break;
      case 'bottom':
        this.arcStart_ = 0
        this.arcEnd_ = this.p.PI
        break;
      case 'left':
        this.arcStart_ = this.p.HALF_PI
        this.arcEnd_ = -this.p.HALF_PI
        break;
      case 'right':
        this.arcStart_ = -this.p.HALF_PI
        this.arcEnd_ = this.p.HALF_PI
        break;
      default:
        break;
    }
  }

  draw() {
    const offset = this.size / 2
    this.p.fill(this.color)
    this.p.arc(this.x*this.size + offset, this.y*this.size + offset, this.size, this.size, this.arcStart_, this.arcEnd_)

    if (this.animate) {
      this.moveX()
    }
  }
}

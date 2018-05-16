import CONST from '../constants.js'
import { randomInt } from '../helpers.js'

/**
* Animation ideas:
* - get bigger/smaller in size
* - rotate
* - become a square
* - move to another cell: translate()?
*/

export default class Triangle {
  constructor(p, size, color, animate, x, y) {
    this.p = p
    this.size = size
    this.color = color
    this.animate = animate
    this.x = x
    this.y = y


    this.init()
  }

  init() {
    this.time_ = 0.
    this.dest_ = randomInt(30)
    this.speed_ = 0.005
    this.done_ = false
    this.isExpanding_ = true
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
      this.animateShape()
    }
  }

  animateShape() {
    // easing constant
    const e = new p5.Ease()
    const q = e.linear(this.time_, this.p) // play around with diff easings

    if (!this.done_) {
      this.x = this.p.map(q, 0., 1., this.x, this.dest_)
      this.time_+=this.speed_
      if (this.x == this.dest_) {
        this.done_ = true
        this.time_ = 0.
        this.lastFrame = this.p.frameCount
      }
    } else {
      if ((this.lastFrame - this.p.frameCount) % 3 == 0) {
        this.dest_ = randomInt(30)
        this.done_ = false
      }
    }
  }
}

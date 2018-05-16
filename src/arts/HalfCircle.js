import CONST from '../constants.js'

/**
* Animation ideas:
* - get bigger/smaller in size
* - rotate
* - become a full/quarter circle
* - become a square
*/
export default class HalfCircle {
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
    this.speed_ = 0.02
    this.isExpanding_ = true
    this.direction_ = CONST.FOUR_DIRECTIONS[this.p.floor(this.p.random(CONST.FOUR_DIRECTIONS.length))]
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
    const offset = CONST.CELL_SIZE / 2
    this.p.fill(this.color)
    this.p.arc(this.x*CONST.CELL_SIZE + offset, this.y*CONST.CELL_SIZE + offset, CONST.CELL_SIZE, CONST.CELL_SIZE, this.arcStart_, this.arcEnd_)

    // easing constant
    // const e = new p5.Ease()
    // const q = e.bounceInOut(this.time_, this.p) // play around with diff easings
    //
    // if (this.animate) {
    //   if (this.time_ < 1.) {
    //     if (this.isExpanding_) {
    //       this.size = this.p.map(q, 0., 10., this.size, 100)
    //     } else {
    //       this.size = this.p.map(q, 0., 10., this.size, 10)
    //     }
    //     this.time_+=this.speed_
    //   } else {
    //     this.time_ = 0. // reset time
    //     this.isExpanding_ = !this.isExpanding_
    //   }
    // }
  }
}

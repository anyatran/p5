import CONST from '../constants.js'
import { randomInt } from '../helpers.js'

export default class Shape {
  constructor(p, size, color, animate, x, y) {
    this.p = p
    this.size = size
    this.color = color
    this.animate = animate
    this.x = x
    this.y = y

    this.easing_ = new p5.Ease()
    this.moveTimer_ = 0.
    this.sizeTimer_ = 0.
    this.dest_ = randomInt(30)
    this.speed_ = 0.005
    this.reachedDest_ = false
    this.isExpanding_ = true
  }

  moveX() {
    // easing constant
    const q = this.easing_.linear(this.moveTimer_, this.p) // play around with diff easings

    if (!this.reachedDest_) {
      this.x = this.p.map(q, 0., 1., this.x, this.dest_)
      this.moveTimer_+=this.speed_
      if (this.x == this.dest_) {
        this.reachedDest_ = true
        this.moveTimer_ = 0.
        this.lastFrame = this.p.frameCount
      }
    } else {
      if ((this.lastFrame - this.p.frameCount) % 3 == 0) {
        this.dest_ = randomInt(30)
        this.reachedDest_ = false
      }
    }
  }

  changeSize() {
    // easing constant
    const q = this.easing_.bounceInOut(this.sizeTimer_, this.p) // play around with diff easings
    if (this.sizeTimer_ < 1.) {
      if (this.isExpanding_) {
        this.size = this.p.map(q, 0., 10., this.size, 100)
      } else {
        this.size = this.p.map(q, 0., 10., this.size, 10)
      }
      this.sizeTimer_+=this.speed_
    } else {
      this.sizeTimer_ = 0. // reset time
      this.isExpanding_ = !this.isExpanding_
    }
  }
}

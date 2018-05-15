import CONST from '../constants.js'

export default class Circle {
  constructor(p, size, color, animate) {
    this.p = p
    this.size = this.p.floor(this.p.random(size)) // pick a random init size
    this.color = color
    this.animate = animate

    this.time_ = 0.
    this.speed_ = 0.02
    this.isExpanding_ = true
  }

  draw(x, y) {
    const offset = CONST.CELL_SIZE / 2
    this.p.fill(this.color)
    this.p.ellipse(x*CONST.CELL_SIZE + offset, y*CONST.CELL_SIZE + offset, this.size)

    if(this.animate) {
      this.animateShape()
    }
  }

  animateShape() {
    // easing constant
    const e = new p5.Ease()
    const q = e.bounceInOut(this.time_, this.p) // play around with diff easings
    if(this.time_ < 1.) {
      if(this.isExpanding_) {
        this.size = this.p.map(q, 0., 10., this.size, 100)
      } else {
        this.size = this.p.map(q, 0., 10., this.size, 10)
      }
      this.time_+=this.speed_
    } else {
      this.time_ = 0. // reset time
      this.isExpanding_ = !this.isExpanding_
    }
  }
}

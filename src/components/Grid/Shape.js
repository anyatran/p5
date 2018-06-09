import CONST from '../../constants.js'
import { countColumns, countRows, randomInt } from '../../helpers.js'

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
    this.destX_ = randomInt(countColumns(p.width, CONST.CELL_SIZE))
    this.destY_ = randomInt(countRows(p.height, CONST.CELL_SIZE))
    this.speed_ = 0.005
    this.reachedDest_ = false
    this.isExpanding_ = true
    this.minSize_ = randomInt(CONST.CELL_SIZE * 0.5)
    this.maxSize_ = randomInt(this.minSize_, CONST.CELL_SIZE * 2)
    this.isMoveX_ = CONST.BOOLEANS[randomInt(CONST.BOOLEANS.length)]
    this.lastFrame_ = this.p.frameCount
  }

  /**
  * move along x axis
  */
  moveX() {
    // easing constant
    const q = this.easing_.linear(this.moveTimer_, this.p) // play around with diff easings

    if (!this.reachedDest_) {
      this.x = this.p.map(q, 0., 1., this.x, this.destX_)
      this.moveTimer_+=this.speed_
      if (this.x == this.destX_) {
        this.reachedDest_ = true
        this.moveTimer_ = 0.
        // this.lastFrame_ = this.p.frameCount
      }
    }
  }

  /**
  * move along y axis
  */
  moveY() {
    // easing constant
    const q = this.easing_.linear(this.moveTimer_, this.p) // play around with diff easings

    if (!this.reachedDest_) {
      this.y = this.p.map(q, 0., 1., this.y, this.destY_)
      this.moveTimer_+=this.speed_
      if (this.y == this.destY_) {
        this.reachedDest_ = true
        this.moveTimer_ = 0.
        // console.log(this.lastFrame_, this.p.frameCount)
        // this.lastFrame_ = this.p.frameCount
      }
    }
  }

  move() {
    if (this.isMoveX_) {
      this.moveX()
    } else {
      this.moveY()
    }

    if (this.reachedDest_) {
      this.isMoveX_ = CONST.BOOLEANS[randomInt(CONST.BOOLEANS.length)]
      if ((this.lastFrame_ - this.p.frameCount) % 20 == 0) {
        if (this.isMoveX_) {
          this.destX_ = randomInt(countColumns(this.p.width, CONST.CELL_SIZE))
        } else {
          this.destY_ = randomInt(countRows(this.p.height, CONST.CELL_SIZE))
        }
        this.lastFrame_ = this.p.frameCount
        this.reachedDest_ = false
      }
    }
  }

  changeSize() {
    const q = this.easing_.elasticOut(this.sizeTimer_, this.p) // play around with diff easings
    if (this.size >= this.minSize_) {
      if (this.size >= this.maxSize_) {
        this.isExpanding_ = false
        this.sizeTimer_ = 0.
      }
    } else {
      this.isExpanding_ = true
      this.sizeTimer_ = 0.
    }

    if (this.isExpanding_) {
      this.size+=q
    } else {
      this.size-=q
    }

    this.sizeTimer_+=this.speed_
  }
}

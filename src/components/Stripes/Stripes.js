import Stroke from './Stroke.js'
import CONST from '../../constants.js'
import { countRows, randomInt } from '../../helpers.js'

export default class Stripes {
  constructor(p, size, board, darkMode) {
    this.angle = 0
    this.p = p
    this.size = size
    this.board = board
    this.darkMode = darkMode

    this.strokes_ = []
    this.swirl_ = false
  }

  init() {
    const strokeCount = randomInt(10, 20)
    const rows = countRows(this.p.height, CONST.CELL_SIZE)
    let strokeEndY = this.p.floor(rows*0.2)
    this.strokes_ = new Array(strokeCount)
    for (let i = 0; i < this.strokes_.length; i++) {
      setTimeout(() => {
        const color = CONST.COLORS[randomInt(CONST.COLORS.length)]
        const size = CONST.CELL_SIZE * randomInt(1, 3)
        this.strokes_[i] = new Stroke(this.p, color, size, strokeEndY)
        strokeEndY-=(size/CONST.CELL_SIZE)
      }, 300*i)

    }
    this.sound.play()
  }

  draw() {
    const step = this.p.frameCount % 200
    const angle = this.p.map(step, 0, 200, 0, this.p.TWO_PI)
    const cosA = this.p.cos(angle)
    const sinA = this.p.sin(angle)
    if (this.swirl_) {
      this.p.applyMatrix(cosA, sinA, -sinA, cosA, this.p.width / 2, this.p.height / 2)
    } else {
      this.p.resetMatrix()
    }
    // this.p.applyMatrix(cosA, sinA, -sinA, cosA, 0, 0)
    // this.p.rotate(this.angle)
    this.strokes_.map(stroke => {
      stroke.draw()
    })
  }

  fadeOut() {
    this.strokes_.map(stroke => {
      stroke.fadeOut()
    })
  }

  freeze() {
    this.strokes_.map(stroke => stroke.freeze())
  }

  onTouch(electrodeNumber) {
    console.log('strikes', electrodeNumber)
    switch (electrodeNumber) {
      case 1:
        // this.angle = this.p.HALF_PI
        this.swirl_ = !this.swirl_
        break;
      case 2:
        this.freeze()
        break;
      default:
        this.angle = 0
        break;
    }
  }

  isDiagonal() {
    return true
  }

  setSound(sound) {
    this.sound = sound
  }
}

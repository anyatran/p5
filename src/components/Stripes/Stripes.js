import Stroke from './Stroke.js'
import CONST from '../../constants.js'
import { countRows, randomInt } from '../../helpers.js'

export default class Stripes {
  constructor(p, size, board, darkMode) {
    this.p = p
    this.size = size
    this.board = board
    this.darkMode = darkMode

    this.strokes_ = []
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
  }

  draw() {
    this.strokes_.map(stroke => {
      stroke.draw()
    })
  }

  fadeOut() {
    this.strokes_.map(stroke => {
      stroke.fadeOut()
    })
  }
}

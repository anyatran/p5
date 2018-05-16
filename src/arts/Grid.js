import CONST from '../constants.js'
import { randomInt } from '../helpers.js'

/**
* Animation ideas:
* - expand cell size
* - swap cells
*/

export default class Grid {
  constructor(p, size, board, dark) {
    this.p = p
    this.size = size
    this.board = board
    this.dark = dark
  }

  initGrid() {
    this.board.map((column, i) => {
      for (let j = 0; j < column.length; j++) {
        // initializing a cell
        this.board[i][j] = {}
        const cell = this.board[i][j]
        if (this.dark) {
          cell.cellColor = '#000000'
        } else {
          cell.cellColor = CONST.COLORS[randomInt(CONST.COLORS.length)]
        }
        // picking a random shape
        setTimeout(() => {
          const Shape = CONST.SHAPE_TYPES[randomInt(CONST.SHAPE_TYPES.length)]
          if (Shape) {
            const innerShapeColor = CONST.COLORS[randomInt(CONST.COLORS.length)]
            cell.shape = new Shape(this.p, this.size, innerShapeColor, CONST.BOOLEANS[randomInt(CONST.BOOLEANS.length)], i, j)
          }
        }, randomInt(300))
      // }, 25*i + 25*j)
      }
    })
  }

  drawGrid() {
    // draw the cell first
    this.board.map((column, i) => {
      column.map((cell, j) => {
        this.p.fill(cell.cellColor)
        this.p.rect(i*this.size, j*this.size, this.size, this.size)
      })
    })

    this.board.map((column, i) => {
      column.map((cell, j) => {
        if (cell.shape) {
          cell.shape.draw()
        }
      })
    })
  }
}

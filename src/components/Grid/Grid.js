import Cell from './Cell.js'
import CONST from '../../constants.js'
import { randomInt } from '../../helpers.js'

/**
* Animation ideas:
* - expand cell size
* - swap cells
*/

export default class Grid {
  constructor(p, size, board, darkMode) {
    this.p = p
    this.size = size
    this.board = board
    this.darkMode = darkMode
  }

  init() {
    this.board.map((column, x) => {
      for (let y = 0; y < column.length; y++) {
        setTimeout(() => {
          const cellColor = CONST.COLORS[randomInt(CONST.COLORS.length)]
          this.board[x][y] = new Cell(this.p, cellColor, CONST.CELL_SIZE, x, y, this.darkMode)
          // picking a random shape
          const Shape = CONST.SHAPE_TYPES[randomInt(CONST.SHAPE_TYPES.length)]
          if (Shape) {
            const innerShapeColor = CONST.COLORS[randomInt(CONST.COLORS.length)]
            this.board[x][y].setShape(new Shape(this.p, this.size, innerShapeColor, CONST.BOOLEANS[randomInt(CONST.BOOLEANS.length)], x, y))
          }
        // }, randomInt(500))
        }, 25*x + 25*y)
      }
    })
  }

  draw() {
    // draw the cell first
    this.board.map(column => {
      column.map(cell => {
        cell.drawBG()
      })
    })

    this.board.map(column => {
      column.map(cell => {
        cell.drawShape()
      })
    })
  }

  changeDarkMode(isDarkMode) {
    this.darkMode = isDarkMode
    this.board.map((column, x) => {
      column.map((cell, y) => {
        setTimeout(() => {
          cell.setDarkMode(this.darkMode)
        // }, 25*x + 25*y) // diagonal
        }, randomInt(500)) // random
        // }, 25 * x) // horizontal
      })
    })
  }

  fadeOut() {
    this.board.map((column, x) => {
      column.map((cell, y) => {
        if (!this.darkMode) {
          this.darkMode = true
          setTimeout(() => {
            cell.setDarkMode(this.darkMode)
          }, randomInt(500)) // random
        }

        setTimeout(() => {
          cell.fadeOut()
        }, randomInt(500, 1500)) // random
      })
    })


  }
}

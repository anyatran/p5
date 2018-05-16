import CONST from '../constants.js'

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
          cell.cellColor = CONST.COLORS[this.p.floor(this.p.random(CONST.COLORS.length))]
        }
        // picking a random shape
        setTimeout(() => {
          const Shape = CONST.SHAPE_TYPES[this.p.floor(this.p.random(CONST.SHAPE_TYPES.length))]
          if (Shape) {
            const innerShapeColor = CONST.COLORS[this.p.floor(this.p.random(CONST.COLORS.length))]
            cell.shape = new Shape(this.p, this.size, innerShapeColor, CONST.BOOLEANS[this.p.floor(this.p.random(CONST.BOOLEANS.length))], i, j)
          }
        }, this.p.floor(this.p.random(300)))
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

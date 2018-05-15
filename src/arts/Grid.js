import CONST from '../constants.js'

export default class Grid {
  constructor(p, size, board) {
    this.p = p
    this.size = size
    this.board = board
  }

  initGrid() {
    this.board.map((column, i) => {
      for (let j = 0; j < column.length; j++) {
        // initializing a cell
        this.board[i][j] = {}
        const cell = this.board[i][j]
        cell.cellColor = CONST.COLORS[this.p.floor(this.p.random(CONST.COLORS.length))]
        setTimeout(() => {
          // picking a random shape
          const Shape = CONST.SHAPE_TYPES[this.p.floor(this.p.random(CONST.SHAPE_TYPES.length))]
          if(Shape) {
            const innerShapeColor = CONST.COLORS[this.p.floor(this.p.random(CONST.COLORS.length))]
            cell.shape = new Shape(this.p, this.size, innerShapeColor, CONST.BOOLEANS[this.p.floor(this.p.random(CONST.BOOLEANS.length))])
          }
        }, this.p.floor(this.p.random(300)))
      // }, 25*i + 25*j)
      }
    })
  }

  drawGrid() {
    this.board.map((column, i) => {
      column.map((cell, j) => {
        this.p.fill(cell.cellColor)
        this.p.rect(i*this.size, j*this.size, this.size, this.size)
        if(cell.shape) {
          cell.shape.draw(i, j)
        }
      })
    })
  }
}

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
        this.board[i][j] = {}
        const cell = this.board[i][j]
        cell.cellColor = CONST.COLORS[this.p.floor(this.p.random(CONST.COLORS.length))]
        setTimeout(() => {
          cell.innerShape = CONST.SHAPE_TYPES[this.p.floor(this.p.random(CONST.SHAPE_TYPES.length))]

          if (cell.innerShape !== 'full') {
            cell.innerShapeColor = CONST.COLORS[this.p.floor(this.p.random(CONST.COLORS.length))]
          }

          if (cell.innerShape === 'circleFull') {
            cell.circleSize = this.p.floor(this.p.random(this.size))
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
        const offset = this.size / 2
        switch (cell.innerShape) {
          case 'full':
            break;
          case 'circleFull':
            this.p.fill(cell.innerShapeColor)
            // console.log(cell.circleSize)
            if (cell.circleSize < this.size) {
              cell.circleSize++
            } else {
              cell.circleSize--
            }
            this.p.ellipse(i*this.size + offset, j*this.size + offset, cell.circleSize)

            break;
          case 'circleRight':
            this.p.fill(cell.innerShapeColor)
            this.p.arc(i*this.size + offset, j*this.size + offset, this.size, this.size, -this.p.HALF_PI, this.p.HALF_PI)
            break;
          case 'circleLeft':
            this.p.fill(cell.innerShapeColor)
            this.p.arc(i*this.size + offset, j*this.size + offset, this.size, this.size, this.p.HALF_PI, -this.p.HALF_PI)
            break;
          case 'circleTop':
            this.p.fill(cell.innerShapeColor)
            this.p.arc(i*this.size + offset, j*this.size + offset, this.size, this.size, -this.p.PI, this.p.PI)
            break;
          case 'circleBottom':
            this.p.fill(cell.innerShapeColor)
            this.p.arc(i*this.size + offset, j*this.size + offset, this.size, this.size, this.p.PI, -this.p.PI)
            break;
          case 'halfLeft':
            this.p.fill(cell.innerShapeColor)
            this.p.triangle(i*this.size, j*this.size, i*this.size, j*this.size + this.size, i*this.size + this.size, j*this.size + this.size) //triangle(x1,y1,x2,y2,x3,y3)
            break;
          case 'halfRight':
            this.p.fill(cell.innerShapeColor)
            this.p.triangle(i*this.size, j*this.size + this.size, i*this.size + this.size, j*this.size + this.size, i*this.size + this.size, j*this.size) //triangle(x1,y1,x2,y2,x3,y3)
            break;
          default:
            break
        }
      })
    })
  }
}

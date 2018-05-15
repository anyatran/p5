import CONST from '../constants.js'
import Circle from './Circle.js'
import CircleRight from './CircleRight.js'
import CircleLeft from './CircleLeft.js'
import CircleTop from './CircleTop.js'
import CircleBottom from './CircleBottom.js'
import LeftTriangle from './LeftTriangle.js'
import RightTriangle from './RightTriangle.js'
import Easing from '../utils/easing.js'

export default class Grid {
  constructor(p, size, board) {
    this.p = p
    this.size = size
    this.board = board
    this.isExpanding = true
    this.time = 0.
    this.speed = 0.02
  }

  initGrid() {
    this.board.map((column, i) => {
      for (let j = 0; j < column.length; j++) {
        this.board[i][j] = {}
        const cell = this.board[i][j]
        cell.cellColor = CONST.COLORS[this.p.floor(this.p.random(CONST.COLORS.length))]
        setTimeout(() => {
          cell.innerShape = CONST.SHAPE_TYPES[this.p.floor(this.p.random(CONST.SHAPE_TYPES.length))]

          // TODO: create a class for each type of shape
          if (cell.innerShape !== 'full') {
            cell.innerShapeColor = CONST.COLORS[this.p.floor(this.p.random(CONST.COLORS.length))]
          }

          if (cell.innerShape === 'circleFull') {
            cell.circleSize = this.p.floor(this.p.random(this.size))
            cell.shape = new Circle(this.p, cell.circleSize, cell.innerShapeColor, CONST.BOOLEANS[this.p.floor(this.p.random(CONST.BOOLEANS.length))])
          } else if(cell.innerShape === 'halfLeft') {
            cell.circleSize = this.p.floor(this.p.random(this.size))
            cell.shape = new LeftTriangle(this.p, this.size, cell.innerShapeColor, CONST.BOOLEANS[this.p.floor(this.p.random(CONST.BOOLEANS.length))])
          } else if(cell.innerShape === 'halfRight') {
            cell.circleSize = this.p.floor(this.p.random(this.size))
            cell.shape = new RightTriangle(this.p, this.size, cell.innerShapeColor, CONST.BOOLEANS[this.p.floor(this.p.random(CONST.BOOLEANS.length))])
          } else if(cell.innerShape === 'circleRight') {
            cell.circleSize = this.p.floor(this.p.random(this.size))
            cell.shape = new CircleRight(this.p, this.size, cell.innerShapeColor, CONST.BOOLEANS[this.p.floor(this.p.random(CONST.BOOLEANS.length))])
          } else if(cell.innerShape === 'circleLeft') {
            cell.circleSize = this.p.floor(this.p.random(this.size))
            cell.shape = new CircleLeft(this.p, this.size, cell.innerShapeColor, CONST.BOOLEANS[this.p.floor(this.p.random(CONST.BOOLEANS.length))])
          } else if(cell.innerShape === 'circleTop') {
            cell.circleSize = this.p.floor(this.p.random(this.size))
            cell.shape = new CircleTop(this.p, this.size, cell.innerShapeColor, CONST.BOOLEANS[this.p.floor(this.p.random(CONST.BOOLEANS.length))])
          } else if(cell.innerShape === 'circleBottom') {
            cell.circleSize = this.p.floor(this.p.random(this.size))
            cell.shape = new CircleBottom(this.p, this.size, cell.innerShapeColor, CONST.BOOLEANS[this.p.floor(this.p.random(CONST.BOOLEANS.length))])
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

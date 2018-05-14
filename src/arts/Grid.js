const colors = ['#FFFFFF', '#FF4047', '#FFE66E', '#23E8A7', '#2C72F1', '#96D7FE', '#CD4AF4', '#FFDAE2']
const shapeType = ['circleFull', 'circleTop', 'circleBottom', 'circleLeft', 'circleRight', 'full', 'halfLeft', 'halfRight']

export default class Grid {
  contructor(size, board) {
    this.size = size
    this.board = board
  }

  initGrid() {
    this.board.map((column, i) => {
      column.map((cell, j) => {
        cell.cellColor = colors[floor(random(colors.length))]
        setTimeout(() => {
          cell.innerShape = shapeType[floor(random(shapeType.length))]

          if (cell.innerShape !== 'full') {
            cell.innerShapeColor = colors[floor(random(colors.length))]
          }

          if (cell.innerShape === 'circleFull') {
            cell.circleSize = floor(random(this.size))
          }
        // }, floor(random(300)))
        }, 25*i + 25*j)
      })
    })
    console.log(this.board)
  }

  drawGrid() {
    this.board.map((column, i) => {
      column.map((cell, j) => {

        fill(cell.cellColor)
        rect(i*this.size, j*this.size, this.size, this.size)
        const offset = this.size / 2
        switch (cell.innerShape) {
          case 'full':
            break;
          case 'circleFull':
            fill(cell.innerShapeColor)
            // console.log(cell.circleSize)
            if (cell.circleSize < this.size) {
              cell.circleSize++
            } else {
              cell.circleSize--
            }
            ellipse(i*this.size + offset, j*this.size + offset, cell.circleSize)

            break;
          case 'circleRight':
            fill(cell.innerShapeColor)
            arc(i*this.size + offset, j*this.size + offset, this.size, this.size, -HALF_PI, HALF_PI)
            break;
          case 'circleLeft':
            fill(cell.innerShapeColor)
            arc(i*this.size + offset, j*this.size + offset, this.size, this.size, HALF_PI, -HALF_PI)
            break;
          case 'circleTop':
            fill(cell.innerShapeColor)
            arc(i*this.size + offset, j*this.size + offset, this.size, this.size, -PI, PI)
            break;
          case 'circleBottom':
            fill(cell.innerShapeColor)
            arc(i*this.size + offset, j*this.size + offset, this.size, this.size, PI, -PI)
            break;
          case 'halfLeft':
            fill(cell.innerShapeColor)
            triangle(i*this.size, j*this.size, i*this.size, j*this.size + this.size, i*this.size + this.size, j*this.size + this.size) //triangle(x1,y1,x2,y2,x3,y3)
            break;
          case 'halfRight':
            fill(cell.innerShapeColor)
            triangle(i*this.size, j*this.size + this.size, i*this.size + this.size, j*this.size + this.size, i*this.size + this.size, j*this.size) //triangle(x1,y1,x2,y2,x3,y3)
            break;
          default:
            break
        }
      })
    })
  }
}

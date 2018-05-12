const cellSize = 50
let columns
let rows
let board
const colors = ['#FFFFFF', '#FF4047', '#FFE66E', '#23E8A7', '#2C72F1', '#96D7FE', '#CD4AF4', '#FFDAE2']
const shapeType = ['circleSmall', 'circleLarge', 'circleTop', 'circleBottom', 'circleLeft', 'circleRight', 'full', 'halfLeft', 'halfRight']

function setup() {
  createCanvas(600, 600)
  // Calculate columns and rows
  columns = floor(width/cellSize)
  rows = floor(height/cellSize)
  // Wacky way to make a 2D array is JS
  board = new Array(columns)
  for (let i = 0; i < columns; i++) {
    board[i] = new Array(rows)
  }
  init()
}

function draw() {
  background(255)
  noStroke()
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      const cell = board[i][j]

      fill(cell.cellColor)
      rect(i*cellSize, j*cellSize, cellSize, cellSize)
      const offset = cellSize / 2
      switch (cell.innerShape) {
        case 'full':
          break;
        case 'circleLarge':
          fill(cell.innerShapeColor)
          ellipse(i*cellSize + offset, j*cellSize - offset, cellSize)
          break;
        case 'circleSmall':
          fill(cell.innerShapeColor)
          ellipse(i*cellSize + offset, j*cellSize + offset, cellSize / 2)
          break;
        case 'circleRight':
          fill(cell.innerShapeColor)
          arc(i*cellSize + offset, j*cellSize + offset, cellSize, cellSize, -HALF_PI, HALF_PI)
          break;
        case 'circleLeft':
          fill(cell.innerShapeColor)
          arc(i*cellSize + offset, j*cellSize + offset, cellSize, cellSize, HALF_PI, -HALF_PI)
          break;
        case 'circleTop':
          fill(cell.innerShapeColor)
          arc(i*cellSize + offset, j*cellSize + offset, cellSize, cellSize, -PI, PI)
          break;
        case 'circleBottom':
          fill(cell.innerShapeColor)
          arc(i*cellSize + offset, j*cellSize + offset, cellSize, cellSize, PI, -PI)
          break;
        case 'halfLeft':
          fill(cell.innerShapeColor)
          triangle(i*cellSize, j*cellSize, i*cellSize, j*cellSize + cellSize, i*cellSize + cellSize, j*cellSize + cellSize) //triangle(x1,y1,x2,y2,x3,y3)
          break;
        case 'halfRight':
          fill(cell.innerShapeColor)
          triangle(i*cellSize, j*cellSize + cellSize, i*cellSize + cellSize, j*cellSize + cellSize, i*cellSize + cellSize, j*cellSize) //triangle(x1,y1,x2,y2,x3,y3)
          break;
        default:
          break
      }
    }
  }

}

// reset board when mouse is pressed
function mousePressed() {
  init()
}

// Fill board randomly
function init() {
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      board[i][j] = {}
      const cell = board[i][j]
      cell.cellColor = colors[floor(random(colors.length))]
      setTimeout(() => {
        cell.innerShape = shapeType[floor(random(shapeType.length))]
        if (cell.innerShape !== 'full') {
          cell.innerShapeColor = colors[floor(random(colors.length))]
        }
      }, floor(random(300)))

    }
  }
}

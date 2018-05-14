import Grid from './arts/Grid.js'
import CONST from './constants.js'
let currentArt
let board

const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(CONST.CANVAS_WIDTH, CONST.CANVAS_HEIGHT)
    p.loop()
    // Calculate columns and rows
    const columns = p.floor(p.width/CONST.CELL_SIZE)
    const rows = p.floor(p.height/CONST.CELL_SIZE)
    // Wacky way to make a 2D array is JS
    board = new Array(columns)
    for (let i = 0; i < columns; i++) {
      board[i] = new Array(rows)
    }
    init()
  }

  // reset board when mouse is pressed
  p.mousePressed = () => {
    init()
  }

  const init = () => {
    currentArt = new Grid(p, CONST.CELL_SIZE, board)
    currentArt.initGrid()
  }

  p.draw = () => {
    p.background(255)
    p.noStroke()
    if(currentArt) {
      currentArt.drawGrid()
    }

  }
}

new p5(sketch)

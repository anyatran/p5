import Grid from './arts/Grid.js'
const cellSize = 50
let currentArt
let columns
let rows
let board

const sketch = (p) => {
  p.setup = () => {
    p.createCanvas(600, 600)
    p.loop()
    // Calculate columns and rows
    columns = p.floor(p.width/cellSize)
    rows = p.floor(p.height/cellSize)
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

  // Fill board randomly
  const init = () => {
    currentArt = new Grid(p, cellSize, board)
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

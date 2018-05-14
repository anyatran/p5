import Grid from './arts/Grid.js'
const cellSize = 50
let currentArt
let columns
let rows
let board

function setup() {
  createCanvas(600, 600)
  loop()
  // Calculate columns and rows
  columns = floor(width/cellSize)
  rows = floor(height/cellSize)
  // Wacky way to make a 2D array is JS
  board = new Array(columns)
  for (let i = 0; i < columns; i++) {
    board[i] = new Array(rows).fill({})
  }
  init()
}

function draw() {
  background(255)
  noStroke()
  currentArt.drawGrid()
}

// reset board when mouse is pressed
function mousePressed() {
  init()
}

// Fill board randomly
function init() {
  currentArt = new Grid(cellSize, board)
  console.log(currentArt)
  currentArt.initGrid()
}

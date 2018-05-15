import Grid from './arts/Grid.js'
import CONST from './constants.js'

document.addEventListener('DOMContentLoaded', () => {
  let currentArt
  let board
  const body = document.querySelector('body')
  const separators = document.querySelectorAll('[data-separator]')

  const sketch = (p) => {
    p.setup = () => {
      p.createCanvas(body.offsetWidth, body.offsetHeight)
      p.loop()
      // Calculate columns and rows
      const columns = p.floor(p.width/CONST.CELL_SIZE)
      const rows = p.floor(p.height/CONST.CELL_SIZE)
      // Wacky way to make a 2D array is JS
      board = new Array(columns)
      for (let i = 0; i < columns; i++) {
        board[i] = new Array(rows)
      }

      separators.forEach((separator, index) => {
        const offset = ((p.width - CONST.FRAME_WIDTH * 2) / 3) * (index + 1) + CONST.FRAME_WIDTH * index
        separator.style.width = CONST.FRAME_WIDTH
        separator.style.left = `${offset}px`
      })
      init()
    }

    // reset board keys 1, 2, 3, or 4 are pressed
    p.keyPressed = () => {
      // 1
      if(p.keyCode === 49) {
        init()
      } else if(p.keyCode === 50) {
        // 2
        init()
      } else if(p.keyCode === 51) {
        // 3
        init()
      } else if(p.keyCode === 52) {
        // 4
        init()
      }
    }

    p.draw = () => {
      p.background(0)
      p.noStroke()
      if(currentArt) {
        currentArt.drawGrid()
      }
    }

    const init = () => {
      currentArt = new Grid(p, CONST.CELL_SIZE, board)
      currentArt.initGrid()
    }
  }

  new p5(sketch)
})

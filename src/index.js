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

    p.keyPressed = () => {
      switch (p.keyCode) {
        case CONST.KEYCODES['1']: // canvas one, top left
          init()
          break
        case CONST.KEYCODES['2']: // canvas one, top right
          init()
          break
        case CONST.KEYCODES['3']: // canvas one, bottom left
          init()
          break
        case CONST.KEYCODES['4']: // canvas one, bottom right
          init()
          break
        case CONST.KEYCODES['5']:
          init()
          break
        case CONST.KEYCODES['6']:
          init()
          break
        case CONST.KEYCODES['7']:
          init()
          break
        case CONST.KEYCODES['8']:
          init()
          break
        case CONST.KEYCODES['9']:
          init()
          break
        case CONST.KEYCODES['0']:
          init()
          break
        case CONST.KEYCODES['hyphen']:
          init()
          break
        case CONST.KEYCODES['equal']:
          init()
          break
        default:
          break
      }
    }

    p.draw = () => {
      p.background(0)
      p.noStroke()
      if (currentArt) {
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

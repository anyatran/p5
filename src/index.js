import Serial from './components/Serial/Serial.js'
import Grid from './components/Grid/Grid.js'
import Stripes from './components/Stripes/Stripes.js'
import { countColumns, countRows, randomInt } from './helpers.js'
import CONST from './constants.js'

document.addEventListener('DOMContentLoaded', () => {
  let currentState
  let board
  let darkMode
  const body = document.querySelector('body')
  const separators = document.querySelectorAll('[data-separator]')

  const sketch = (p) => {
    let serial

    p.setup = () => {
      p.createCanvas(body.offsetWidth, body.offsetHeight)
      p.frameRate(30)
      // Calculate columns and rows
      const columns = countColumns(p.width, CONST.CELL_SIZE)
      const rows = countRows(p.height, CONST.CELL_SIZE)
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

      serial = new Serial(p)
    }

    p.keyPressed = () => {
      switch (p.keyCode) {
        // toggle dark mode
        case CONST.KEYCODES['1']: // canvas one, top left
          changeDarkMode(!darkMode)
          break
        // switch to stripes
        case CONST.KEYCODES['2']: // canvas one, top right
          changeState(Stripes)
          break
        // switch to rids
        case CONST.KEYCODES['3']: // canvas one, bottom left
          changeState(Grid)
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
      if (currentState) {
        currentState.draw()
      }
    }

    const init = () => {
      darkMode = CONST.BOOLEANS[randomInt(CONST.BOOLEANS.length)]
      const State = CONST.ARTS[randomInt(CONST.ARTS.length)]
      currentState = new State(p, CONST.CELL_SIZE, board, darkMode)
      currentState.init()
    }

    const changeState = (state) => {
      currentState.fadeOut()
      setTimeout(() => {
        darkMode = CONST.BOOLEANS[randomInt(CONST.BOOLEANS.length)]
        currentState = new state(p, CONST.CELL_SIZE, board, darkMode)
        currentState.init()
      }, 4000)
    }

    const changeDarkMode = (isDarkMode) => {
      darkMode = isDarkMode
      currentState.changeDarkMode(isDarkMode)
    }
  }

  new p5(sketch)
})

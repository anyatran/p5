import Serial from './components/Serial/Serial.js'
import Grid from './components/Grid/Grid.js'
import Stripes from './components/Stripes/Stripes.js'
import { countColumns, countRows, randomInt } from './helpers.js'
import CONST from './constants.js'

document.addEventListener('DOMContentLoaded', () => {
  let currentState
  let interval
  let board
  let darkMode
  let isShacking = false
  let serial
  let zoom = 1
  const scenes = [Grid, Stripes]
  const body = document.querySelector('body')
  const separators = document.querySelectorAll('[data-separator]')

  const sketch = (p) => {

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

      interval = setInterval(() =>  {
        const State = scenes[randomInt(scenes.length)]
        changeState(State)
      }, 15000)
    }

    p.keyPressed = () => {
      if (CONST.KEYCODES[p.keyCode] !== undefined) {
        currentState.onTouch(CONST.KEYCODES[p.keyCode])
      }
    }

    p.draw = () => {
      p.background(0)
      p.noStroke()
      p.scale(zoom)
      if (isShacking) {
        // p.shearX(p.PI / -4.0);
        // p.translate(p.width / 2, p.height / 2);
        // p.translate(p5.Vector.fromAngle(p.millis() / 1000, 0));
        p.translate(p5.Vector.fromAngle(p.PI).mult(p.random(10, 100)))
      }
      if (currentState) {
        currentState.draw()
      }
    }

    const init = () => {
      darkMode = CONST.BOOLEANS[randomInt(CONST.BOOLEANS.length)]
      const State = scenes[randomInt(scenes.length)]
      currentState = new State(p, CONST.CELL_SIZE, board, darkMode)
      currentState.init()
      serial = new Serial(p, currentState)
    }

    const changeState = (state) => {
      currentState.fadeOut()
      isShacking = true
      clearInterval(interval)
      setTimeout(() => {
        darkMode = CONST.BOOLEANS[randomInt(CONST.BOOLEANS.length)]
        currentState = new state(p, CONST.CELL_SIZE, board, darkMode)
        isShacking = false
        currentState.init()
        serial.updateState(currentState)

        // reset interval
        interval = setInterval(() =>  {
          const State = scenes[randomInt(scenes.length)]
          changeState(State)
        }, 15000)
      }, 4000)
    }

    const changeDarkMode = (isDarkMode) => {
      darkMode = isDarkMode
      currentState.changeDarkMode(isDarkMode)
    }

    const triggerSection = (sectionNumber) => {
      currentState.triggerSection(sectionNumber)
    }
  }

  new p5(sketch)
})

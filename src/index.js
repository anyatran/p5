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
  const scenes = [Grid, Stripes]
  let zoom = 1
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

      interval = setInterval(() =>  {
        const State = scenes[randomInt(scenes.length)]
        changeState(State)
      }, 15000)
    }

    p.keyPressed = () => {
      switch (p.keyCode) {
        // toggle dark mode
        case CONST.KEYCODES['1']: // canvas one, top left
          // changeDarkMode(!darkMode)
          // zoom in
          // zoom += 0.5
          currentState.keyPressed(1)
          break
        // switch to stripes
        case CONST.KEYCODES['2']: // canvas one, top right
          // zoom out
          // if (zoom > 1) {
          //   zoom -= 0.5
          // }
          currentState.keyPressed(2)
          break
        // switch to grids
        case CONST.KEYCODES['3']: // canvas one, bottom left
          // changeState(Grid)
          currentState.keyPressed(3)
          break
        case CONST.KEYCODES['4']: // canvas one, bottom right
          // switch to stripes
          // changeState(Stripes)
          currentState.keyPressed(4)
          break
        case CONST.KEYCODES['5']:
          // dark mode toggle
          // changeDarkMode(!darkMode)
          currentState.keyPressed(5)
          break
        case CONST.KEYCODES['6']:
          // init()
          // isShacking = !isShacking
          currentState.keyPressed(6)
          break
        case CONST.KEYCODES['7']:
          // init()
          // triggerSection(7)
          currentState.keyPressed(7)
          break
        case CONST.KEYCODES['8']:
          // init()
          // triggerSection(8)
          currentState.keyPressed(8)
          break
        case CONST.KEYCODES['9']:
          // init()
          // triggerSection(9)
          currentState.keyPressed(9)
          break
        case CONST.KEYCODES['0']:
          // init()
          // triggerSection(10)
          currentState.keyPressed(10)
          break
        case CONST.KEYCODES['hyphen']:
          // init()
          // triggerSection(11)
          currentState.keyPressed(11)
          break
        case CONST.KEYCODES['equal']:
          // init()
          // triggerSection(12)
          currentState.keyPressed(12)
          break
        default:
          break
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
    }

    const changeState = (state) => {
      currentState.fadeOut()
      isShacking = true
      console.log(isShacking)
      clearInterval(interval)
      setTimeout(() => {
        darkMode = CONST.BOOLEANS[randomInt(CONST.BOOLEANS.length)]
        currentState = new state(p, CONST.CELL_SIZE, board, darkMode)
        isShacking = false
        currentState.init()

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

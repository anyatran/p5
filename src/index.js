import Sound from './components/Sound/Sound.js'
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
  let backgroundSound
  let shackingSound
  let gridSound
  let diagonalSound
  let diagonalSounds = []
  const scenes = [Grid, Stripes]
  const body = document.querySelector('body')
  const separators = document.querySelectorAll('[data-separator]')

  const sketch = (p) => {

    p.preload = () => {
      backgroundSound = new Sound(p, '../sounds/bg.wav', true)
      shackingSound = new Sound(p, '../sounds/rhythm/sparse-drum2.wav', true)
      gridSound = new Sound(p, '../sounds/arhythmic/arp-softened.wav', true)
      // gridSound = new Sound(p, '../sounds/main-loop/endless.wav', true)
      diagonalSound = new Sound(p, '../sounds/main-loop/visualizerloops.wav', true)
      diagonalSounds.push(new Sound(p, '../sounds/arhythmic/arp1.wav', false))
      diagonalSounds.push(new Sound(p, '../sounds/arhythmic/arp2.wav', false))
      diagonalSounds.push(new Sound(p, '../sounds/arhythmic/arp3.wav', false))
      diagonalSounds.push(new Sound(p, '../sounds/arhythmic/arp4.wav', false))
      diagonalSounds.push(new Sound(p, '../sounds/arhythmic/arp5.wav', false))
      diagonalSounds.push(new Sound(p, '../sounds/arhythmic/arp6.wav', false))
      diagonalSounds.push(new Sound(p, '../sounds/arhythmic/arp7.wav', false))
      diagonalSounds.push(new Sound(p, '../sounds/arhythmic/arp8.wav', false))
      diagonalSounds.push(new Sound(p, '../sounds/arhythmic/arp9.wav', false))
      diagonalSounds.push(new Sound(p, '../sounds/arhythmic/arp2.wav', false))
      diagonalSounds.push(new Sound(p, '../sounds/arhythmic/arp5.wav', false))
      diagonalSounds.push(new Sound(p, '../sounds/arhythmic/arp3.wav', false))
    }

    p.setup = () => {
      // console.log(body.offsetWidth, body.offsetHeight)
      p.createCanvas(body.offsetWidth, body.offsetHeight)
      // p.createCanvas(CONST.CANVAS_WIDTH, CONST.CANVAS_HEIGHT)
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
      backgroundSound.setVolume(0.3)
      backgroundSound.sound.loop(0, 1, backgroundSound.volume, 0, 64)
      backgroundSound.play()
      interval = setInterval(() =>  {
        const State = scenes[randomInt(scenes.length)]
        changeState(State)
      }, 28000)
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
    const setSound = () => {
      if (currentState.isDiagonal()) {
        currentState.setSound(diagonalSound)
        currentState.setTriggerSounds(diagonalSounds)
      } else {
        currentState.setSound(gridSound)
      }
    }

    const init = () => {
      darkMode = CONST.BOOLEANS[randomInt(CONST.BOOLEANS.length)]
      const State = scenes[randomInt(scenes.length)]
      currentState = new State(p, CONST.CELL_SIZE, board, darkMode)
      setSound()
      currentState.init()
      serial = new Serial(p, currentState)
    }

    const changeState = (state) => {
      currentState.fadeOut()
      isShacking = true
      shackingSound.play()
      clearInterval(interval)
      setTimeout(() => {
        darkMode = CONST.BOOLEANS[randomInt(CONST.BOOLEANS.length)]
        currentState.sound.stop(2)
        currentState = new state(p, CONST.CELL_SIZE, board, darkMode)
        setSound()
        isShacking = false
        shackingSound.stop(1)
        currentState.init()
        serial.updateState(currentState)

        // reset interval
        interval = setInterval(() =>  {
          const State = scenes[randomInt(scenes.length)]
          changeState(State)
        }, 28000)
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

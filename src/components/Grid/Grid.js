import Cell from './Cell.js'
import Sound from '../Sound/Sound.js'
import CONST from '../../constants.js'
import { randomInt } from '../../helpers.js'

/**
* Animation ideas:
* - expand cell size
* - swap cells
*/

export default class Grid {
  constructor(p, size, board, darkMode) {
    this.p = p
    this.size = size
    this.board = board
    this.darkMode = darkMode
  }

  init() {
    this.board.map((column, x) => {
      for (let y = 0; y < column.length; y++) {
        setTimeout(() => {
          const cellColor = CONST.COLORS[randomInt(CONST.COLORS.length)]
          this.board[x][y] = new Cell(this.p, cellColor, CONST.CELL_SIZE, x, y, this.darkMode)
          // picking a random shape
          const Shape = CONST.SHAPE_TYPES[randomInt(CONST.SHAPE_TYPES.length)]
          if (Shape) {
            const innerShapeColor = CONST.COLORS[randomInt(CONST.COLORS.length)]
            this.board[x][y].setShape(new Shape(this.p, this.size, innerShapeColor, CONST.BOOLEANS[randomInt(CONST.BOOLEANS.length)], x, y))
          }
        // }, randomInt(500))
        }, 25*x + 25*y)
      }
    })
    const canvasWidth = this.p.width / 3
    const canvasHeight = this.p.height
    this.sectionWidth = this.p.round(canvasWidth / this.size)
    this.sectionHeight = this.p.round(canvasHeight / 4 / this.size)
    if (this.sound) {
      this.sound.play()
    }
  }

  draw() {
    // draw the cell first
    this.board.map(column => {
      column.map(cell => {
        cell.drawBG()
      })
    })

    this.board.map(column => {
      column.map(cell => {
        cell.drawShape()
      })
    })
  }

  changeDarkMode(isDarkMode) {
    this.darkMode = isDarkMode
    this.board.map((column, x) => {
      column.map((cell, y) => {
        setTimeout(() => {
          cell.setDarkMode(this.darkMode)
        // }, 25*x + 25*y) // diagonal
        }, randomInt(500)) // random
        // }, 25 * x) // horizontal
      })
    })
  }

  fadeOut() {
    this.board.map((column, x) => {
      column.map((cell, y) => {
        if (!this.darkMode) {
          this.darkMode = true
          setTimeout(() => {
            cell.setDarkMode(this.darkMode)
          }, randomInt(500)) // random
        }

        setTimeout(() => {
          cell.fadeOut()
        }, randomInt(500, 1500)) // random
      })
    })
    if (this.sound) {
      this.sound.stop(1)
    }

  }

  setSound(sound) {
    this.sound = sound
  }

  setTriggerSounds(sounds) {
    this.triggerSounds = sounds
  }

  isDiagonal() {
    return false
  }

  // triggerSection(sectionNumber) {
  //   console.log(sectionNumber)
  // }


  getSection(sectionNumber) {
    // console.log(sectionNumber)
    const sectionStartX = this.p.floor(sectionNumber / 4) * this.sectionWidth // starts w 1
    const sectionEndX = sectionStartX + this.sectionWidth - 1
    const sectionStartY = this.p.floor(sectionNumber % 4) * this.sectionHeight // start from 1
    let sectionEndY = sectionStartY + this.sectionHeight - 1
    if (sectionEndY > this.p.floor(this.p.height / this.size) - 1) {
      sectionEndY = this.p.floor(this.p.height / this.size) - 1
    }
    // console.log(this.board, this.sectionWidth, this.sectionHeight, sectionStartX, sectionStartY, sectionEndX, sectionEndY)
    for (let i = sectionStartX; i <= sectionEndX; i++) {
      const column = this.board[i]
      for (let j = sectionStartY; j <= sectionEndY; j++) {
        setTimeout(() => column[j].toggleDarkMode(), randomInt(800))
      }
    }
  }

  onTouch(electrodeNumber) {
    this.triggerSounds[electrodeNumber].play()
    this.getSection(electrodeNumber)
  }

  setTriggerSounds(sounds) {
    this.triggerSounds = sounds
  }
}

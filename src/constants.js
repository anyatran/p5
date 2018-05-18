import Circle from './components/Grid/Circle.js'
import HalfCircle from './components/Grid/HalfCircle.js'
import Triangle from './components/Grid/Triangle.js'
import Grid from './components/Grid/Grid.js'
import Stripes from './components/Stripes/Stripes.js'

 // TODO IMPORT GRID
export default {
  ARTS: [Stripes],
  BOOLEANS: [true, false],
  CANVAS_WIDTH: 600,
  CANVAS_HEIGHT: 600,
  CELL_SIZE: 50,
  COLORS: ['#000000', '#FF4047', '#FFE66E', '#23E8A7', '#2C72F1', '#96D7FE', '#CD4AF4', '#FFDAE2'],
  FOUR_DIRECTIONS: ['top', 'left', 'bottom', 'right'],
  FRAME_WIDTH: 100, // 300
  KEYCODES: {'1': 49, '2': 50, '3': 51, '4': 52, '5': 53, '6': 54, '7': 55, '8': 56, '9': 57, '0': 48, 'hyphen': 189, 'equal': 187},
  SERIAL_PORT: '/dev/cu.usbmodem1421', // temp
  SHAPE_TYPES: [null, Circle, HalfCircle, Triangle],
  TWO_DIRECTIONS: ['left', 'right'],
}

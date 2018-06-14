import Grid from './components/Grid/Grid.js'
import Circle from './components/Grid/Circle.js'
import HalfCircle from './components/Grid/HalfCircle.js'
import Triangle from './components/Grid/Triangle.js'
import Stripes from './components/Stripes/Stripes.js'

 // TODO IMPORT GRID
export default {
  BOOLEANS: [true, false],
  CANVAS_WIDTH: 600,
  CANVAS_HEIGHT: 300,
  CELL_SIZE: 50,
  COLORS: ['#000000', '#FF4047', '#FFE66E', '#23E8A7', '#2C72F1', '#96D7FE', '#CD4AF4', '#FFDAE2'],
  FOUR_DIRECTIONS: ['top', 'left', 'bottom', 'right'],
  FRAME_WIDTH: 300, // 300
  KEYCODES: { 192: 0, 49: 1, 50: 2, 51: 3, 52: 4, 53: 5, 54: 6, 55: 7, 56: 8, 57: 9, 48: 10, 189: 11, },
  SERIAL_PORT: '/dev/cu.usbmodem144131', // temp
  SHAPE_TYPES: [null, Circle, HalfCircle, Triangle],
  TWO_DIRECTIONS: ['left', 'right'],
}

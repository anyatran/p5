import Circle from './arts/Circle.js'
import HalfCircle from './arts/HalfCircle.js'
import Triangle from './arts/Triangle.js'

export default {
  BOOLEANS: [true, false, false],
  CANVAS_WIDTH: 600,
  CANVAS_HEIGHT: 600,
  CELL_SIZE: 50,
  COLORS: ['#000000', '#FF4047', '#FFE66E', '#23E8A7', '#2C72F1', '#96D7FE', '#CD4AF4', '#FFDAE2'],
  FOUR_DIRECTIONS: ['top', 'left', 'bottom', 'right'],
  FRAME_WIDTH: 100,
  KEYCODES: {'1': 49, '2': 50, '3': 51, '4': 52, '5': 53, '6': 54, '7': 55, '8': 56, '9': 57, '0': 48, 'hyphen': 189, 'equal': 187},
  SHAPE_TYPES: [null, Circle, HalfCircle, Triangle],
  TWO_DIRECTIONS: ['left', 'right'],
}

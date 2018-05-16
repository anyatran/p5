import Circle from './components/Circle.js'
import HalfCircle from './components/HalfCircle.js'
import Triangle from './components/Triangle.js'

export default {
  BOOLEANS: [true, false, false],
  CANVAS_WIDTH: 600,
  CANVAS_HEIGHT: 600,
  CELL_SIZE: 50,
  COLORS: ['#000000', '#FF4047', '#FFE66E', '#23E8A7', '#2C72F1', '#96D7FE', '#CD4AF4', '#FFDAE2'],
  FOUR_DIRECTIONS: ['top', 'left', 'bottom', 'right'],
  FRAME_WIDTH: 100,
  SHAPE_TYPES: [null, Circle, HalfCircle, Triangle],
  TWO_DIRECTIONS: ['left', 'right'],
}

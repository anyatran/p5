import Circle from './arts/Circle.js'
import CircleRight from './arts/CircleRight.js'
import CircleLeft from './arts/CircleLeft.js'
import CircleTop from './arts/CircleTop.js'
import CircleBottom from './arts/CircleBottom.js'
import LeftTriangle from './arts/LeftTriangle.js'
import RightTriangle from './arts/RightTriangle.js'

export default {
  BOOLEANS: [true, false, false],
  CANVAS_WIDTH: 600,
  CANVAS_HEIGHT: 600,
  CELL_SIZE: 50,
  COLORS: ['#000000', '#FF4047', '#FFE66E', '#23E8A7', '#2C72F1', '#96D7FE', '#CD4AF4', '#FFDAE2'],
  FRAME_WIDTH: 100,
  SHAPE_TYPES: [null, Circle, CircleRight, CircleLeft, CircleTop, CircleBottom, LeftTriangle, RightTriangle],
}

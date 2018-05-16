/**
* return a random integer
*/
export const randomInt = (arg1, arg2) => {
  if (arg2) {
    return Math.floor(Math.random() * (arg2 - arg1) + arg1)
  } else {
    return Math.floor(Math.random() * arg1)
  }
}

/**
* calculate number of columns for a grid
*/
export const countColumns = (canvasWidth, cellSize) => {
  return Math.floor(canvasWidth / cellSize)
}

/**
* calculate number of rows for a grid
*/
export const countRows = (canvasHeight, cellSize) => {
  return Math.floor(canvasHeight / cellSize)
}

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

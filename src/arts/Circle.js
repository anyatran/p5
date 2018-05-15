export default class Circle {
  constructor(p, radius, color) {
    this.p = p
    this.radius = radius
    this.color = color
    this.time = 0.
    this.speed = 0.02
    this.isExpanding = true
  }

  draw(x, y) {
    this.p.fill(this.color)
    this.p.ellipse(x, y, this.radius)

    // easing constant
    const e = new p5.Ease()
    const q = e.bounceInOut(this.time, this.p) // play around with diff easings

    if(this.time < 1.) {
      if(this.isExpanding) {
        this.radius = this.p.map(q, 0., 10., this.radius, 100)
      } else {
        this.radius = this.p.map(q, 0., 10., this.radius, 10)
      }
      this.time+=this.speed
    } else {
      this.time = 0. // reset time
      this.isExpanding = !this.isExpanding
    }
  }
}

export default class Sound {
  constructor(p, soundUrl, loop) {
    this.p = p
    this.sound = p.loadSound(soundUrl)
    this.amplitude = new p5.Amplitude()
    this.loop = loop

    this.init()
  }

  init() {
    this.sound.setLoop(this.loop)
    this.sound.playMode('sustain')
    this.sound.setVolume(1)
    this.amplitude.setInput(this.sound)
    // console.log(this.sound)
  }

  isPlaying() {
    return this.sound.isPlaying()
  }

  play() {
    this.sound.play()
  }

  stop(secFromNow = 0) {
    // this.sound.fade(0, secFromNow)
    this.sound.stop(secFromNow)
  }

  mousePressed() {
    const a = 1
    // this.sound.play()
    // console.log('play')
  }

  mouseReleased() {
    // this.sound.pause()
    const a = 1
  }

  getAmplitude() {
    return this.amplitude.getLevel()
  }
}

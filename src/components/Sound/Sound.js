export default class Sound {
  constructor(p, soundUrl, loop) {
    this.p = p
    this.sound = p.loadSound(soundUrl)
    this.amplitude = new p5.Amplitude()
    this.loop = loop
    this.volume = 1

    this.init()
  }

  init() {
    this.sound.setLoop(this.loop)
    this.sound.playMode('sustain')
    this.sound.setVolume(this.volume)
    this.amplitude.setInput(this.sound)
    // console.log(this.sound)
  }

  isPlaying() {
    return this.sound.isPlaying()
  }

  setVolume(volume) {
    this.volume = volume
  }

  play() {
    this.sound.setVolume(this.volume)
    this.sound.play()
  }

  stop(secFromNow = 0) {
    this.sound.fade(0, secFromNow)
    this.sound.stop(secFromNow + 1)
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

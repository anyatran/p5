import CONST from '../../constants.js'

export default class Serial {
  constructor(p, currentState) {
    this.p = p
    this.currentState = currentState
    this.serial_ = new p5.SerialPort()

    this.init()
  }

  init() {
    this.serial_.on('list', this.onList)
    this.serial_.on('connected', this.onServerConnected)
    this.serial_.on('open', this.onPortOpen)
    this.serial_.on('data', this.onSerialEvent.bind(this))
    this.serial_.on('error', this.onSerialError)
    this.serial_.on('close', this.onPortClose)

    this.serial_.open(CONST.SERIAL_PORT)
  }

  updateState(state) {
    this.currentState = state
  }

  onList(portList) {
    for (let i = 0; i < portList.length; i++) {
      console.log(`${i} ${portList[i]}`)
    }
  }

  onServerConnected() {
    console.log('connected to server')  }

  onPortOpen() {
    console.log('serial port opened')
  }

  onSerialEvent() {
    const inString = this.serial_.readStringUntil('\r\n')
    if (inString.length > 0) {
      const splitString = this.p.splitTokens(inString, ' ')
      const eventType = splitString[0]
      const electrode = splitString[1]
      switch (eventType) {
        case 'TCH':
          this.touchEvent(electrode)
          break;
        default:
          break;
      }
    }
  }

  onSerialError(err) {
    console.log(`error: ${err}`)
  }

  onPortClose() {
    console.log('serial port closed')
  }

  touchEvent(electrodeNumber) {
    console.log('touch', electrodeNumber)
    this.currentState.onTouch(electrodeNumber)
  }
}

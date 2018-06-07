import CONST from '../../constants.js'

export default class Serial {
  constructor(p) {
    this.p = p
    this.serial = new p5.SerialPort()
    this.portName = CONST.SERIAL_PORT

    // datastream arrays
    this.dataArrayInitLength = 12
    this.status = []

    this.init()
  }

  init() {
    this.serial.on('list', this.onList)
    this.serial.on('connected', this.onServerConnected)
    this.serial.on('open', this.onPortOpen)
    this.serial.on('data', this.onSerialEvent.bind(this))
    this.serial.on('error', this.onSerialError)
    this.serial.on('close', this.onPortClose)

    this.serial.open(this.portName)
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
    // console.log('serial event')

    const inString = this.serial.readStringUntil('\r\n')
    if (inString.length > 0) {
      const splitString = this.p.splitTokens(inString, ' ')
      if (splitString[0] == 'TCH') {
        console.log('touch', splitString[1])
      }
    }
  }

  onSerialError(err) {
    console.log(`error: ${err}`)
  }

  onPortClose() {
    console.log('serial port closed')
  }
}

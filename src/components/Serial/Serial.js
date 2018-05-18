import CONST from '../../constants.js'

export default class Serial {
  constructor(p) {
    this.p = p
    this.serial = new p5.SerialPort()
    this.portName = CONST.SERIAL_PORT

    // datastream arrays
    this.dataArrayInitLength = 12
    this.status = []
    this.touchThresholds = []
    this.releaseThresholds = []
    this.filteredData = []
    this.baselineVals = []
    this.diffs = []

    this.init()
  }

  init() {
    this.serial.on('list', this.onList)
    this.serial.on('connected', this.onServerConnected)
    this.serial.on('open', this.onPortOpen)
    this.serial.on('data', this.onSerialEvent)
    this.serial.on('error', this.onSerialError)
    this.serial.on('close', this.onPortClose)

    // this.serial.open(this.portName)
  }

  onList(portList) {
    for (let i = 0; i < portList.length; i++) {
      console.log(`${i} ${portList[i]}`)
    }
  }

  onServerConnected() {
    console.log('connected to server')
  }

  onPortOpen() {
    console.log('serial port opened')
  }

  onSerialEvent() {
    console.log('serial event')

    // should receive a string like "TTHS: 40 40 40 40 40 40 40 40 40 40 40 40 40"
    const inString = this.serial.readString()
    const splitString = this.p.splitTokens(inString, ': ')
    console.log(splitString)

    // save values to relevant array
    switch (splitString[0]) {
      case 'TOUCH':
        this.updateArraySerial(this.status)
        break
      case 'TTHS':
        this.updateArraySerial(this.touchThresholds)
        break
      case 'RTHS':
        this.updateArraySerial(this.releaseThresholds)
        break
      case 'FDAT':
        this.updateArraySerial(this.filteredData)
        break
      case 'BVAL':
        this.updateArraySerial(this.baselineVals)
        break
      case 'DIFF':
        this.updateArraySerial(this.diffs)
        break
    }
  }

  onSerialError(err) {
    console.log(`error: ${err}`)
  }

  onPortClose() {
    console.log('serial port closed')
  }

  updateArraySerial(array) {
    if (array == null) {
      return;
    }

    for (let i = 0; i < min(this.dataArrayInitLength, this.splitString.length - 1); i++) {
      array[i] = parseInt(this.p.trim(this.splitString[i + 1]))
    }

    console.log(array)
  }
}

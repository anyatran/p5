# З Ю З Я (zyuzya)
UQ Happy Hour Interactive Installation -- SFDW 2018

## Instructions
- Install and run p5.serialserver ([instructions](https://github.com/vanevery/p5.serialport#p5serial-nodejs))
    - `npm install p5.serialserver`
    - `cd node_modules/p5.serialserver && node startserver.js`
    - [TODO] Add package.json and/or p5.serialcontrol instructions
    - Arduino settings:
      * Tools > Board: Bare Conductive Touch board
      * Tools > Port: dev/cu.usbmodem14411
      * Tools > Programmer: AVRISP mkII
      * Make sure you're not running Serial Monitor as well
- Run a local server using something like `SimpleHTTPServer` or `http-server` ([instructions](https://github.com/processing/p5.js/wiki/Local-server))

## Documentations
- [p5.js reference](https://p5js.org/reference/)
- [p5.js examples](https://p5js.org/examples/)
- [p5.serialport](http://vanevery.github.io/p5.serialport/docs/classes/p5.serialport.html)
- [p5.serialserver](https://github.com/vanevery/p5.serialport#p5serial-nodejs)
- [Touch Board + Arduino](https://www.bareconductive.com/make/setting-up-arduino-with-your-touch-board/)
- [Touch Board + Processing](https://www.bareconductive.com/make/touch-board-grapher/)

## Section division
```
._____.  ._____.  ._____.
|__1__|  |__5__|  |__9__|
|__2__|  |__6__|  |__10_|
|__3__|  |__7__|  |__11_|
|__4__|  |__8__|  |__12_|
```

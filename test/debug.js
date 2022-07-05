const { spawn } = require('child_process')
const path = require('path')

const run = async () => {
  try {
    const debug = spawn('node', ['--inspect-brk=9222', path.resolve(__dirname, './index.js')])
    debug.on('spawn', () => {
      console.log('spawn')
    })
    debug.on('disconnect', () => {
      console.log('disconnect')
    })
    debug.on('exit', () => {
      console.log('disconnect')
    })
    debug.on('error', (err) => {
      console.log('error', err)
    })
    debug.on('message', (msg) => {
      console.log('%c 🥦 msg: ', 'font-size:20px;background-color: #42b983;color:#fff;', msg)
    })
    debug.on('close', (code, signal) => {
      console.log('close')
    })
    debug.stdout
      .on('error', () => {
        console.log('error')
      })
      .on('data', (chunk) => {
        debugger
        console.log('data', chunk.toString())
      })
      .on('error', () => {
        console.log('error')
      })
  } catch (ex) {
    console.log('%c 🍛 ex: ', 'font-size:20px;background-color: #FCA650;color:#fff;', ex)
  }
}
run()

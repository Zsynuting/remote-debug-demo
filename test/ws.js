const WebSocket = require('ws')

const ws = new WebSocket('ws://localhost:9223/0f3f4c67-7ec5-4700-b8fe-661fe9986613')

ws.on('message', (data) => {
  console.log('data', data)
})

ws.on('open', () => console.log('open'))

setTimeout(() => {
  ws.send(
    JSON.stringify({
      method: 'Runtime.enable',
    }),
  )
}, 1000)

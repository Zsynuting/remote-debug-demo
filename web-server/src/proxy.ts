import WebSocket from 'ws'

const map = new Map<string, WebSocket>()

export default {
  async bind(clientWs: WebSocket, channelId: string) {
    const ws = map.get(channelId)!
    ws.on('message', (data) => {
      const msg = data.toString()
      console.log('debugging runtime respond:', JSON.parse(msg))
      clientWs.send(msg)
    })
    clientWs.on('message', (data) => {
      const msg = data.toString()
      console.log('devtools UI sent:', JSON.parse(msg))
      ws.send(msg)
    })
  },
  async registry(channelId: string) {
    await new Promise((resolve) => {
      const ws = new WebSocket(`ws://localhost:9229/${channelId}`)
      ws.on('open', () => {
        console.log('open')
        map.set(channelId, ws)
        resolve(null)
      })
    })
  },
}

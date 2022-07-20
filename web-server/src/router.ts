import { spawn } from 'child_process'
import fs from 'fs'
import KoaRouter from 'koa-router'
import path from 'path'
import * as uuid from 'uuid'
import ip from 'ip'
import fetch from 'node-fetch'
import proxy from './proxy'

const router = new KoaRouter()
const ipAddress = ip.address()

router.post('/debug', async (ctx, next) => {
  const { code = 'console.log(1)' } = ctx.request.body as { code: string }
  console.log('%c 🍦 code: ', 'font-size:20px;background-color: #FFDD4D;color:#fff;', code)
  const fileId = uuid.v4()
  const filePath = path.resolve(`./temp/${fileId}.js`)
  fs.writeFileSync(filePath, code, 'utf8')
  const channelId = (await new Promise(async (resolve) => {
    const debug = spawn('node', ['--inspect-brk=9229', filePath])
    debug.on('exit', () => fs.unlink(filePath, () => console.log(`${filePath} is deleted`)))
    debug.on('spawn', async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const list = (await fetch(`http://localhost:9229/json`, { method: 'get' }).then((res) =>
        res.json(),
      )) as [{ title: string; webSocketDebuggerUrl: string; devtoolsFrontendUrl: string }]
      const instance = list[0]
      const channelId = instance ? instance.webSocketDebuggerUrl.split('/').pop() || '' : ''
      resolve(channelId)
    })
  })) as string
  const debugProxyUrl = `${ipAddress}:3033/debugProxy/${channelId}`
  const debugUrl = `http://${ipAddress}:3033/js_app.html?ws=${debugProxyUrl}`
  await proxy.registry(channelId)
  ctx.body = {
    debugProxyUrl,
    debugUrl,
  }
  await next()
})

export default router

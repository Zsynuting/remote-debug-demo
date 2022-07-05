import Koa from 'koa'
import koaStatic from 'koa-static'
import bodyParser from 'koa-bodyparser'
import koaWebSocket from 'koa-websocket'
import router from './router'
import wsRouter from './ws-router'

const app = koaWebSocket(new Koa())
app.ws.use(wsRouter)

app.use(koaStatic('./inspector'))
app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3033, () => console.log('server is running at http://localhost:3033'))

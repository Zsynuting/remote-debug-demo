import route from 'koa-route'
import proxy from './proxy'

const router = route.all('/debugProxy/:channelId', async (ctx, channelId) => {
  console.log('%c 🧀 channelId: ', 'font-size:20px;background-color: #4b4b4b;color:#fff;', channelId);
  await proxy.bind(ctx.websocket, channelId) 
})

export default router


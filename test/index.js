const fetch = require('node-fetch')

const run = async () => {
  const res = await fetch('http://localhost:9222/json', { method: 'get' }).then((res) => res.json())
  console.log('%c 🍨 res: ', 'font-size:20px;background-color: #EA7E5C;color:#fff;', res);
}
run()

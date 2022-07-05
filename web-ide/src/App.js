import React from 'react'
import Monaco from '@monaco-editor/react'
import { Button } from 'antd'
import 'antd/es/button/style/index.css'
import './App.css'

function App() {
  const [code, setCode] = React.useState()

  const handleDebug = () => {
    fetch('/debug', {
      method: 'post',
      body: JSON.stringify({ code }),
      headers: { 'content-type': 'application/json' },
    })
      .then((res) => res.json())
      .then(({ debugUrl }) => {
        window.open(debugUrl, '_BLANK')
      })
  }

  return (
    <div className="App">
      <div style={{ padding: 20 }}>
        <Button type="primary" onClick={handleDebug}>
          Debug
        </Button>
      </div>
      <div style={{ paddingLeft: 20 }}>
        <Monaco
          height={800}
          width={1200}
          defaultLanguage="javascript"
          theme="hc-black"
          onChange={(code) => setCode(code)}
        />
      </div>
    </div>
  )
}

export default App

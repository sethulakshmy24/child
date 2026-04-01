import { useEffect, useRef } from 'react'
import './App.css'

const TELLIUS_SRC =
  'https://qa2.dev.tellius.com/dashboard/d8587d3f-a5af-4aaa-b288-63ffb7d609b7/486f78e4-6641-4c6d-ba04-34651f81be47?utm_source=46f00b67-015d-46db-b1fa-5ba8089ca19e'

const ROW_LEVEL_POLICY_MESSAGE = {
  actionType: 'INITIALIZE_ROW_LEVEL_POLICY',
  rowLevelPolicies: [
    {
      rowLevelPolicy: {
        operator: 'and',
        args: [
          {
            value: 'Tables',
            field: 'Sub_Category',
            condition: '=',
          },
        ],
      },
    },
  ],
}

function App() {
  const iframeRef = useRef<HTMLIFrameElement>(null)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data === 'TELLIUS_INITIALIZED') {
        iframeRef.current?.contentWindow?.postMessage(ROW_LEVEL_POLICY_MESSAGE, '*')
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const handleIframeLoad = () => {
    iframeRef.current?.contentWindow?.postMessage('INITIALIZE', '*')
  }

  return (
    
        <iframe
          ref={iframeRef}
          className="telliusEmbedding"
          src={TELLIUS_SRC}
          height="1000px"
          width="1200px"
          onLoad={handleIframeLoad}
          title="Tellius Analytics Dashboard"
        />
  )
}

export default App

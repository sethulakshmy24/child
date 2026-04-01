import { useEffect, useRef } from 'react'
import './App.css'

const TELLIUS_SRC =
  'https://qa2.dev.tellius.com/dashboard/668aaf0e-2854-4e17-ab58-4dd3981f2dbc/ed7fb6e5-0113-44a1-90b5-db6d35c33969?utm_source=ae9568e9-63f6-4892-897b-42dca870c010'

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

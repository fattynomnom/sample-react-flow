import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import mockServiceWorker from './plugins/msw'
import './index.css'

mockServiceWorker.start()

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import mockServiceWorker from './plugins/msw'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout/Layout.tsx'
import Workflow from './pages/Workflow/Workflow.tsx'

mockServiceWorker.start()

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                path: '/workflows/:id',
                element: <Workflow />
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)

import { ReactFlow } from 'reactflow'
import { Layout } from '../../components/Layout/Layout'
import { useState } from 'react'
import 'reactflow/dist/style.css'

export default function Workflow() {
    const initialNodes = [
        {
            id: '1',
            type: 'input',
            data: { label: 'Node 1' },
            position: { x: 250, y: 25 }
        },

        {
            id: '2',
            data: { label: 'Node 2' },
            position: { x: 100, y: 125 }
        },
        {
            id: '3',
            type: 'output',
            data: { label: 'Node 3' },
            position: { x: 250, y: 250 }
        }
    ]

    const initialEdges = [
        { id: 'e1-2', source: '1', target: '2' },
        { id: 'e2-3', source: '2', target: '3', animated: true }
    ]

    const [nodes, setNodes] = useState(initialNodes)
    const [edges, setEdges] = useState(initialEdges)

    return (
        <Layout viewType="WORKFLOW">
            <h2>Workflow name</h2>
            <div className="w-full h-full">
                <ReactFlow nodes={nodes} edges={edges} fitView />
            </div>
        </Layout>
    )
}

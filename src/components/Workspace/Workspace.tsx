import {
    Background,
    BackgroundVariant,
    Controls,
    Edge,
    MiniMap,
    Node,
    OnConnect,
    OnEdgesChange,
    OnNodesChange,
    OnSelectionChangeFunc,
    ReactFlow
} from 'reactflow'

export default function Workspace({
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    onConnect,
    onSelectionChange
}: {
    nodes: Node[]
    edges: Edge[]
    onNodesChange: OnNodesChange
    onEdgesChange: OnEdgesChange
    onConnect?: OnConnect
    onSelectionChange?: OnSelectionChangeFunc
}) {
    return (
        <div className="w-full h-full bg-slate-800 rounded">
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onSelectionChange={onSelectionChange}
                fitView
            >
                <MiniMap nodeStrokeWidth={3} zoomable pannable />
                <Controls />
                <Background
                    id="1"
                    gap={10}
                    color="#334155"
                    variant={BackgroundVariant.Lines}
                />
                <Background
                    id="2"
                    gap={100}
                    offset={1}
                    color="#0f172a"
                    lineWidth={2}
                    variant={BackgroundVariant.Lines}
                />
            </ReactFlow>
        </div>
    )
}

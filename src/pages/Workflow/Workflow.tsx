import {
    Background,
    BackgroundVariant,
    Controls,
    MiniMap,
    OnSelectionChangeParams,
    ReactFlow,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges
} from 'reactflow'
import { useEffect } from 'react'
import cloneDeep from 'lodash/cloneDeep'
import 'reactflow/dist/style.css'
import { useAppDispatch, useAppSelector } from '../../hooks'
import {
    useLocation,
    useNavigate,
    useParams,
    useSearchParams
} from 'react-router-dom'
import { getWorkflowDetails } from '../../services/WorkflowsService'
import {
    setWorkflowDetails,
    setEdges,
    setNodes,
    setSelectedNode
} from '../../states/workflowDetails'
import { logError } from '../../services/LoggingService'

export default function Workflow() {
    const workflowDetails = useAppSelector(state => state.workflowDetails)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const { pathname } = useLocation()
    const [searchParams] = useSearchParams()

    const displaySelectedNode = () => {
        const nodeId = searchParams.get('node')
        if (nodeId && workflowDetails.nodes.length > 0) {
            console.log(1)
            dispatch(setSelectedNode({ selected: true, id: nodeId }))
        }
    }

    const fetchWorkflowDetails = async () => {
        if (!id) return

        try {
            const result = await getWorkflowDetails(id)
            dispatch(setWorkflowDetails(result))
            dispatch(setNodes(result.nodes))
            dispatch(setEdges(result.edges))
        } catch (error) {
            logError(error)
        }
    }

    const setNodeIdQuery = ({ nodes }: OnSelectionChangeParams) => {
        const firstNode = nodes[0]
        if (firstNode) {
            navigate(`${pathname}?node=${firstNode.id}`)
        }
    }

    useEffect(() => {
        fetchWorkflowDetails()
    }, [id])

    useEffect(() => {
        displaySelectedNode()
    }, [searchParams.get('node'), workflowDetails.nodes.length])

    return (
        <>
            <h2>{workflowDetails.name}</h2>
            <div className="w-full h-full mt-5 bg-slate-800 rounded">
                <ReactFlow
                    nodes={workflowDetails.nodes}
                    edges={workflowDetails.edges}
                    onNodesChange={changes =>
                        dispatch(
                            setNodes(
                                applyNodeChanges(changes, workflowDetails.nodes)
                            )
                        )
                    }
                    onEdgesChange={changes =>
                        dispatch(
                            setEdges(
                                applyEdgeChanges(changes, workflowDetails.edges)
                            )
                        )
                    }
                    onConnect={connection =>
                        dispatch(
                            setEdges(addEdge(connection, workflowDetails.edges))
                        )
                    }
                    onSelectionChange={setNodeIdQuery}
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
        </>
    )
}

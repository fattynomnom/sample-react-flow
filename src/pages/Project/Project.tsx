import {
    Background,
    BackgroundVariant,
    Controls,
    Edge,
    MiniMap,
    Node,
    OnSelectionChangeParams,
    ReactFlow,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges
} from 'reactflow'
import { useEffect, useState } from 'react'
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
import {
    getProjectDetails,
    mapWorkflowsToEdge,
    mapWorkflowsToNode
} from '../../services/ProjectsService'
import { setProjectDetails } from '../../states/projectDetails'

export default function Project() {
    const projectDetails = useAppSelector(state => state.projectDetails)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const { pathname } = useLocation()
    const [searchParams] = useSearchParams()
    const [nodes, setNodes] = useState<Node[]>([])
    const [edges, setEdges] = useState<Edge[]>([])

    const fetchProjectDetails = async () => {
        if (!id) return

        try {
            const result = await getProjectDetails(id)
            dispatch(setProjectDetails(result))
        } catch (error) {
            logError(error)
        }
    }

    useEffect(() => {
        fetchProjectDetails()
    }, [id])

    useEffect(() => {
        const mappedNodes = mapWorkflowsToNode(projectDetails.workflows)
        setNodes(mappedNodes)

        const mappedEdges = mapWorkflowsToEdge(projectDetails.workflows)
        setEdges(mappedEdges)
    }, [projectDetails.workflows])

    return (
        <>
            <h2>{projectDetails.name}</h2>
            <div className="w-full h-full mt-5 bg-slate-800 rounded">
                <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={changes =>
                        setNodes(applyNodeChanges(changes, nodes))
                    }
                    onEdgesChange={changes =>
                        setEdges(applyEdgeChanges(changes, edges))
                    }
                    // onConnect={connection =>
                    //     dispatch(
                    //         setEdges(addEdge(connection, workflowDetails.edges))
                    //     )
                    // }
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

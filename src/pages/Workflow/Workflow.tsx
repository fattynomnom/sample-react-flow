import {
    OnSelectionChangeParams,
    addEdge,
    applyEdgeChanges,
    applyNodeChanges
} from 'reactflow'
import { useEffect } from 'react'
import 'reactflow/dist/style.css'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
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
} from '../../store/states/workflowDetails'
import { logError } from '../../services/LoggingService'
import Workspace from '../../components/Workspace/Workspace'

export default function Workflow() {
    const workflowDetails = useAppSelector(state => state.workflowDetails)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const { pathname } = useLocation()
    const [searchParams] = useSearchParams()

    const setNodeIdQuery = ({ nodes }: OnSelectionChangeParams) => {
        const firstNode = nodes[0]
        if (firstNode) {
            navigate(`${pathname}?node=${firstNode.id}`)
        }
    }

    useEffect(() => {
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

        fetchWorkflowDetails()
    }, [id, dispatch])

    useEffect(() => {
        const displaySelectedNode = () => {
            const nodeId = searchParams.get('node')
            if (nodeId && workflowDetails.nodes.length > 0) {
                dispatch(setSelectedNode({ selected: true, id: nodeId }))
            }
        }

        displaySelectedNode()
    }, [searchParams, workflowDetails.nodes.length, dispatch])

    return (
        <>
            <h2 className="mb-5">{workflowDetails.name}</h2>
            <Workspace
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
            />
        </>
    )
}

import { Edge, Node, applyEdgeChanges, applyNodeChanges } from 'reactflow'
import { useEffect, useState } from 'react'
import 'reactflow/dist/style.css'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { useParams } from 'react-router-dom'
import { logError } from '../../services/LoggingService'
import {
    getProjectDetails,
    mapWorkflowsToEdge,
    mapWorkflowsToNode
} from '../../services/ProjectsService'
import { setProjectDetails } from '../../store/states/projectDetails'
import Workspace from '../../components/Workspace/Workspace'

export default function Project() {
    const projectDetails = useAppSelector(state => state.projectDetails)
    const dispatch = useAppDispatch()
    const { id } = useParams()
    const [nodes, setNodes] = useState<Node[]>([])
    const [edges, setEdges] = useState<Edge[]>([])

    useEffect(() => {
        const fetchProjectDetails = async () => {
            if (!id) return

            try {
                const result = await getProjectDetails(id)
                dispatch(setProjectDetails(result))
            } catch (error) {
                logError(error)
            }
        }

        fetchProjectDetails()
    }, [id, dispatch])

    useEffect(() => {
        const mappedNodes = mapWorkflowsToNode(projectDetails.workflows)
        setNodes(mappedNodes)

        const mappedEdges = mapWorkflowsToEdge(projectDetails.workflows)
        setEdges(mappedEdges)
    }, [projectDetails.workflows])

    return (
        <>
            <h2 className="mb-5">{projectDetails.name}</h2>
            <Workspace
                nodes={nodes}
                edges={edges}
                onNodesChange={changes =>
                    setNodes(applyNodeChanges(changes, nodes))
                }
                onEdgesChange={changes =>
                    setEdges(applyEdgeChanges(changes, edges))
                }
            />
        </>
    )
}

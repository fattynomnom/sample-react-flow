import { Edge, Node } from 'reactflow'
import axiosInstance from '../plugins/axios'
import { Project, ProjectDetails, WorkflowGroupNode } from '../types/Project.d'

export const config = {
    // we need to set a standard size for workflow nodes because we need to calculate
    // the dimensions for the parent node
    workflowNodesStyle: {
        width: 150,
        height: 40,
        xyMargins: 40
    },
    spaceBetweenWorkflows: 100
}

export const getProjects = (): Promise<Project[]> =>
    axiosInstance
        .get<{ projects: Project[] }>('/projects')
        .then(({ data }) => data.projects)

export const getProjectDetails = (id: string): Promise<ProjectDetails> =>
    axiosInstance
        .get<ProjectDetails>(`/projects/${id}`)
        .then(({ data }) => data)

// react-flow has parent nodes and child nodes on a single level
// so we need to flatten the projectDetails.workflows array
export const mapWorkflowsToNode = (
    workflows: ProjectDetails['workflows']
): Node[] => {
    let previousNode: WorkflowGroupNode | undefined = undefined

    return workflows.reduce((acc, workflow) => {
        const parentNodeId = `parent-${workflow.id}`

        const maxY = Math.max(
            ...workflow.nodes.map(
                ({ position }) => position.y + config.workflowNodesStyle.height
            )
        )
        const minY = Math.min(
            ...workflow.nodes.map(({ position }) => position.y)
        )

        const parentNode: WorkflowGroupNode = {
            id: parentNodeId,
            data: {},
            position: {
                // x coordinate should be arranged horizontally after the previous group node
                x: previousNode
                    ? config.spaceBetweenWorkflows + previousNode.style.width
                    : 0,
                y: minY - config.workflowNodesStyle.xyMargins
            },
            style: {
                // parent dimensions should encapsulate all child nodes
                width:
                    config.workflowNodesStyle.xyMargins * 2 +
                    config.workflowNodesStyle.width,
                height: config.workflowNodesStyle.xyMargins * 2 + (maxY - minY)
            }
        }
        previousNode = parentNode

        const childNodes: Node[] = workflow.nodes.map(node => ({
            ...node,
            id: `child-${node.id}`,
            parentNode: parentNodeId,
            position: {
                // keep y position the same but since we are arranging workflows horizontally,
                // we need to reset x position to make it relative to parent node x position
                x: config.workflowNodesStyle.xyMargins,
                y: node.position.y
            },
            style: {
                width: config.workflowNodesStyle.width,
                height: config.workflowNodesStyle.height
            }
        }))

        return [...acc, parentNode, ...childNodes]
    }, [] as Node[])
}

export const mapWorkflowsToEdge = (
    workflows: ProjectDetails['workflows']
): Edge[] => {
    return workflows.reduce((acc, workflow) => {
        return [
            ...acc,
            ...workflow.edges.map(edge => ({
                ...edge,
                source: `child-${edge.source}`,
                target: `child-${edge.target}`
            }))
        ]
    }, [] as Edge[])
}

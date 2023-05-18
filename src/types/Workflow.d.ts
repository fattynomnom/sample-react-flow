import { Edge, Node } from 'reactflow'
import { Project } from './Project.d'

export interface Workflow {
    id: string
    name: string
}

export interface WorkflowDetails extends Workflow {
    nodes: Node[]
    edges: Edge[]
    projects: Project[]
}

import { Node } from 'reactflow'
import { WorkflowDetails } from './Workflow.d'

export interface Project {
    id: string
    name: string
}

export interface ProjectWorkflow extends Exclude<WorkflowDetails, 'projects'> {
    position?: Node['position']
}

export interface ProjectDetails extends Project {
    workflows: Array<Exclude<WorkflowDetails, 'projects'>>
}

export interface WorkflowGroupNode extends Node {
    style: {
        width: number
        height: number
    }
}

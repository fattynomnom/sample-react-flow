import axiosInstance from '../plugins/axios'
import { Workflow, WorkflowDetails } from '../types/Workflow.d'

export const getWorkflows = (): Promise<Workflow[]> =>
    axiosInstance
        .get<{ workflows: Workflow[] }>('/workflows')
        .then(({ data }) => data.workflows)

export const getWorkflowDetails = (id: string): Promise<WorkflowDetails> =>
    axiosInstance
        .get<WorkflowDetails>(`/workflows/${id}`)
        .then(({ data }) => data)

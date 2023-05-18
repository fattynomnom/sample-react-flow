import axiosInstance from '../plugins/axios'
import { Workflow } from '../types/Workflow.d'

export const getWorkflows = (): Promise<Workflow[]> =>
    axiosInstance
        .get<{ workflows: Workflow[] }>('/workflows')
        .then(({ data }) => data.workflows)

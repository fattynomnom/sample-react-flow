import axiosInstance from '../plugins/axios'
import { Project } from '../types/Project'

export const getProjects = (): Promise<Project[]> =>
    axiosInstance
        .get<{ projects: Project[] }>('/projects')
        .then(({ data }) => data.projects)

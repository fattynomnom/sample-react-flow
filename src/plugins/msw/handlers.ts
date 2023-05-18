import { rest } from 'msw'
import ProjectsResponse from './responses/Projects.json'
import WorkflowsResponse from './responses/Workflows.json'
import WorkflowDetails from './responses/WorkflowDetails.json'

const baseUrl = import.meta.env.VITE_REACT_APP_API_PATH

const handlers = [
    rest.get(`${baseUrl}/projects`, (_, response, context) => {
        return response(
            context.status(200),
            context.json({
                projects: ProjectsResponse
            })
        )
    }),
    rest.get(`${baseUrl}/workflows`, (_, response, context) => {
        return response(
            context.status(200),
            context.json({
                workflows: WorkflowsResponse
            })
        )
    }),
    rest.get(`${baseUrl}/workflows/:id`, (_, response, context) => {
        return response(context.status(200), context.json(WorkflowDetails))
    })
]

export default handlers

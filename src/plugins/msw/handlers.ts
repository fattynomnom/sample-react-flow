import { rest } from 'msw'
import ProjectsResponse from './responses/Projects.json'

const baseUrl = import.meta.env.VITE_REACT_APP_API_PATH

const handlers = [
    rest.get(`${baseUrl}/projects`, (_, response, context) => {
        return response(
            context.status(200),
            context.json({
                projects: ProjectsResponse
            })
        )
    })
]

export default handlers

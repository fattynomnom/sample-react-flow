import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { ProjectDetails } from '../types/Project.d'

const initialState: ProjectDetails = {
    id: '',
    name: '',
    workflows: []
}

export const workflowSlice = createSlice({
    name: 'workflow-details',
    initialState,
    reducers: {
        setProjectDetails: (
            state,
            { payload }: PayloadAction<ProjectDetails>
        ) => {
            state.id = payload.id
            state.name = payload.name
            state.workflows = payload.workflows
        }
    }
})

export const { setProjectDetails } = workflowSlice.actions

export const getProjectDetails = (state: RootState) => state.projectDetails

export default workflowSlice.reducer

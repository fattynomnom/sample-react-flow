import { configureStore } from '@reduxjs/toolkit'
import workflowDetailsReducer from './states/workflowDetails'
import projecDetailsReducer from './states/projectDetails'

export const store = configureStore({
    reducer: {
        workflowDetails: workflowDetailsReducer,
        projectDetails: projecDetailsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

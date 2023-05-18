import { configureStore } from '@reduxjs/toolkit'
import workflowDetailsReducer from './states/workflowDetails'

export const store = configureStore({
    reducer: {
        workflowDetails: workflowDetailsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

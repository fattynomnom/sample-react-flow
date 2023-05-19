import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '..'
import { WorkflowDetails } from '../types/Workflow'
import { Edge, Node } from 'reactflow'

const initialState: WorkflowDetails = {
    id: '',
    name: '',
    nodes: [],
    edges: [],
    projects: []
}

export const workflowSlice = createSlice({
    name: 'workflow-details',
    initialState,
    reducers: {
        setWorkflowDetails: (
            state,
            { payload }: PayloadAction<WorkflowDetails>
        ) => {
            state.id = payload.id
            state.name = payload.name
            state.projects = payload.projects
        },
        setNodes: (state, { payload }: PayloadAction<Node[]>) => {
            state.nodes = payload
        },
        setEdges: (state, { payload }: PayloadAction<Edge[]>) => {
            state.edges = payload
        },
        setSelectedNode: (
            state,
            { payload }: PayloadAction<{ selected: boolean; id: string }>
        ) => {
            const nodeIndex = state.nodes.findIndex(
                ({ id }) => id === payload.id
            )
            if (nodeIndex >= 0) {
                // deselecting all other nodes
                state.nodes = state.nodes.map(node => ({
                    ...node,
                    selected: false
                }))
                state.nodes[nodeIndex] = {
                    ...state.nodes[nodeIndex],
                    selected: payload.selected
                }
            }
        },
        addNode: state => {
            const newId = crypto.randomUUID()
            state.nodes = [
                ...state.nodes,
                {
                    id: newId,
                    data: { label: `Node ${newId}` },
                    position: { x: 10, y: 10 }
                }
            ]
        }
    }
})

export const {
    setWorkflowDetails,
    setNodes,
    setEdges,
    setSelectedNode,
    addNode
} = workflowSlice.actions

export const getWorkflowDetails = (state: RootState) => state.workflowDetails

export default workflowSlice.reducer

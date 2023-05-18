import { ArrowLongLeftIcon, PlusCircleIcon } from '@heroicons/react/24/solid'
import SidebarList from '../SidebarList/SidebarList'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import { addNode } from '../../states/workflowDetails'

export default function WorkflowSidebar({ onBack }: { onBack?: () => void }) {
    const workflowDetails = useAppSelector(state => state.workflowDetails)
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const { pathname } = useLocation()

    return (
        <div className="space-y-5">
            <div
                className="flex space-x-4 items-center text-white hover:text-primary cursor-pointer"
                onClick={onBack}
            >
                <ArrowLongLeftIcon className="w-5 h-5" />
                <span>All workflows</span>
            </div>

            <SidebarList
                title="Nodes"
                items={workflowDetails.nodes.map(node => ({
                    id: node.id,
                    name: node.data.label,
                    active: node.id === searchParams.get('node'),
                    onClick: () => navigate(`${pathname}?node=${node.id}`)
                }))}
            />
            <div
                className="flex space-x-4 link"
                onClick={() => dispatch(addNode())}
            >
                <PlusCircleIcon className="w-5 h-5" />
                <span className="font-medium">Add node</span>
            </div>

            <SidebarList
                title="Associated projects"
                items={workflowDetails.projects}
            />
            <div className="flex space-x-4 link">
                <PlusCircleIcon className="w-5 h-5" />
                <span className="font-medium">Add to project</span>
            </div>
        </div>
    )
}

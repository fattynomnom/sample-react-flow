import { ArrowLongLeftIcon, PlusCircleIcon } from '@heroicons/react/24/solid'
import SidebarList from '../SidebarList/SidebarList'
import { Link } from 'react-router-dom'

export default function WorkflowSidebarDetails() {
    const projects = [
        { id: '1', name: 'Project 1', path: '/projects/1' },
        { id: '3', name: 'Project 3', path: '/projects/3' }
    ]

    return (
        <div className="space-y-5">
            <Link
                to="/"
                className="flex space-x-4 items-center text-white hover:text-primary"
            >
                <ArrowLongLeftIcon className="w-5 h-5" />
                <span>All workflows</span>
            </Link>

            <SidebarList title="Associated projects" items={projects} />

            <div className="flex space-x-4 link">
                <PlusCircleIcon className="w-5 h-5" />
                <span className="font-medium">Add to project</span>
            </div>
        </div>
    )
}
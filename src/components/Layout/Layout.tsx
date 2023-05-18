import { useEffect, useState } from 'react'
import Button from '../Button/Button'
import { getProjects } from '../../services/ProjectsService'
import { logError } from '../../services/LoggingService'
import { Project } from '../../types/Project'
import { Workflow } from '../../types/Workflow'
import { getWorkflows } from '../../services/WorkflowsService'
import SidebarList from '../SidebarList/SidebarList'
import WorkflowSidebar from '../WorkflowSidebar/WorkflowSidebar'
import { Outlet, matchPath, useLocation } from 'react-router-dom'
import { NavBar } from '../NavBar/NavBar'
import { NavItem } from '../NavBar/NavBar.d'

export function Layout() {
    const nav: NavItem[] = [{ title: 'Home', path: '/' }]

    const { pathname } = useLocation()

    const [view, setView] = useState<'MAIN' | 'PROJECT' | 'WORKFLOW'>('MAIN')

    const [isActionsOpen, setIsActionsOpen] = useState(false)

    const [isLoadingProjects, setIsLoadingProjects] = useState(false)
    const [projects, setProjects] = useState<Project[]>([])

    const [isLoadingWorkflows, setIsLoadingWorkflows] = useState(false)
    const [workflows, setWorkflows] = useState<Workflow[]>([])

    const fetchProjects = async () => {
        setIsLoadingProjects(true)

        try {
            const result = await getProjects()
            setProjects(result)
        } catch (error) {
            logError(error)
        } finally {
            setIsLoadingProjects(false)
        }
    }

    const fetchWorkflows = async () => {
        setIsLoadingWorkflows(true)

        try {
            const result = await getWorkflows()
            setWorkflows(result)
        } catch (error) {
            logError(error)
        } finally {
            setIsLoadingWorkflows(false)
        }
    }

    useEffect(() => {
        fetchProjects()
        fetchWorkflows()
    }, [])

    useEffect(() => {
        if (matchPath({ path: '/workflows/:id' }, pathname)) {
            setView('WORKFLOW')
        } else {
            setView('MAIN')
        }
    }, [pathname])

    return (
        <>
            <NavBar nav={nav} />
            <main className="max-w-7xl mx-auto h-[calc(100%-60px)]">
                <div className="fixed z-20 inset-0 top-[100px] left-[max(2rem,calc(50%-38rem))] right-auto w-[19.5rem] overflow-y-auto space-y-7">
                    <div>
                        <Button
                            label="Actions"
                            className="w-full"
                            onClick={() => setIsActionsOpen(!isActionsOpen)}
                        />
                        {isActionsOpen && (
                            <ul className="flex flex-col space-y-2 mt-3 rounded-lg border border-slate-800 py-3">
                                <li className="py-1 px-5 link">
                                    Create new project
                                </li>
                                <li className="py-1 px-5 link">
                                    Create new workspace
                                </li>
                            </ul>
                        )}
                    </div>

                    {view === 'MAIN' && (
                        <div className="space-y-5">
                            <SidebarList
                                title="Projects"
                                loading={isLoadingProjects}
                                items={projects.map(project => ({
                                    ...project,
                                    path: `/projects/${project.id}`
                                }))}
                            />

                            <SidebarList
                                title="Workflows"
                                loading={isLoadingWorkflows}
                                items={workflows.map(workflow => ({
                                    ...workflow,
                                    path: `/workflows/${workflow.id}`
                                }))}
                            />
                        </div>
                    )}

                    {view === 'WORKFLOW' && (
                        <WorkflowSidebar onBack={() => setView('MAIN')} />
                    )}
                </div>
                <div className="py-4 pl-[25rem] pt-7 pr-8 h-full">
                    <Outlet />
                </div>
            </main>
        </>
    )
}

import './Home.module.css'
import Button from '../../components/Button/Button'
import { useEffect, useState } from 'react'
import { FolderIcon } from '@heroicons/react/24/solid'
import Spinner from '../../components/Spinner/Spinner'
import { getProjects } from '../../services/ProjectsService'
import { Project } from '../../types/Project'
import { logError } from '../../services/LoggingService'
import { Layout } from '../../components/Layout/Layout'

type Tab = 'PROJECTS' | 'WORKFLOWS'

export default function Home() {
    const [selectedTab, setSelectedTab] = useState<Tab>('PROJECTS')
    const [isLoading, setIsLoading] = useState(false)
    const [projects, setProjects] = useState<Project[]>([])

    const fetchProjects = async () => {
        setIsLoading(true)

        try {
            const result = await getProjects()
            setProjects(result)
        } catch (error) {
            logError(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchProjects()
    }, [])

    return (
        <Layout>
            <div className="flex flex-col h-full">
                <h1>Hello</h1>
                <h2>Manage your workflows and projects here</h2>

                <div className="flex space-x-3 mt-7">
                    <Button
                        label="Projects"
                        preset={
                            selectedTab === 'PROJECTS' ? 'selected' : 'default'
                        }
                        onClick={() => setSelectedTab('PROJECTS')}
                    />
                    <Button
                        label="Workflows"
                        preset={
                            selectedTab === 'WORKFLOWS' ? 'selected' : 'default'
                        }
                        onClick={() => setSelectedTab('WORKFLOWS')}
                    />
                </div>

                <div className="bg-slate-800 rounded-[30px] mt-4 p-5 flex flex-wrap gap-5">
                    {projects.map(project => (
                        <div
                            className="flex flex-col items-center"
                            key={project.id}
                        >
                            <FolderIcon className="w-44 h-44" />
                            <small>{project.name}</small>
                        </div>
                    ))}
                    {isLoading && (
                        <div>
                            <Spinner />
                            <small>Loading data...</small>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    )
}

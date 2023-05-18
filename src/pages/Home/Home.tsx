import './Home.css'
import { Layout } from '../../components/Layout/Layout'

export default function Home() {
    return (
        <Layout viewType="MAIN">
            <div className="flex flex-col h-full">
                <h1>Hello</h1>
                <h2>Start by using the side menu to edit a project</h2>
            </div>
        </Layout>
    )
}

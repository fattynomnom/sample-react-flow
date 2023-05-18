import { Link } from 'react-router-dom'
import Spinner from '../Spinner/Spinner'

export default function SidebarList({
    title,
    items,
    loading = false
}: {
    title: string
    items: { id: string; name: string; path: string }[]
    loading?: boolean
}) {
    return (
        <div>
            <div className="flex space-x-3">
                <div className="font-semibold text-sm text-white mb-3">
                    {title}
                </div>
                {loading && <Spinner />}
            </div>
            <ul className="flex flex-col">
                {items.map(item => (
                    <li
                        key={item.id}
                        className="link border-l border-slate-800 hover:border-primary px-5 py-3"
                    >
                        <Link to={item.path}>{item.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}

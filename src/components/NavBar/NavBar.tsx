import { Link, useLocation, matchPath } from 'react-router-dom'
import './NavBar.module.css'
import { NavItem } from './NavBar.d'

export function NavBar({ nav }: { nav: NavItem[] }) {
    const { pathname } = useLocation()

    const navItemComponent = (navItem: NavItem) => (
        <li
            key={navItem.path}
            className={matchPath(navItem.path, pathname) ? '!text-primary' : ''}
        >
            <Link to={navItem.path}>{navItem.title}</Link>
        </li>
    )

    return (
        <div className="sticky top-0s z-40 w-full border-b border-slate-800">
            <div className="max-w-7xl mx-auto">
                <div className="py-4 px-8 flex items-center justify-between">
                    <h3 className="lowercase">Sample-react-flow</h3>
                    <ul className="flex space-x-5">
                        {nav.map(navItem =>
                            navItem.component
                                ? navItem.component
                                : navItemComponent(navItem)
                        )}
                    </ul>
                </div>
            </div>
        </div>
    )
}

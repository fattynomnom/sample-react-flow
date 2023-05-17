import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import { NavBar } from './components/NavBar/NavBar'
import { NavItem } from './components/NavBar/NavBar.d'

export default function App() {
    const nav: NavItem[] = [{ title: 'Home', path: '/', page: <Home /> }]

    return (
        <Router>
            <NavBar nav={nav} />
            <Routes>
                {nav
                    .filter(({ page }) => !!page)
                    .map(nav => (
                        <Route
                            key={nav.title}
                            path={nav.path}
                            element={nav.page}
                        />
                    ))}
            </Routes>
        </Router>
    )
}

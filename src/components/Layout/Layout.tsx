import { ReactNode } from 'react'
import './Layout.module.css'
import Button from '../Button/Button'

export function Layout({ children }: { children: ReactNode }) {
    return (
        <main className="max-w-7xl mx-auto">
            <div className="fixed z-20 inset-0 top-[100px] left-[max(2rem,calc(50%-38rem))] right-auto w-[19.5rem] overflow-y-auto space-y-7">
                <div>
                    <Button label="Actions" className="w-full" />
                    <ul className="flex flex-col space-y-2 mt-3 rounded-lg border border-slate-800 py-3">
                        <li className="px-5">Create new project</li>
                        <li className="px-5">Create new workspace</li>
                    </ul>
                </div>

                <div>
                    <div className="font-bold text-sm text-white mb-3">
                        Projects
                    </div>
                    <ul className="flex flex-col">
                        <li>Project 1</li>
                        <li>Project 2</li>
                    </ul>
                </div>
            </div>
            <div className="py-4 pl-[25rem] pr-8">{children}</div>
        </main>
    )
}

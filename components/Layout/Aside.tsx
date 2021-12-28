import { useState } from 'react'
import Link from 'next/link'

export default function Aside() {
    const [isShowing, setIsShowing] = useState(true)

    const handleToggleButton = () => {
        setIsShowing(!isShowing)
    }

    return (
        <aside id="sidebar" className={isShowing ? "" : "active"}>
            <div className="custom-menu">
                <button type="button" id="sidebarCollapse" onClick={handleToggleButton} className="btn btn-primary">
                    <i className="fa fa-bars"></i>
                    <span className="sr-only">Toggle Menu</span>
                </button>
            </div>
            <div className="p-4 pt-5">
                <h1><Link href="/"><a href="/" className="logo">Rick and Morty Wiki</a></Link></h1>
                <ul className="list-unstyled components mb-5">
                    <li>
                        <Link href="/"><a>Dashboard</a></Link>
                    </li>
                    <li>
                        <Link href="/personajes"><a>Personajes</a></Link>
                    </li>
                    <li>
                        <Link href="/episodios"><a>Episodios</a></Link>
                    </li>
                    <li>
                        <Link href="/lugares"><a>Lugares</a></Link>
                    </li>
                </ul>

               

            </div>
        </aside>
    )
}

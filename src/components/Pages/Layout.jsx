import { Outlet, Link } from "react-router-dom";
import SW_Logo from '../../assets/Images/HomePageImages/SW_Logo.png'

const Layout = () => {
    return (
        <>
            <nav className="NavBar">
                <ul>
                    <li>
                        <Link to="characters">Characters</Link>
                    </li>
                    <li>
                        <Link to="films">Films</Link>
                    </li>
                    <li>
                        <Link to="planets">Planets</Link>
                    </li>
                    <li>
                        <Link to="/">
                            <img className="HomePageSWLogo" src={SW_Logo}></img>
                        </Link>
                    </li>
                    <li>
                        <Link to="species">Species</Link>
                    </li>
                    <li>
                        <Link to="starships">Starships</Link>
                    </li>
                    <li>
                        <Link to="vehicles">Vehicles</Link>
                    </li>

                </ul>
            </nav>

            <Outlet />
        </>
    )
}

export default Layout;
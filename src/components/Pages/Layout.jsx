import { Outlet, Link, useLocation } from "react-router-dom";
import SW_Logo from '../../assets/Images/HomePageImages/SW_Logo.png'


const Layout = () => {
    const location = useLocation();

    return (
        <>
            <nav className="NavBar">
                <ul>
                    <li id="NavBarCharactersLink" className={location.pathname === '/characters' ? 'NavBarLinkActive' : ''}>
                        <Link to="characters">Characters</Link>
                    </li>
                    <li id="NavBarFilmsLink" className={location.pathname === '/films' ? 'NavBarLinkActive' : ''}>
                        <Link to="films">Films</Link>
                    </li>
                    <li id="NavBarPlanetsLink" className={location.pathname === '/planets' ? 'NavBarLinkActive' : ''}>
                        <Link to="planets">Planets</Link>
                    </li>
                    <li id="NavBarHomeLink">
                        <Link to="/">
                            <img className="HomePageSWLogo" src={SW_Logo}></img>
                        </Link>
                    </li>
                    <li id="NavBarSpeciesLink" className={location.pathname === '/species' ? 'NavBarLinkActive' : ''}>
                        <Link to="species">Species</Link>
                    </li>
                    <li id="NavBarStarshipsLink" className={location.pathname === '/starships' ? 'NavBarLinkActive' : ''}>
                        <Link to="starships">Starships</Link>
                    </li>
                    <li id="NavBarVehiclesLink" className={location.pathname === '/vehicles' ? 'NavBarLinkActive' : ''}>
                        <Link to="vehicles">Vehicles</Link>
                    </li>

                </ul>
            </nav>

            <Outlet />
        </>
    )
}

export default Layout;
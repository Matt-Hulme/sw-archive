import { Outlet, Link } from "react-router-dom";
import SW_Logo from '../../assets/Images/HomePageImages/SW_Logo.png'

const Layout = () => {
    return (
        <>
            <nav className="NavBar">
                <ul>
                    <li id="NavBarCharactersLink">
                        <Link to="characters">Characters</Link>
                    </li>
                    <li id="NavBarFilmsLink">
                        <Link to="films">Films</Link>
                    </li>
                    <li id="NavBarPlanetsLink">
                        <Link to="planets">Planets</Link>
                    </li>
                    <li id="NavBarHomeLink">
                        <Link to="/">
                            <img className="HomePageSWLogo" src={SW_Logo}></img>
                        </Link>
                    </li>
                    <li id="NavBarSpeciesLink">
                        <Link to="species">Species</Link>
                    </li>
                    <li id="NavBarStarshipsLink">
                        <Link to="starships">Starships</Link>
                    </li>
                    <li id="NavBarVehiclesLink">
                        <Link to="vehicles">Vehicles</Link>
                    </li>

                </ul>
            </nav>

            <Outlet />
        </>
    )
}

export default Layout;
import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="HomePage">
      <div className="HomePageContainer">
        <Link to={`/characters`} className="HomePageCharacters">
          Characters
        </Link>
        <Link to={`/films`} className="HomePageFilms">
          Films
        </Link>
        <Link to={`/planets`} className="HomePagePlanets">
          Planets
        </Link>
        <Link to={`/species`}className="HomePageSpecies">
          Species
        </Link>
        <Link to={`/vehicles`} className="HomePageVehicles">
          Vehicles
        </Link>
        <Link to={`/starships`} className="HomePageStarships">
          Starships
        </Link>
      </div>
    </div>
  );
}

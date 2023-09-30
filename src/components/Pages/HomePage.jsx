import React from 'react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="HomePage">
      <div className="HomePageContainer">
        <Link to={`/characters`} className="HomePageCharacters">
          <p>Characters</p>
        </Link>
        <Link to={`/films`} className="HomePageFilms">
          <p>Films</p>
        </Link>
        <Link to={`/planets`} className="HomePagePlanets">
          <p>Planets</p>
        </Link>
        <Link to={`/species`}className="HomePageSpecies">
          <p>Species</p>
        </Link>
        <Link to={`/vehicles`} className="HomePageVehicles">
          <p>Vehicles</p>
        </Link>
        <Link to={`/starships`} className="HomePageStarships">
          <p>Starships</p>
        </Link>
      </div>
    </div>
  );
}

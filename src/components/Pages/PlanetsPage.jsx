import React from 'react';
import NavBar from '../../NavBar.jsx';
import PlanetCardContainer from '../Planet/PlanetCardContainer.jsx'

export default function PlanetsPage() {
  return (
    <div className="PlanetsPage">
        <NavBar />
        <PlanetCardContainer />
    </div>
  );
}

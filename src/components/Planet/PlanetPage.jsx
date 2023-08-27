import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PlanetImageArray from './PlanetImageArray'

export default function PlanetPage() {
    
  const { planetId } = useParams();
  const location = useLocation();

  const planetsData = location.state?.planetsData || [];
  const selectedPlanet = planetsData.find((planet) => planet.id == parseInt(planetId, 10));


 
  if (!selectedPlanet) {
    return <div>Planet not found.</div>;
  }

  const planetImage = PlanetImageArray[selectedPlanet.id - 1];

  return (
    <div className="PlanetPage">
      {planetId !== '28' ? <h2>{selectedPlanet.name}</h2> : null}
      <img className="PlanetPageImage" src={planetImage} alt="Planet" />
    </div>
  );
}


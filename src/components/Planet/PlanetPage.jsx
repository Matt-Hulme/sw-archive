import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import PlanetImageArray from './PlanetImageArray';

export default function PlanetPage() {
  const { planetId } = useParams();
  const location = useLocation();

  const planetsData = location.state?.planetsData || [];
  console.log('planetsData:', planetsData)

  let selectedPlanet = [];
  planetsData.length > 1 ? selectedPlanet = planetsData.find((planet) => planet.id == parseInt(planetId, 10)) : selectedPlanet = planetsData;
  console.log('selectedPlanet:', selectedPlanet)

  if (!selectedPlanet) {
    return <div>Planet not found.</div>
  }

  const planetImage = PlanetImageArray.find((img) => img.id == planetId);
  console.log('planetImage:', planetImage)

  return (
    <div className="PlanetPage">
      {planetId !== '28' ? <h2>{selectedPlanet.name}</h2> : null}
      <img className="PlanetPageImage" src={planetImage.image} alt="Planet" />
    </div>
  );
}


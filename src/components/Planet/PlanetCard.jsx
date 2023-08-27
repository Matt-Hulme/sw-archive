import React from 'react';
import PlanetImageArray from './PlanetImageArray'

export default function PlanetCard({ planet }) {
    return (
      <div className="PlanetCard" style={{ backgroundImage: `url(${PlanetImageArray[planet.id - 1]})` }}>
        <h3>{planet.name}</h3>
      </div>
    );
  }
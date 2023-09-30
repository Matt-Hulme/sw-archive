import React from 'react';
import PlanetImageArray from './PlanetImageArray'

export default function PlanetCard({ planet }) {
  const planetImage = PlanetImageArray.find(img => img.id == planet.id);
    return (
      <div className="PlanetCard" style={{ backgroundImage: `url(${planetImage ? planetImage.image : '/src/assets/images/Image-Not-Found-2.jpg'})` }}>
        <h3 className="PlanetCardName">{planet.name}</h3>
      </div>
    );
  }
import React from 'react';
import SpeciesImageArray from './SpeciesImageArray.jsx'

export default function SpeciesCard ({ specie }) {
  const speciesImage = SpeciesImageArray.find(img => img.id == specie.id);
  console.log('speciesImage:', speciesImage)

    return (
        <div className="SpeciesCard" style={{ backgroundImage: `url(${speciesImage ? speciesImage.image : '/src/assets/images/Image-Not-Found-2.jpg'})` }}>
        <h3>{specie.name}</h3>
      </div>
    );
}
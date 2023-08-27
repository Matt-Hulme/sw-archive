import React from 'react';
import SpeciesImageArray from './SpeciesImageArray.jsx'

export default function SpeciesCard ({ specie }) {
    return (
        <div className="SpeciesCard" style={{ backgroundImage: `url(${SpeciesImageArray[specie.id - 1]})` }}>
        <h3>{specie.name}</h3>
      </div>
    );
}
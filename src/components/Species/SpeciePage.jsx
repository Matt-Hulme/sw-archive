import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import SpeciesImageArray from './SpeciesImageArray'

export default function SpeciePage() {
    
  const { speciesId } = useParams();
  console.log('speciesId:', speciesId)
  const location = useLocation();

  const speciesData = location.state?.speciesData || [];
  console.log('speciesData:', speciesData)
  const selectedSpecie = speciesData.find((specie) => specie.id == parseInt(speciesId, 10));

  console.log("", selectedSpecie)


 
  if (!selectedSpecie) {
    return <div>Species not found.</div>;
  }

  const specieImage = SpeciesImageArray[selectedSpecie.id - 1];

  return (
    <div className="SpeciePage">
      <h2>{selectedSpecie.name}</h2>
      <img className="SpeciesPageImage" src={specieImage} alt="Species" />
    </div>
  );
}


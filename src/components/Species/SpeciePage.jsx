import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import SpeciesImageArray from './SpeciesImageArray'

export default function SpeciePage() {
    
  const { speciesId } = useParams();
  console.log('speciesId:', speciesId)
  const location = useLocation();

  const speciesData = location.state?.speciesData || [];
  console.log('speciesData:', speciesData)

  let selectedSpecie = [];
  speciesData.length > 1 ? selectedSpecie = speciesData.find((specie) => specie.id == parseInt(speciesId, 10)) : selectedSpecie = speciesData;
  console.log("selectedSpecie", selectedSpecie)
 
  if (!selectedSpecie) {
    return <div>Species not found.</div>;
  }

  const speciesImage = SpeciesImageArray.find(img => img.id == speciesId)
  console.log('speciesImage:', speciesImage)

  return (
    <div className="SpeciePage">
      <h2>{selectedSpecie.name}</h2>
      <img className="SpeciesPageImage" src={speciesImage.image} alt="Species" />
    </div>
  );
}


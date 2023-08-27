import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import StarshipImageArray from './StarshipImageArray'

export default function StarshipPage() {
  const { starshipId } = useParams(); 
  const location = useLocation();

  const starshipsData = location.state?.starshipsData || [];
  const selectedStarship = starshipsData.find((starship) => starship.id == parseInt(starshipId, 10));
  console.log('Starships Data:', starshipsData)
  console.log('selectedStarship:', selectedStarship)
 
  if (!selectedStarship) {
    return <div>Starship not found.</div>;
  }

  const starshipArrayId = selectedStarship.arrayid;
  console.log('Array Id:', starshipArrayId)
  const starshipImage = StarshipImageArray[starshipArrayId];

  return (
    <div className="StarshipPage">
      <h2>{selectedStarship.name}</h2>
      <img className="StarshipPageImage" src={starshipImage} alt="Starship" />
    </div>
  );
}


import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import StarshipImageArray from './StarshipImageArray'

export default function StarshipPage() {
  const { starshipId } = useParams(); 
  const location = useLocation();

  const starshipsData = location.state?.starshipsData || [];
  console.log('starshipsData:', starshipsData);



  let selectedStarship = [];
  starshipsData.length > 1 ? selectedStarship = starshipsData.find((starship) => starship.id == parseInt(starshipId, 10)) : selectedStarship = starshipsData;
  console.log('selectedStarship:', selectedStarship)
 
  if (!selectedStarship) {
    return <div>Starship not found.</div>;
  }

  const starshipImage = StarshipImageArray.find(img => img.id == starshipId)

  return (
    <div className="StarshipPage">
      <h2>{selectedStarship.name}</h2>
      <img className="StarshipPageImage" src={starshipImage.image} alt="Starship" />
    </div>
  );
}


import React from 'react';
import NavBar from '../../NavBar.jsx';
import SpeciesCardContainer from '../Species/SpeciesCardContainer.jsx'

export default function SpeciesPage() {
  return (
    <div className="SpeciesPage">
        <NavBar />
        <SpeciesCardContainer />
    </div>
  );
}

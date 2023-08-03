import React from 'react';
import NavBar from '../../NavBar.jsx';
import StarshipsCardContainer from '../Starships/StarshipsCardContainer.jsx'

export default function StarshipsPage() {
  return (
    <div className="StarshipsPage">
        <NavBar />
        <StarshipsCardContainer />
    </div>
  );
}

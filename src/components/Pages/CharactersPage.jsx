import React from 'react';
import NavBar from '../../NavBar.jsx';
import CharacterCardContainer from 'src/Components/Character/CharacterCardContainer.jsx';

export default function CharactersPage() {
  return (
    <div className="CharactersPage">
        <NavBar />
        <CharacterCardContainer />
    </div>
  );
}

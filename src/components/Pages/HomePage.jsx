import React from 'react';
import CharacterCardContainer from 'src/Components/CharacterCardContainer/CharacterCardContainer.jsx';
import NavBar from '../NavBar.jsx';
import 'src/App.css'

export default function HomePage() {
  return (
    <div className="HomePage">
        <NavBar />
        <CharacterCardContainer />
    </div>
  );
}

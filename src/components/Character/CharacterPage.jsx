import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import CharacterImageArray from './CharacterImageArray'

export default function CharacterPage() {
    
  const { characterId } = useParams();
  const location = useLocation();

  const charactersData = location.state?.charactersData || [];
  const selectedCharacter = charactersData.find((character) => character.id == parseInt(characterId, 10));


 
  if (!selectedCharacter) {
    return <div>Character not found.</div>;
  }

  const characterImage = CharacterImageArray[selectedCharacter.id - 1];

  return (
    <div className="CharacterPage">
      <h2>{selectedCharacter.name}</h2>
      <img className="CharacterPageImage" src={characterImage} alt="Character" />
    </div>
  );
}


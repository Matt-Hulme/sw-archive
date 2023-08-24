import React from 'react';
import CharacterImageArray from './CharacterImageArray.jsx'

export default function CharacterCard({ character }) {

  return (
    <div className="CharacterCard">
      <h3>{character.name}</h3>
      <img src={CharacterImageArray[character.id - 1]} alt='Image Not Available' />
    </div>
  );
}

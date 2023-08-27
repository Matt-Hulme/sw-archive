import React from 'react';
import CharacterImageArray from './CharacterImageArray'

export default function CharacterCard({ character }) {

  return (
    <div className="CharacterCard" style={{ backgroundImage: `url(${CharacterImageArray[character.id - 1]}`}}>
      <h3>{character.name}</h3>
    </div>
  );
}

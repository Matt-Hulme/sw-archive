import React from 'react';

export default function CharacterCard({ character }) {
  return (
    <div className="CharacterCard">
      <h3>{character.name}</h3>
      <p>Homeworld: {character.homeworld}</p>
      <p>Birth Year: {character.birth_year}</p>
      <p>First Appearance: {character.films[0]}</p>
    </div>
  );
}

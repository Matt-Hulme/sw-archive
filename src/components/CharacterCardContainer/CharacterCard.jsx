import React from 'react';

export default function CharacterCard({ character }) {
  return (
    <div className="CharacterCard">
      <h3>{character.name}</h3>
    </div>
  );
}

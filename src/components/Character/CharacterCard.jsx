import React from 'react';
import CharacterImageArray from './CharacterImageArray';

export default function CharacterCard({ character }) {
  const characterImage = CharacterImageArray.find(img => img.id == character.id);

  return (
    <div className="CharacterCard" style={{ backgroundImage: `url(${characterImage ? characterImage.image : '/src/assets/images/Image-Not-Found-2.jpg'})` }}>
      <h3 className="CharacterCardName">{character.name}</h3>
    </div>
  );
}

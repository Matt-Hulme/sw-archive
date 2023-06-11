import React, { useState } from 'react';
import CharacterCard from 'src/Components/CharacterCardContainer/CharacterCard.jsx';
import CharacterDataFetcher from 'src/Components/CharacterDataFetcher.jsx';

export default function CharacterCardContainer() {
  const [visibleCharacterCount, setVisibleCharacterCount] = useState(20);

  const handleSeeMore = () => {
    setVisibleCharacterCount((prevCount) => prevCount + 20);
  };

  return (
    <CharacterDataFetcher>
      {(characterData) => (
        <div className="CharacterCardContainer">
          {characterData.slice(0, visibleCharacterCount).map((character, index) => (
            <CharacterCard key={index} character={character} />
          ))}
          {visibleCharacterCount < characterData.length && (
            <button className="SeeMoreButton" onClick={handleSeeMore}>
              See More
            </button>
          )}
        </div>
      )}
    </CharacterDataFetcher>
  );
}

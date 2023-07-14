import React, { useState, useEffect } from 'react';
import CharacterCard from './CharacterCard.jsx';

export default function CharacterCardContainer() {
  const [visibleCharacterCount, setVisibleCharacterCount] = useState(10);
  const [characterData, setCharacterData] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [fetchCount, setFetchCount] = useState(0);

  useEffect(() => {
    const cachedCharacterData = localStorage.getItem('characterData');
    if (cachedCharacterData) {
      const parsedData = JSON.parse(cachedCharacterData);
      setCharacterData(parsedData);
    } else {
      fetchCharacters('https://swapi.dev/api/people/');
    }
  }, []);
  
  const fetchCharacters = async (url) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      const characters = data.results.map((character) => ({
        ...character,
        id: character.url.split("/").slice(0, -1).pop(),
      }));
      const updatedCharacterData = [...characterData, ...characters];
      console.log("Updated character data:", updatedCharacterData);
      setCharacterData(updatedCharacterData);
      setNextUrl(data.next);
  
      localStorage.setItem('characterData', JSON.stringify(updatedCharacterData));
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
  };
  
  
  const handleSeeMoreAndFetchMore = () => {
    setFetchCount(0);
    handleSeeMore();
    handleFetchMore();
  };

  const handleSeeMore = () => {
    setVisibleCharacterCount((prevCount) => prevCount + 10);
    console.log("VisibleChar Count:", visibleCharacterCount);
  };

  const handleFetchMore = () => {
    if (nextUrl && fetchCount === 0) {
      fetchCharacters(nextUrl);
      setFetchCount(1);
    }
  };


  return (
    <>
      <div className="CharacterCardContainer">
        {characterData
          .slice(0, visibleCharacterCount)
          .map((character, index) => (
            <CharacterCard key={index} character={character} />
          ))}
      </div>
      {visibleCharacterCount > 0 && visibleCharacterCount < 82 && (
        <button className="SeeMoreButton" onClick={handleSeeMoreAndFetchMore}>
          See More
        </button>
      )}
    </>
  );
}

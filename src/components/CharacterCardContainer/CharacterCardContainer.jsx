import React, { useState, useEffect } from 'react';
import CharacterCard from './CharacterCard.jsx';

export default function CharacterCardContainer() {
  const [visibleCharacterCount, setVisibleCharacterCount] = useState(10);
  const [characterData, setCharacterData] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [fetchCount, setFetchCount] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  const [buttonText, setButtonText] = useState("See More");

  useEffect(() => {
    const cachedCharacterData = localStorage.getItem('characterData');
    if (cachedCharacterData) {
      const parsedData = JSON.parse(cachedCharacterData);
      setCharacterData(parsedData);
    } else {
      handleFetchMore('https://swapi.dev/api/people/');
    }
  }, []);
  

  const fetchCharacters = async (url) => {
    setButtonText("Loading...");
    try {
      const response = await fetch(url);
      const data = await response.json();
      const characters = data.results.map((character) => ({
        name: character.name,
        id: character.url.split("/").slice(0, -1).pop(),
      }));
      const updatedCharacterData = [...characterData, ...characters];
      console.log("Updated character data:", updatedCharacterData);
      setCharacterData(updatedCharacterData);
      setNextUrl(data.next);
      setFetchCount(0);

      localStorage.setItem('characterData', JSON.stringify(updatedCharacterData));
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
    setIsDataLoaded(true);
    setButtonText("See More");
  };

  const handleSeeMoreAndFetchMore = () => {
    handleSeeMore();
    handleFetchMore();
  };

  const handleSeeMore = () => {
    setVisibleCharacterCount((prevCount) => prevCount + 10);
    console.log("VisibleChar Count:", visibleCharacterCount);
  };

  const handleFetchMore = (initialUrl) => {
    if ((nextUrl || initialUrl) && fetchCount === 0) {
      fetchCharacters(nextUrl || initialUrl);
      setFetchCount(1);
      initialUrl=null;
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
      {isDataLoaded && visibleCharacterCount > 0 && visibleCharacterCount < 82 && (
        <button className="SeeMoreButton" onClick={handleSeeMoreAndFetchMore}>
          {buttonText}
        </button>
      )}
    </>
  );
}

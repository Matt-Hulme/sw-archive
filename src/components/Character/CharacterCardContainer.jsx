import React, { useState, useEffect } from 'react';
import CharacterCard from './CharacterCard.jsx';

export default function CharacterCardContainer() {
  const [visibleCharacterCount, setVisibleCharacterCount] = useState(10);
  const [charactersData, setcharactersData] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [fetchCount, setFetchCount] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  const [buttonText, setButtonText] = useState("See More");

  useEffect(() => {
    const cachedCharactersData = localStorage.getItem('charactersData');
    if (cachedCharactersData) {
      const parsedData = JSON.parse(cachedCharactersData);
      setcharactersData(parsedData);
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
      const updatedCharactersData = [...charactersData, ...characters];
      console.log("Updated characters data:", updatedCharactersData);
      setcharactersData(updatedCharactersData);
      setNextUrl(data.next);
      setFetchCount(0);

      localStorage.setItem('charactersData', JSON.stringify(updatedCharactersData));
    } catch (error) {
      console.error('Error fetching characters:', error);
    }
    setIsDataLoaded(true);
    setButtonText("See More");
    console.log(charactersData);
  };

  const handleSeeMoreAndFetchMore = () => {
    handleSeeMore();
    handleFetchMore();
  };

  const handleSeeMore = () => {
    if (fetchCount === 0){
      setFetchCount(1);
      setVisibleCharacterCount((prevCount) => prevCount + 10);
      console.log("VisibleChar Count:", visibleCharacterCount);
    }

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
        {charactersData
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

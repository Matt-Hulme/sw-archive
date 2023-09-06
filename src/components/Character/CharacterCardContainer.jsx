import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CharacterCard from './CharacterCard.jsx';

export default function CharacterCardContainer() {
  const [visibleCharacterCount, setVisibleCharacterCount] = useState(10);
  const [charactersData, setCharactersData] = useState([]);
  const [nextCharactersUrl, setNextCharactersUrl] = useState(null);
  const [fetchCount, setFetchCount] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  const [buttonText, setButtonText] = useState("See More");


  const navigate = useNavigate();

  useEffect(() => {
    const cachedCharactersData = localStorage.getItem('charactersData');
    if (cachedCharactersData) {
      const parsedData = JSON.parse(cachedCharactersData);
      setCharactersData(parsedData);

      const cachedVisibleCharacterCount = localStorage.getItem('visibleCharacterCount');
      if (cachedVisibleCharacterCount) {
        setVisibleCharacterCount(parseInt(cachedVisibleCharacterCount, 10));
      }

      const cachedNextCharactersUrl = localStorage.getItem('nextCharactersUrl');
      if (cachedNextCharactersUrl) {
        setNextCharactersUrl(cachedNextCharactersUrl);
      }
    } else {
      handleFetchMore('https://swapi.dev/api/people/');
    }
  
    if (navigate.state && navigate.state.visibleCharacterCount) {
      setVisibleCharacterCount(navigate.state.visibleCharacterCount);
      setFetchCount(0); 
    }
  
  }, [navigate, visibleCharacterCount]);
  

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
      setCharactersData(updatedCharactersData);
      setNextCharactersUrl(data.next);
      setFetchCount(0);

      localStorage.setItem('charactersData', JSON.stringify(updatedCharactersData));
      localStorage.setItem('nextCharactersUrl', data.next);
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
    console.log('See More fetchCount value:', fetchCount)
    console.log('nextCharactersUrl value:', nextCharactersUrl)
    if (fetchCount === 0) {
      setFetchCount(1);
      setVisibleCharacterCount((prevCount) => {
        const newCount = prevCount + 10;
        localStorage.setItem('visibleCharacterCount', newCount);
        return newCount;
      });
    }
  };

  const handleFetchMore = (initialUrl) => {
    if ((nextCharactersUrl || initialUrl) && fetchCount === 0) {
      fetchCharacters(nextCharactersUrl || initialUrl);
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
            <Link
            key={index}
            to={`/characters/${character.id}`}
            state={{ charactersData }}
            >
            <CharacterCard key={index} character={character} />
          </Link>
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

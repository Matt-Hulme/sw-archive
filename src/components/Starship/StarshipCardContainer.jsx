import React, { useState, useEffect } from 'react';
import StarshipCard from './StarshipCard.jsx'

export default function StarshipCardContainer() {
  const [visibleStarshipCount, setVisibleStarshipCount] = useState(10);
  const [starshipsData, setStarshipsData] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [fetchCount, setFetchCount] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  const [buttonText, setButtonText] = useState("See More");
  const [idCounter, setIdCounter] = useState(1);

  useEffect(() => {
    const cachedStarshipsData = localStorage.getItem('starshipsData');
    if (cachedStarshipsData) {
      const parsedData = JSON.parse(cachedStarshipsData);
      setStarshipsData(parsedData);
    } else {
      handleFetchMore('https://swapi.dev/api/starships/');
    }
  }, []);
  

  const fetchStarships = async (url) => {
    setButtonText("Loading...");
    try {
      console.log(idCounter)
      const response = await fetch(url);
      const data = await response.json();
      const starships = data.results.map((starship, index) => ({
        name: starship.name,
        id: idCounter + index,
      }));
    
      const updatedStarshipsData = [...starshipsData, ...starships];
      setIdCounter(updatedStarshipsData.length + 1);
      console.log("Updated Starships data:", updatedStarshipsData);
      setStarshipsData(updatedStarshipsData);
      setNextUrl(data.next);
      setFetchCount(0);
  
      localStorage.setItem('starshipsData', JSON.stringify(updatedStarshipsData));
    } catch (error) {
      console.error('Error fetching Starships:', error);
    }
    setIsDataLoaded(true);
    setButtonText("See More");
    console.log(starshipsData);
  };
  

  const handleSeeMoreAndFetchMore = () => {
    handleSeeMore();
    handleFetchMore();
  };

  const handleSeeMore = () => {
    if (fetchCount === 0){
      setFetchCount(1);
      setVisibleStarshipCount((prevCount) => prevCount + 10);
      console.log("Visible Starship Count:", visibleStarshipCount);
    }

  };

  const handleFetchMore = (initialUrl) => {
    if ((nextUrl || initialUrl) && fetchCount === 0) {
      fetchStarships(nextUrl || initialUrl);
      setFetchCount(1);
      initialUrl=null;
    }
  };

  return (
    <>
      <div className="StarshipCardContainer">
        {starshipsData
          .slice(0, visibleStarshipCount)
          .map((starship, index) => (
            <StarshipCard key={index} starship={starship} />
          ))}
      </div>
      {isDataLoaded && visibleStarshipCount > 0 && visibleStarshipCount < 36 && (
        <button className="SeeMoreButton" onClick={handleSeeMoreAndFetchMore}>
          {buttonText}
        </button>
      )}
    </>
  );
}

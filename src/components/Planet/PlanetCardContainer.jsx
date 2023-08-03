import React, { useState, useEffect } from 'react';
import PlanetCard from './PlanetCard.jsx';

export default function CharacterCardContainer() {
  const [visiblePlanetCount, setVisiblePlanetCount] = useState(10);
  const [planetsData, setplanetsData] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [fetchCount, setFetchCount] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  const [buttonText, setButtonText] = useState("See More");

  useEffect(() => {
    const cachedPlanetsData = localStorage.getItem('planetsData');
    if (cachedPlanetsData) {
      const parsedData = JSON.parse(cachedPlanetsData);
      setplanetsData(parsedData);
    } else {
      handleFetchMore('https://swapi.dev/api/planets/');
    }
  }, []);
  

  const fetchPlanets = async (url) => {
    setButtonText("Loading...");
    try {
      const response = await fetch(url);
      const data = await response.json();
      const planets = data.results.map((planet) => ({
        name: planet.name,
        id: planet.url.split("/").slice(0, -1).pop(),
      }));
      const updatedPlanetsData = [...planetsData, ...planets];
      console.log("Updated planets data:", updatedPlanetsData);
      setplanetsData(updatedPlanetsData);
      setNextUrl(data.next);
      setFetchCount(0);

      localStorage.setItem('planetsData', JSON.stringify(updatedPlanetsData));
    } catch (error) {
      console.error('Error fetching planets:', error);
    }
    setIsDataLoaded(true);
    setButtonText("See More");
    console.log(planetsData);
  };

  const handleSeeMoreAndFetchMore = () => {
    handleSeeMore();
    handleFetchMore();
  };

  const handleSeeMore = () => {
    if (fetchCount === 0){
      setFetchCount(1);
      setVisiblePlanetCount((prevCount) => prevCount + 10);
      console.log("VisibleChar Count:", visiblePlanetCount);
    }

  };

  const handleFetchMore = (initialUrl) => {
    if ((nextUrl || initialUrl) && fetchCount === 0) {
      fetchPlanets(nextUrl || initialUrl);
      setFetchCount(1);
      initialUrl=null;
    }
  };

  return (
    <>
      <div className="PlanetCardContainer">
        {planetsData
          .slice(0, visiblePlanetCount)
          .map((planet, index) => (
            <PlanetCard key={index} planet={planet} />
          ))}
      </div>
      {isDataLoaded && visiblePlanetCount > 0 && visiblePlanetCount < 82 && (
        <button className="SeeMoreButton" onClick={handleSeeMoreAndFetchMore}>
          {buttonText}
        </button>
      )}
    </>
  );
}

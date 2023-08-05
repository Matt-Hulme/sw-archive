import React, { useState, useEffect } from 'react';
import SpeciesCard from './SpeciesCard.jsx'

export default function SpeciesCardContainer() {
  const [visibleSpeciesCount, setVisibleSpeciesCount] = useState(10);
  const [speciesData, setSpeciesData] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [fetchCount, setFetchCount] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  const [buttonText, setButtonText] = useState("See More");

  useEffect(() => {
    const cachedSpeciesData = localStorage.getItem('speciesData');
    if (cachedSpeciesData) {
      const parsedData = JSON.parse(cachedSpeciesData);
      setSpeciesData(parsedData);
    } else {
      handleFetchMore('https://swapi.dev/api/species/');
    }
  }, []);
  

  const fetchSpecies = async (url) => {
    setButtonText("Loading...");
    try {
      const response = await fetch(url);
      const data = await response.json();
      const species = data.results.map((specie) => ({
        name: specie.name,
        id: specie.url.split("/").slice(0, -1).pop(),
      }));
      const updatedSpeciesData = [...speciesData, ...species];
      console.log("Updated species data:", updatedSpeciesData);
      setSpeciesData(updatedSpeciesData);
      setNextUrl(data.next);
      setFetchCount(0);

      localStorage.setItem('speciesData', JSON.stringify(updatedSpeciesData));
    } catch (error) {
      console.error('Error fetching species:', error);
    }
    setIsDataLoaded(true);
    setButtonText("See More");
    console.log(speciesData);
  };

  const handleSeeMoreAndFetchMore = () => {
    handleSeeMore();
    handleFetchMore();
  };

  const handleSeeMore = () => {
    if (fetchCount === 0){
      setFetchCount(1);
      setVisibleSpeciesCount((prevCount) => prevCount + 10);
      console.log("Visible Species Count:", visibleSpeciesCount);
    }

  };

  const handleFetchMore = (initialUrl) => {
    if ((nextUrl || initialUrl) && fetchCount === 0) {
      fetchSpecies(nextUrl || initialUrl);
      setFetchCount(1);
      initialUrl=null;
    }
  };

  return (
    <>
      <div className="SpeciesCardContainer">
        {speciesData
          .slice(0, visibleSpeciesCount)
          .map((specie, index) => (
            <SpeciesCard key={index} specie={specie} />
          ))}
      </div>
      {isDataLoaded && visibleSpeciesCount > 0 && visibleSpeciesCount < 37 && (
        <button className="SeeMoreButton" onClick={handleSeeMoreAndFetchMore}>
          {buttonText}
        </button>
      )}
    </>
  );
}

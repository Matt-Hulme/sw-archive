import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import SpeciesCard from './SpeciesCard.jsx'

export default function SpeciesCardContainer() {
  const [visibleSpeciesCount, setVisibleSpeciesCount] = useState(10);
  const [speciesData, setSpeciesData] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [fetchCount, setFetchCount] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  const [buttonText, setButtonText] = useState("See More");

  const navigate = useNavigate();

  console.log('Species Load fetchCount:', fetchCount)

  useEffect(() => {
    const cachedSpeciesData = localStorage.getItem('speciesData');
    if (cachedSpeciesData) {
      const parsedData = JSON.parse(cachedSpeciesData);
      setSpeciesData(parsedData);

      const cachedVisibleSpeciesCount = localStorage.getItem('visibleSpeciesCount');
      if (cachedVisibleSpeciesCount) {
        setVisibleSpeciesCount(parseInt(cachedVisibleSpeciesCount, 10));
      }

      const cachedNextUrl = localStorage.getItem('nextUrl');
      if (cachedNextUrl) {
        setNextUrl(cachedNextUrl);
      }
    } else {
      handleFetchMore('https://swapi.dev/api/species/');
    }
  
    if (navigate.state && navigate.state.visibleSpeciesCount) {
      setVisibleSpeciesCount(navigate.state.visibleSpeciesCount);
      setFetchCount(0); 
    }
  
  }, [navigate, visibleSpeciesCount]);
  

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
      localStorage.setItem('nextUrl', data.next);
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
      setVisibleSpeciesCount((prevCount) => {
        const newCount = prevCount + 10;
        localStorage.setItem('visibleSpeciesCount', newCount);
        return newCount;
      });
    }

  };

  const handleFetchMore = (initialUrl) => {
    console.log('fetchCount:', fetchCount)
    console.log(nextUrl)
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
              <Link
              key={index}
              to={`/species/${specie.id}`}
              state={{ speciesData }}
              >
              <SpeciesCard key={index} specie={specie} />
            </Link>
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

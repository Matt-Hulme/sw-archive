import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import PlanetCard from './PlanetCard.jsx';

export default function PlanetCardContainer() {
  const [visiblePlanetCount, setVisiblePlanetCount] = useState(10);
  const [planetsData, setPlanetsData] = useState([]);
  const [nextPlanetsUrl, setNextPlanetsUrl] = useState(null);
  const [fetchCount, setFetchCount] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  const [buttonText, setButtonText] = useState("See More");

  const navigate = useNavigate();

  useEffect(() => {
    const cachedPlanetsData = localStorage.getItem('planetsData');
    if (cachedPlanetsData) {
      const parsedData = JSON.parse(cachedPlanetsData);
      setPlanetsData(parsedData);
      console.log('CACHE VALUE DATA:', parsedData)

      const cachedVisiblePlanetCount = localStorage.getItem('visiblePlanetCount');
      if (cachedVisiblePlanetCount) {
        setVisiblePlanetCount(parseInt(cachedVisiblePlanetCount, 10));
      }

      const cachedNextPlanetsUrl = localStorage.getItem('nextPlanetsUrl');
      if (cachedNextPlanetsUrl) {
        setNextPlanetsUrl(cachedNextPlanetsUrl);
        console.log('CACHE VALUE URL:', nextPlanetsUrl);
      }
    } else {
      handleFetchMore('https://swapi.dev/api/planets/');
    }
  
    if (navigate.state && navigate.state.visiblePlanetCount) {
      setVisiblePlanetCount(navigate.state.visiblePlanetCount);
      setFetchCount(0); 
    }
  
  }, [navigate, visiblePlanetCount]);
  
  

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
      setPlanetsData(updatedPlanetsData);
      setNextPlanetsUrl(data.next);
      setFetchCount(0);

      localStorage.setItem('planetsData', JSON.stringify(updatedPlanetsData));
      localStorage.setItem('nextPlanetsUrl', data.next);
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
    console.log('See More fetchCount value:', fetchCount)
    console.log('nextPlanetsUrl value:', nextPlanetsUrl)
    if (fetchCount === 0) {
      setFetchCount(1);
      setVisiblePlanetCount((prevCount) => {
        const newCount = prevCount + 10;
        localStorage.setItem('visiblePlanetCount', newCount);
        return newCount;
      });
    }
  };

  const handleFetchMore = (initialUrl) => {
    if ((nextPlanetsUrl || initialUrl) && fetchCount === 0) {
      fetchPlanets(nextPlanetsUrl || initialUrl);
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
            <Link
            key={index}
            to={`/planets/${planet.id}`}
            state={{ planetsData }}
            >
            <PlanetCard key={index} planet={planet} />
          </Link>
          ))}
      </div>
      {isDataLoaded && visiblePlanetCount > 0 && visiblePlanetCount < 60 && (
        <button className="SeeMoreButton" onClick={handleSeeMoreAndFetchMore}>
          {buttonText}
        </button>
      )}
    </>
  );
}


import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import StarshipCard from './StarshipCard.jsx'

export default function StarshipCardContainer() {
  const [visibleStarshipCount, setVisibleStarshipCount] = useState(10);
  const [starshipsData, setStarshipsData] = useState([]);
  const [nextStarshipsUrl, setNextStarshipsUrl] = useState(null);
  const [fetchCount, setFetchCount] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  const [buttonText, setButtonText] = useState("See More");
  
  const navigate = useNavigate();

  useEffect(() => {
    const cachedStarshipsData = localStorage.getItem('starshipsData');
    if (cachedStarshipsData) {
      const parsedData = JSON.parse(cachedStarshipsData);
      setStarshipsData(parsedData);
      console.log('starshipData Cache:', starshipsData)

      const cachedVisibleStarshipCount = localStorage.getItem('visibleStarshipCount');

      if (cachedVisibleStarshipCount) {
        setVisibleStarshipCount(parseInt(cachedVisibleStarshipCount, 10));
      }

      const cachedNextStarshipsUrl = localStorage.getItem('nextStarshipsUrl');
      console.log('CACHED URL:', cachedNextStarshipsUrl)
      if (cachedNextStarshipsUrl) {
        setNextStarshipsUrl(cachedNextStarshipsUrl);
      }
    } else {
      handleFetchMore('https://swapi.dev/api/starships/');
    }
  
    if (navigate.state && navigate.state.visibleStarshipCount) {
      setVisibleStarshipCount(navigate.state.visibleStarshipCount);
      setFetchCount(0); 
    }
  
  }, [navigate, visibleStarshipCount. starshipsData]);
  

  const fetchStarships = async (url) => {
    setButtonText("Loading...");
    try {
      const response = await fetch(url);
      const data = await response.json();

      const starships = data.results.map((starship, index) => ({
        name: starship.name,
        id: starship.url.split("/").slice(0, -1).pop(),
      }));
      const updatedStarshipsData = [...starshipsData, ...starships];
      setStarshipsData(updatedStarshipsData);
      setNextStarshipsUrl(data.next);
      setFetchCount(0);

      localStorage.setItem('starshipsData', JSON.stringify(updatedStarshipsData));
      localStorage.setItem('nextStarshipsUrl', data.next);
    } catch (error) {
      console.error('Error fetching starships:', error);
    }
    setIsDataLoaded(true);
    setButtonText("See More");
    console.log('starshipsData:', starshipsData);
    
  };

  const handleSeeMoreAndFetchMore = () => {
    console.log('starshipsData:', starshipsData)
    handleSeeMore();
    handleFetchMore();
  };

  const handleSeeMore = () => {
    console.log('See More fetchCount value:', fetchCount)
    console.log('nextStarshipsUrl value:', nextStarshipsUrl)
    if (fetchCount === 0) {
      setFetchCount(1);
      setVisibleStarshipCount((prevCount) => {
        const newCount = prevCount + 10;
        localStorage.setItem('visibleStarshipCount', newCount);
        return newCount;
      });
    }
  };

  const handleFetchMore = (initialUrl) => {
    if ((nextStarshipsUrl || initialUrl) && fetchCount === 0) {
      fetchStarships(nextStarshipsUrl || initialUrl);
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
            <Link
            key={index}
            to={`/starships/${starship.id}`}
            state={{ starshipsData }}
            >
            <StarshipCard key={index} starship={starship} index={index}/>
          </Link>
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

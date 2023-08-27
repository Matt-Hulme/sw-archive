import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import StarshipCard from './StarshipCard.jsx'

export default function StarshipCardContainer() {
  const [visibleStarshipCount, setVisibleStarshipCount] = useState(10);
  const [starshipArrayId, setStarshipArrayId] = useState (0);
  const [starshipsData, setStarshipsData] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [fetchCount, setFetchCount] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  const [buttonText, setButtonText] = useState("See More");
  
  const navigate = useNavigate();

  useEffect(() => {
    const cachedStarshipsData = localStorage.getItem('starshipsData');
    if (cachedStarshipsData) {
      const parsedData = JSON.parse(cachedStarshipsData);
      setStarshipsData(parsedData);

      const cachedVisibleStarshipCount = localStorage.getItem('visibleStarshipCount');
      if (cachedVisibleStarshipCount) {
        setVisibleStarshipCount(parseInt(cachedVisibleStarshipCount, 10));
      }

      const cachedNextUrl = localStorage.getItem('nextUrl');
      if (cachedNextUrl) {
        setNextUrl(cachedNextUrl);
      }
    } else {
      handleFetchMore('https://swapi.dev/api/starships/');
    }

    const maxArrayId = starshipsData.reduce(
      (maxId, starship) => Math.max(maxId, starship.arrayid),
      starshipArrayId // Initialize with the current value of starshipArrayId
    );
    setStarshipArrayId(maxArrayId); // Update starshipArrayId
  
    if (navigate.state && navigate.state.visibleStarshipCount) {
      setVisibleStarshipCount(navigate.state.visibleStarshipCount);
      setFetchCount(0); 
    }
  
  }, [navigate, visibleStarshipCount. starshipsData, starshipArrayId]);
  

  const fetchStarships = async (url) => {
    setButtonText("Loading...");
    try {
      const response = await fetch(url);
      const data = await response.json();
      let maxArrayId = starshipsData.reduce(
        (maxId, starship) => Math.max(maxId, starship.arrayid),
        0
      )
      maxArrayId > 8 ? maxArrayId = maxArrayId + 1 : maxArrayId;
      const starships = data.results.map((starship, index) => ({
        name: starship.name,
        id: starship.url.split("/").slice(0, -1).pop(),
        arrayid: maxArrayId + index // Calculate arrayid based on maxArrayId
      }));
      const updatedStarshipsData = [...starshipsData, ...starships];
      console.log("Updated starships data:", updatedStarshipsData);
      setStarshipsData(updatedStarshipsData);
      setNextUrl(data.next);
      setFetchCount(0);

      localStorage.setItem('starshipsData', JSON.stringify(updatedStarshipsData));
      localStorage.setItem('nextUrl', data.next);
    } catch (error) {
      console.error('Error fetching starships:', error);
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
    console.log('See More fetchCount value:', fetchCount)
    console.log('nextUrl value:', nextUrl)
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

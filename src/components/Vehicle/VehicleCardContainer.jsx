import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import VehicleCard from './VehicleCard.jsx'

export default function VehicleCardContainer() {
  const [visibleVehicleCount, setVisibleVehicleCount] = useState(10);
  const [vehiclesData, setVehiclesData] = useState([]);
  const [nextVehiclesUrl, setNextVehiclesUrl] = useState(null);
  const [fetchCount, setFetchCount] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [buttonText, setButtonText] = useState("See More");
  
  const navigate = useNavigate();

  useEffect(() => {
    const cachedVehiclesData = localStorage.getItem('vehiclesData');
    if (cachedVehiclesData) {
      const parsedData = JSON.parse(cachedVehiclesData);
      setVehiclesData(parsedData);
      setIsDataLoaded(true);

      const cachedVisibleVehicleCount = localStorage.getItem('visibleVehicleCount');
      if (cachedVisibleVehicleCount) {
        setVisibleVehicleCount(parseInt(cachedVisibleVehicleCount, 10));
      }

      const cachedNextVehiclesUrl = localStorage.getItem('nextVehiclesUrl');
      if (cachedNextVehiclesUrl) {
        setNextVehiclesUrl(cachedNextVehiclesUrl);
      }
    } else {
      handleFetchMore('https://swapi.dev/api/vehicles/');
    }
  
    if (navigate.state && navigate.state.visibleVehicleCount) {
      setVisibleVehicleCount(navigate.state.visibleVehicleCount);
      setFetchCount(0); 
    }
  
  }, [navigate, visibleVehicleCount. vehiclesData, isDataLoaded]);
  

  const fetchVehicles = async (url) => {
    setButtonText("Loading...");
    try {
      const response = await fetch(url);
      const data = await response.json();
      const vehicles = data.results.map((vehicle, index) => ({
        name: vehicle.name,
        id: vehicle.url.split("/").slice(0, -1).pop(),
      }));
      const updatedVehiclesData = [...vehiclesData, ...vehicles];
      console.log("Updated vehicles data:", updatedVehiclesData);
      setVehiclesData(updatedVehiclesData);
      setNextVehiclesUrl(data.next);
      setFetchCount(0);

      localStorage.setItem('vehiclesData', JSON.stringify(updatedVehiclesData));
      localStorage.setItem('nextVehiclesUrl', data.next);
    } catch (error) {
      console.error('Error fetching vehicles:', error);
    }
    setIsDataLoaded(true);
    setButtonText("See More");
    console.log(vehiclesData);
    
  };

  const handleSeeMoreAndFetchMore = () => {
    handleSeeMore();
    handleFetchMore();
  };

  const handleSeeMore = () => {
    console.log('See More fetchCount value:', fetchCount)
    console.log('nextVehiclesUrl value:', nextVehiclesUrl)
    if (fetchCount === 0) {
      setFetchCount(1);
      setVisibleVehicleCount((prevCount) => {
        const newCount = prevCount + 10;
        localStorage.setItem('visibleVehicleCount', newCount);
        return newCount;
      });
    }
  };

  const handleFetchMore = (initialUrl) => {
    if ((nextVehiclesUrl || initialUrl) && fetchCount === 0) {
      fetchVehicles(nextVehiclesUrl || initialUrl);
      setFetchCount(1);
      initialUrl=null;
    }
  };
  
  
  if (!isDataLoaded) {
    return (
      <>
        <div className="LoadingPanel">
            <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
      </>
    );
  }


  return (
    <>
      <div className="VehicleCardContainer">
        {vehiclesData
          .slice(0, visibleVehicleCount)
          .map((vehicle, index) => (
            <Link
            key={index}
            to={`/vehicles/${vehicle.id}`}
            state={{ vehiclesData }}
            >
            <VehicleCard key={index} vehicle={vehicle} index={index}/>
          </Link>
          ))}
      </div>
      {isDataLoaded && visibleVehicleCount > 0 && visibleVehicleCount < 39 && (
        <button className="SeeMoreButton" onClick={handleSeeMoreAndFetchMore}>
          {buttonText}
        </button>
      )}
    </>
  );
}

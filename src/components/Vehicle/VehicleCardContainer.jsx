import React, { useState, useEffect } from 'react';
import VehicleCard from './VehicleCard.jsx'

export default function StarshipCardContainer() {
  const [visibleVehicleCount, setVisibleVehicleCount] = useState(10);
  const [vehiclesData, setVehiclesData] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [fetchCount, setFetchCount] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  const [buttonText, setButtonText] = useState("See More");
  const [idCounter, setIdCounter] = useState(1);

  useEffect(() => {
    const cachedVehiclesData = localStorage.getItem('vehiclesData');
    if (cachedVehiclesData) {
      const parsedData = JSON.parse(cachedVehiclesData);
      setVehiclesData(parsedData);
    } else {
      handleFetchMore('https://swapi.dev/api/vehicles/');
    }
  }, []);
  

  const fetchVehicles = async (url) => {
    setButtonText("Loading...");
    try {
      console.log(idCounter)
      const response = await fetch(url);
      const data = await response.json();
      const vehicles = data.results.map((vehicle, index) => ({
        name: vehicle.name,
        id: idCounter + index,
      }));
    
      const updatedVehiclesData = [...vehiclesData, ...vehicles];
      setIdCounter(updatedVehiclesData.length + 1);
      console.log("Updated Vehicles data:", updatedVehiclesData);
      setVehiclesData(updatedVehiclesData);
      setNextUrl(data.next);
      setFetchCount(0);
  
      localStorage.setItem('vehiclesData', JSON.stringify(updatedVehiclesData));
    } catch (error) {
      console.error('Error fetching Vehicles:', error);
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
    if (fetchCount === 0){
      setFetchCount(1);
      setVisibleVehicleCount((prevCount) => prevCount + 10);
      console.log("Visible Vehicle Count:", visibleVehicleCount);
    }

  };

  const handleFetchMore = (initialUrl) => {
    if ((nextUrl || initialUrl) && fetchCount === 0) {
      fetchVehicles(nextUrl || initialUrl);
      setFetchCount(1);
      initialUrl=null;
    }
  };

  return (
    <>
      <div className="VehicleCardContainer">
        {vehiclesData
          .slice(0, visibleVehicleCount)
          .map((vehicle, index) => (
            <VehicleCard key={index} vehicle={vehicle} />
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

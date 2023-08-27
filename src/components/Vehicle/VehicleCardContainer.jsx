import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import VehicleCard from './VehicleCard.jsx'

export default function VehicleCardContainer() {
  const [visibleVehicleCount, setVisibleVehicleCount] = useState(10);
  const [vehicleArrayId, setVehicleArrayId] = useState (0);
  const [vehiclesData, setVehiclesData] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [fetchCount, setFetchCount] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  const [buttonText, setButtonText] = useState("See More");
  
  const navigate = useNavigate();

  useEffect(() => {
    const cachedVehiclesData = localStorage.getItem('vehiclesData');
    if (cachedVehiclesData) {
      const parsedData = JSON.parse(cachedVehiclesData);
      setVehiclesData(parsedData);

      const cachedVisibleVehicleCount = localStorage.getItem('visibleVehicleCount');
      if (cachedVisibleVehicleCount) {
        setVisibleVehicleCount(parseInt(cachedVisibleVehicleCount, 10));
      }

      const cachedNextUrl = localStorage.getItem('nextUrl');
      if (cachedNextUrl) {
        setNextUrl(cachedNextUrl);
      }
    } else {
      handleFetchMore('https://swapi.dev/api/vehicles/');
    }

    const maxArrayId = vehiclesData.reduce(
      (maxId, vehicle) => Math.max(maxId, vehicle.arrayid),
      vehicleArrayId // Initialize with the current value of vehicleArrayId
    );
    setVehicleArrayId(maxArrayId); // Update vehicleArrayId
  
    if (navigate.state && navigate.state.visibleVehicleCount) {
      setVisibleVehicleCount(navigate.state.visibleVehicleCount);
      setFetchCount(0); 
    }
  
  }, [navigate, visibleVehicleCount. vehiclesData, vehicleArrayId]);
  

  const fetchVehicles = async (url) => {
    setButtonText("Loading...");
    try {
      const response = await fetch(url);
      const data = await response.json();
      let maxArrayId = vehiclesData.reduce(
        (maxId, vehicle) => Math.max(maxId, vehicle.arrayid),
        0
      )
      maxArrayId > 8 ? maxArrayId = maxArrayId + 1 : maxArrayId;
      const vehicles = data.results.map((vehicle, index) => ({
        name: vehicle.name,
        id: vehicle.url.split("/").slice(0, -1).pop(),
        arrayid: maxArrayId + index // Calculate arrayid based on maxArrayId
      }));
      const updatedVehiclesData = [...vehiclesData, ...vehicles];
      console.log("Updated vehicles data:", updatedVehiclesData);
      setVehiclesData(updatedVehiclesData);
      setNextUrl(data.next);
      setFetchCount(0);

      localStorage.setItem('vehiclesData', JSON.stringify(updatedVehiclesData));
      localStorage.setItem('nextUrl', data.next);
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
    console.log('nextUrl value:', nextUrl)
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
            <Link
            key={index}
            to={`/vehicles/${vehicle.id}`}
            state={{ vehiclesData }}
            >
            <VehicleCard key={index} vehicle={vehicle} index={index}/>
          </Link>
          ))}
      </div>
      {isDataLoaded && visibleVehicleCount > 0 && visibleVehicleCount < 36 && (
        <button className="SeeMoreButton" onClick={handleSeeMoreAndFetchMore}>
          {buttonText}
        </button>
      )}
    </>
  );
}

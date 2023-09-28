import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import VehicleImageArray from './VehicleImageArray';
import CharacterImageArray from '../Character/CharacterImageArray';
import SpeciesImageArray from '../Species/SpeciesImageArray';
import PlanetsImageArray from '../Planet/PlanetImageArray';
import FilmImageArray from '../Film/FilmImageArray';
import StarshipImageArray from '../Starship/StarshipImageArray';


export default function VehiclePage() {
  const [vehicleData, setVehicleData] = useState(null);
  const { vehicleId } = useParams(); 
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const vehiclesData = location.state?.vehiclesData || [];
  console.log('vehiclesData:', vehiclesData);

  let selectedVehicle = null;
  
  if (vehiclesData.length > 1) {
    selectedVehicle = vehiclesData.find((vehicle) => vehicle.id == parseInt(vehicleId, 10));
  } else {
    selectedVehicle = vehiclesData;
  }

  console.log('selectedVehicle:', selectedVehicle);

  const cacheKey = `vehicleData_${vehicleId}`;

  const cachedVehicleData = useMemo(() => {
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    return null;
  }, [cacheKey]);
 
  useEffect(() =>{

    if (cachedVehicleData) {
      setPlanetData(cachedVehicleData);
      setIsLoading(false);
      return;
    }

    async function fetchVehicleData() {
      const vehicleUrl = `https://swapi.dev/api/vehicles/${vehicleId}`;
      try{
        const response = await fetch(vehicleUrl);
        const data = await response.json();
        console.log('vehicleData Initial Fetch:', data);``

        if (Object.keys(data).length === 0) {
          setIsLoading(false); // Set loading to false
          return; // Exit if no data
        }

        const updatedVehicleData = {
          model: data.model,
          manufacturer: data.manufacturer,
          cost: data.cost_in_credits,
          length: data.length,
          speed: data.max_atmosphering_speed,
          crew: data.crew,
          passengers: data.passengers,
          cargoCapacity: data.cargo_capacity,
          consumables: data.consumables,
          class: data.vehicle_class,
          characters: data.pilots,
          films: data.films,
        }

        if (updatedVehicleData.characters.length !== 0){
          const pilotsPromises = updatedVehicleData.characters.map(async (pilotUrl) => {
            const pilotResponse = await fetch(pilotUrl);
            const pilotData = await pilotResponse.json();

            const pilotId = pilotUrl.split('/').slice(-2, -1)[0];

            const matchingPilotImage = CharacterImageArray.find(
              (img) => img.id === parseInt(pilotId, 10)
            );

            return {
              name: pilotData.name,
              id: pilotId,
              image: matchingPilotImage ? matchingPilotImage.image : null,
            };
          });
          const pilotsData = await Promise.all(pilotsPromises);

          updatedVehicleData.characters = pilotsData;
        };

        const filmsPromises = updatedVehicleData.films.map(async (filmUrl) =>{
          const filmResponse = await fetch(filmUrl);
          const filmData = await filmResponse.json();

          const filmId = filmData.episode_id;

          const matchingFilmImage = FilmImageArray.find(
            (img) => img.id === parseInt(filmId, 10)
          );

          return {
            name: filmData.title,
            id: filmId,
            image: matchingFilmImage ? matchingFilmImage.image : null,
          };
        });

        const filmsData = await Promise.all(filmsPromises);

        updatedVehicleData.films = filmsData;

        localStorage.setItem(cacheKey, JSON.stringify(updatedVehicleData));

        setIsLoading(false);
        setVehicleData(updatedVehicleData);

      } catch (error){
        console.error('Error fetching vehicle data:', error);
        setIsLoading(false);
      }
    }

    if (!vehicleData){
      fetchVehicleData();
    }

  }, [vehicleId, vehicleData]);

  
  if (isLoading){
    return (
      <div className="VehiclePage">
        <div className="VehiclePageContainer">
          <div className="VehiclePageMain">
            <div className ="VehiclePagePanel1">
              <h1>Vehicle Loading...</h1>
            </div>
          </div>
          <div className="VehiclePageLower">
            <div className="VehiclePagePanel2">
              <h1>Pilots Loading...</h1>
            </div>
            <div className="StarshipPagePanel3">
              <h1>Films Loading...</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
    

  
  console.log('UPDATED VEHICLE DATA AFTER FETCH:', vehicleData);


  if (!selectedVehicle) {
    return <div>Vehicle not found.</div>;
  }

  const vehicleImage = VehicleImageArray.find(img => img.id == vehicleId)
  console.log('vehicleImage:', vehicleImage)

  return (
    <div className="VehiclePage">
      <div className="VehiclePageContainer">
        <div className="VehiclePageMain">
          <img className="VehiclePageImage" src={vehicleImage.image} alt="Vehicle"/>
          <div className ="VehiclePagePanel1">
            <h1>{selectedVehicle.name}</h1>
              {vehicleData && (
                <div className="VehiclePageMainPanelContainer">
                  {(vehicleData.model !== "0" && vehicleData.model !==null && vehicleData.model !=="null" && vehicleData.model !== "unknown" && vehicleData.model !== "none" && vehicleData.model !==undefined) && (<div>Model: {vehicleData.model}</div>)}
                  {(vehicleData.manufacturer !=="0" && vehicleData.manufacturer !==null && vehicleData.manufacturer !=="null" && vehicleData.manufacturer !=="unkown" && vehicleData.manufacturer !== "none" && vehicleData.manufacturer !==undefined) && (<div>Manufacturer: {vehicleData.manufacturer}</div>)}
                  {(vehicleData.cost !== "0 " && vehicleData.cost !==null && vehicleData.cost !=="null" && vehicleData.cost !== "unknown" && vehicleData.cost !== "none" && vehicleData.cost !==undefined) && (<div>Cost: {vehicleData.cost} credits</div>)}
                  {(vehicleData.length !== "0" && vehicleData.length !==null && vehicleData.length !=="null" && vehicleData.length !== "unknown" && vehicleData.length !== "none" && vehicleData.length !==undefined) && (<div>Length: {vehicleData.length}</div>)}
                  {(vehicleData.speed !== "0" && vehicleData.speed !==null && vehicleData.speed !=="null" && vehicleData.speed !=="unknown" && vehicleData.speed !== "none" && vehicleData.speed !==undefined) && (<div>Speed: {vehicleData.speed}</div>)}
                  {(vehicleData.crew !== "0" && vehicleData.crew !==null && vehicleData.crew !=="null" && vehicleData.crew !== "unknown" && vehicleData.crew !== "none" && vehicleData.crew !==undefined) && (<div>Crew: {vehicleData.crew}</div>)}
                  {(vehicleData.passengers !== "0" && vehicleData.passengers !==null && vehicleData.passengers !=="null" && vehicleData.passengers !== "unknown" && vehicleData.passengers !== "none" && vehicleData.passengers !==undefined) && (<div>Passengers: {vehicleData.passengers}</div>)}
                  {(vehicleData.cargoCapacity !== "0" && vehicleData.cargoCapacity !==null && vehicleData.cargoCapcity !=="null" && vehicleData.cargoCapacity !== "unknown" && vehicleData.cargoCapacity !== "none" && vehicleData.cargoCapacity !==undefined) &&(<div>Cargo Capacity: {vehicleData.cargoCapacity}</div>)}
                  {(vehicleData.consumables !== "0" && vehicleData.consumables !==null && vehicleData.consumables !=="null" &&vehicleData.consumables !== "unknown" && vehicleData.consumables !== "none" && vehicleData.consumables !==undefined) && (<div>Consumables: {vehicleData.consumables}</div>)}
                  {(vehicleData.class !== "0" && vehicleData.class !== null && vehicleData.class !=="null" && vehicleData.class !== "unknown" && vehicleData.class !== "none" && vehicleData.class !==undefined) && (<div>Class: {vehicleData.class}</div>)}
                </div>
              )}
          </div>
        </div>
        <div className="VehiclePageLower">
          <div className="VehiclePagePanel2">
            <h1>Pilots</h1>
            {vehicleData && (
              <div className="CharacterList">
                {vehicleData.characters.map((character, index) => (
                  <div className="CharacterListItem" key={index}>
                    <Link
                      to ={{pathname: `/characters/${character.id}`}}
                      state ={{charactersData: vehicleData.characters}}
                    >
                      {character.image && <img src={character.image} />} 
                    <div>{character.name}</div>
                    </Link>
                  </div>
                ))}
                {vehicleData.characters.length === 0 && (
                  <div>No Pilots Data</div>
                )}
              </div>
            )}
          </div>
          <div className="VehiclePagePanel3">
            <h1>Films</h1>
            {vehicleData && (
              <div className="FilmList">
                {vehicleData.films.map((film) => (
                  <div className="FilmListItem" key={film.id}>
                    <Link
                      to={{pathname: `/films/${film.id}`}}
                      state={{ filmsData: vehicleData.films}}
                    >
                      {film.image && <img src={film.image} alt={film.name} />}
                      <div>{film.name}</div>
                    </Link>
                  </div>
                ))}
                {vehicleData.films.length === 0 && (
                  <div>No Film Data</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


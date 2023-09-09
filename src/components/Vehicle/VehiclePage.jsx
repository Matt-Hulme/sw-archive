import React, { useState, useEffect } from 'react';
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

  const vehiclesData = location.state?.vehiclesData || [];
  console.log('vehiclesData:', vehiclesData);

  let selectedVehicle = null;
  
  if (vehiclesData.length > 1) {
    selectedVehicle = vehiclesData.find((vehicle) => vehicle.id == parseInt(vehicleId, 10));
  } else {
    selectedVehicle = vehiclesData;
  }

  console.log('selectedVehicle:', selectedVehicle);
 
  useEffect(() =>{
    async function fetchVehicleData() {
      const vehicleUrl = `https://swapi.dev/api/vehicles/${vehicleId}`;
      try{
        const response = await fetch(vehicleUrl);
        const data = await response.json();
        console.log('vehicleData Initial Fetch:', data);

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
          pilots: data.pilots,
          films: data.films,
        }

        if (updatedVehicleData.pilots.length !== 0){
          const pilotsPromises = updatedVehicleData.pilots.map(async (pilotUrl) => {
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

          updatedVehicleData.pilots = pilotsData;
        };

        const filmsPromises = updatedVehicleData.films.map(async (filmUrl) =>{
          const filmResponse = await fetch(filmUrl);
          const filmData = await filmResponse.json();

          const filmId = filmUrl.split('/').slice(-2, -1)[0];

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

        setVehicleData(updatedVehicleData);

      } catch (error){
        console.error('Error fetching vehicle data:', error);
      }
    }

    if (!vehicleData){
      fetchVehicleData();
    }

  }, [vehicleId, vehicleData]);

  
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
          </div>
        </div>
        <div className="VehiclePageLower">
          <div className="VehiclePagePanel2">
          </div>
          <div className="VehiclePagePanel3">
          </div>
        </div>
      </div>
    </div>
  );
}


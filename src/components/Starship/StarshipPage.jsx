import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import StarshipImageArray from './StarshipImageArray';
import CharacterImageArray from '../Character/CharacterImageArray';
import SpeciesImageArray from '../Species/SpeciesImageArray';
import PlanetsImageArray from '../Planet/PlanetImageArray';
import FilmImageArray from '../Film/FilmImageArray';
import VehicleImageArray from '../Vehicle/VehicleImageArray';

export default function StarshipPage() {
  const [starshipData, setStarshipData] = useState(null);
  const { starshipId } = useParams(); 
  const location = useLocation();

  const starshipsData = location.state?.starshipsData || [];
  console.log('starshipsData:', starshipsData);



  let selectedStarship = null;

  if (starshipsData.length > 1) {
    selectedStarship = starshipsData.find((starship) => starship.id == parseInt(starshipId, 10));
  } else {
    selectedStarship = starshipsData[0];
  }

  console.log('selectedStarship:', selectedStarship);

  useEffect(() => {
    async function fetchStarshipData(){
      const starshipUrl = `https://swapi.dev/api/starships/${starshipId}`;
      try{
        const response = await fetch(starshipUrl);
        const data = await response.json();
        console.log('starshipData Initial Fetch:', data);

        const updatedStarshipData = {
          model: data.model,
          manufacturer: data.manufacturer,
          cost: data.cost_in_credits,
          length: data.length,
          speed: data.max_atmosphering_speed,
          crew: data.crew,
          passengers: data.passengers,
          capacity: data.cargo_capacity,
          consumables: data.consumables,
          hyperdrive: data.hyperdrive_rating,
          MGLT: data.MGLT,
          class: data.starship_class,
          pilots: data.pilots,
          films: data.films,
        }

        if (updatedStarshipData.pilots.length !== 0){
          const pilotsPromises = updatedStarshipData.pilots.map(async (pilotUrl) => {
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
          
          updatedStarshipData.pilots = pilotsData;
        };
        

        const filmsPromises = updatedStarshipData.films.map(async (filmUrl) =>{
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

        updatedStarshipData.films = filmsData;

        setStarshipData(updatedStarshipData);

      } catch (error){
        console.error('Error fetching starship data:', error);
      }
    }

    if (!starshipData) {
      fetchStarshipData();
    }

  }, [starshipId, starshipData]);





  console.log('UPDATED STARSHIP DATA AFTER FETCH:', starshipData);


 
  if (!selectedStarship) {
    return <div>Starship not found.</div>;
  }

  const starshipImage = StarshipImageArray.find(img => img.id == starshipId)

  return (
    <div className="StarshipPage">
      <h2>{selectedStarship.name}</h2>
      <img className="StarshipPageImage" src={starshipImage.image} alt="Starship" />
    </div>
  );
}


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
  const [isLoading, setIsLoading] = useState(true);

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

        if (Object.keys(data).length === 0) {
          setIsLoading(false); // Set loading to false
          return; // Exit if no data
        }

        const updatedStarshipData = {
          model: data.model,
          manufacturer: data.manufacturer,
          cost: data.cost_in_credits,
          length: data.length,
          speed: data.max_atmosphering_speed,
          crew: data.crew,
          passengers: data.passengers,
          cargoCapacity: data.cargo_capacity,
          consumables: data.consumables,
          hyperdrive: data.hyperdrive_rating,
          MGLT: data.MGLT,
          class: data.starship_class,
          characters: data.pilots,
          films: data.films,
        }

        if (updatedStarshipData.characters.length !== 0){
          const pilotsPromises = updatedStarshipData.characters.map(async (pilotUrl) => {
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
          
          updatedStarshipData.characters = pilotsData;
        };
        

        const filmsPromises = updatedStarshipData.films.map(async (filmUrl) =>{
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

        updatedStarshipData.films = filmsData;

        setIsLoading(false);
        setStarshipData(updatedStarshipData);

      } catch (error){
        console.error('Error fetching starship data:', error);
        setIsLoading(false);
      }
    }

    if (!starshipData) {
      fetchStarshipData();
    }

  }, [starshipId, starshipData]);

  if (isLoading) {
    return (
      <div className="StarshipPage">
        <div className="StarshipPageContainer">
          <div className="StarshipPageMain">
            <img className="StarshipPageImage" src={starshipImage.image} alt="Starship"/>
            <div className ="StarshipPagePanel1">
              <h1>Starship Loading...</h1>
            </div>
          </div>
          <div className="StarshipPageLower">
            <div className="StarshipPagePanel2">
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


  console.log('UPDATED STARSHIP DATA AFTER FETCH:', starshipData);


 
  if (!selectedStarship) {
    return <div>Starship not found.</div>;
  }

  const starshipImage = StarshipImageArray.find(img => img.id == starshipId)

  return (
    <div className="StarshipPage">
      <div className="StarshipPageContainer">
        <div className="StarshipPageMain">
          <img className="StarshipPageImage" src={starshipImage.image} alt="Starship"/>
          <div className ="StarshipPagePanel1">
            <h1>{selectedStarship.name}</h1>
            {starshipData && (
              <div className="StarshipPageMainPanelContainer">
                <div>Model: {starshipData.model}</div>
                <div>Manufacturer: {starshipData.manufacturer}</div>
                <div>Cost: {starshipData.cost}</div>
                <div>Length: {starshipData.length}</div>
                <div>Speed: {starshipData.speed}</div>
                <div>Crew: {starshipData.crew}</div>
                <div>Passengers: {starshipData.passengers}</div>
                <div>Cargo Capacity: {starshipData.cargoCapacity}</div>
                <div>Consumables: {starshipData.consumables}</div>
                <div>Hyperdrive: {starshipData.hyperdrive}</div>
                <div>MGLT: {starshipData.MGLT}</div>
                <div>Class: {starshipData.class}</div>
              </div>
            )}
          </div>
        </div>
        <div className="StarshipPageLower">
          <div className="StarshipPagePanel2">
            <h1>Pilots</h1>
            {starshipData && (
              <div className="CharacterList">
                {starshipData.characters.map((character, index) => (
                  <div className="CharacterListItem" key={index}>
                    <Link
                      to ={{pathname: `/characters/${character.id}`}}
                      state ={{charactersData: starshipData.characters}}
                    >
                      {character.image && <img src={character.image} />} 
                    <div>{character.name}</div>
                    </Link>
                  </div>
                ))}
                {starshipData.characters.length === 0 && (
                  <div className>No Pilots Data</div>
                )}
              </div>
            )}
          </div>
          <div className="StarshipPagePanel3">
            <h1>Films</h1>
            {starshipData && (
              <div className="FilmList">
                {starshipData.films.map((film) => (
                  <div className="FilmListItem" key={film.id}>
                    <Link
                      to={{pathname: `/films/${film.id}`}}
                      state={{ filmsData: starshipData.films}}
                    >
                      {film.image && <img src={film.image} alt={film.name} />}
                      <div>{film.name}</div>
                    </Link>
                  </div>
                ))}
                {starshipData.films.length === 0 && (
                  <div className>No Film Data</div>
                )}                
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


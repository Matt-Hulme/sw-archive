import React, { useState, useEffect, useMemo } from 'react';
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

  const cacheKey = `starshipData_${starshipId}`;

  const cachedStarshipData = useMemo(() => {
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    return null;
  }, [cacheKey]);

  useEffect(() => {

    if (cachedStarshipData) {
      setStarshipData(cachedStarshipData);
      setIsLoading(false);
      return;
    }

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

        localStorage.setItem(cacheKey, JSON.stringify(updatedStarshipData));

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
            <h1 className="IndividualPageMainHeader">{selectedStarship.name}</h1>
            {starshipData && (
              <div className="StarshipPageMainPanelContainer">
                <div className="IndividualPagePanel1Row1" id="StarshipPagePanel1Row1">
                  {(starshipData.class !=="0" && starshipData.class !==null && starshipData.class !=="null" && starshipData.class !== "unknown" && starshipData.class !=="none" && starshipData.class !==undefined) && (<div className="Panel1Row1A">Class<div className="Panel1Row1B">{starshipData.class}</div></div>)}
                  {(starshipData.model !=="0" && starshipData.model !==null && starshipData.model !=="null" && starshipData.model !== "unknown" && starshipData.model !=="none" && starshipData.model !==undefined) && (<div className="Panel1Row1A">Model<div className="Panel1Row1B">{starshipData.model}</div></div>)}
                  {(starshipData.manufacturer !=="0" && starshipData.manufacturer !==null && starshipData.manufacturer !=="null" && starshipData.manufacturer !== "unknown" && starshipData.manufacturer !=="none" && starshipData.manufacturer !==undefined) && (<div className="Panel1Row1A">Manufacturer<div className="Panel1Row1B">{starshipData.manufacturer}</div></div>)}
                  {(starshipData.cost !=="0" && starshipData.cost !==null && starshipData.cost !=="null" && starshipData.cost !== "unknown" && starshipData.cost !=="none" && starshipData.cost !==undefined) && (<div className="Panel1Row1A">Cost<div className="Panel1Row1B">{starshipData.cost}</div></div>)}
                </div>
                <div className="IndividualPagePanel1Row2" id="StarshipPagePanel1Row2">
                  {(starshipData.length !=="0" && starshipData.length !==null && starshipData.length !=="null" && starshipData.length !== "unknown" && starshipData.length !=="none" && starshipData.length !==undefined) && (<div className="Panel1Row2A">Length<div className="Panel1Row2B">{starshipData.length}</div></div>)}
                  {(starshipData.speed !=="0" && starshipData.speed !==null && starshipData.speed !=="null" && starshipData.speed !== "unknown" && starshipData.speed !=="none" && starshipData.speed !==undefined) && (<div className="Panel1Row2A">Speed<div className="Panel1Row2B">{starshipData.speed}</div></div>)}
                  {(starshipData.crew !=="0" && starshipData.crew !==null && starshipData.crew !=="null" && starshipData.crew !== "unknown" && starshipData.crew !=="none" && starshipData.crew !==undefined) && (<div className="Panel1Row2A">Crew<div className="Panel1Row2B">{starshipData.crew}</div></div>)}
                  {(starshipData.passengers !=="0" && starshipData.passengers !==null && starshipData.passengers !=="null" && starshipData.passengers !== "unknown" && starshipData.passengers !=="none" && starshipData.passengers !==undefined) && (<div className="Panel1Row2A">Passengers<div className="Panel1Row2B">{starshipData.passengers}</div></div>)}
                  {(starshipData.cargoCapacity !=="0" && starshipData.cargoCapacity !==null && starshipData.passengers !=="null" && starshipData.cargoCapacity !== "unknown" && starshipData.cargoCapacity !=="none" && starshipData.cargoCapacity !==undefined) && (<div className="Panel1Row2A">Cargo Capacity<div className="Panel1Row2B">{starshipData.cargoCapacity}</div></div>)}
                  {(starshipData.consumables !=="0" && starshipData.consumables !==null && starshipData.passengers !=="null" && starshipData.consumables !== "unknown" && starshipData.consumables !=="none" && starshipData.consumables !==undefined) && (<div className="Panel1Row2A">Consumables<div className="Panel1Row2B">{starshipData.consumables}</div></div>)}
                  {(starshipData.hyperdrive !=="0" && starshipData.hyperdrive !==null && starshipData.passengers !=="null" && starshipData.hyperdrive !== "unknown" && starshipData.hyperdrive !=="none" && starshipData.hyperdrive !==undefined) && (<div className="Panel1Row2A">Hyperdrive<div className="Panel1Row2B">{starshipData.hyperdrive}</div></div>)}
                  {(starshipData.MGLT !=="0" && starshipData.MGLT !==null && starshipData.passengers !=="null" && starshipData.MGLT !== "unknown" && starshipData.MGLT !=="none" && starshipData.MGLT !==undefined) && (<div className="Panel1Row2A">MGLT<div className="Panel1Row2B">{starshipData.MGLT}</div></div>)}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="StarshipPageLower">
          <div className="StarshipPagePanel2">
            <h1 className="IndividualPageLowerPanelHeader">Pilots</h1>
            {starshipData && (
              <div className="CharacterList">
                {starshipData.characters.map((character, index) => (
                  <div className="CharacterListItem" key={index}>
                    <Link
                      className="InterpageLink"
                      to ={{pathname: `/characters/${character.id}`}}
                      state ={{charactersData: starshipData.characters}}
                    >
                      {character.image && <img src={character.image} />} 
                    <div>{character.name}</div>
                    </Link>
                  </div>
                ))}
                {starshipData.characters.length === 0 && (
                  <div className="IndividualPageNoDataFound">No Pilots Data</div>
                )}
              </div>
            )}
          </div>
          <div className="StarshipPagePanel3">
            <h1 className="IndividualPageLowerPanelHeader">Films</h1>
            {starshipData && (
              <div className="FilmList">
                {starshipData.films.map((film) => (
                  <div className="FilmListItem" key={film.id}>
                    <Link
                      className="InterpageLink"
                      to={{pathname: `/films/${film.id}`}}
                      state={{ filmsData: starshipData.films}}
                    >
                      {film.image && <img src={film.image} alt={film.name} />}
                      <div>{film.name}</div>
                    </Link>
                  </div>
                ))}
                {starshipData.films.length === 0 && (
                  <div className="IndividualPageNoDataFound">No Film Data</div>
                )}                
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


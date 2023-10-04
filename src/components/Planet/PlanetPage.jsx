import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import CharacterImageArray from '../Character/CharacterImageArray';
import SpeciesImageArray from '../Species/SpeciesImageArray';
import PlanetImageArray from './PlanetImageArray';
import FilmImageArray from '../Film/FilmImageArray';
import StarshipImageArray from '../Starship/StarshipImageArray';
import VehicleImageArray from '../Vehicle/VehicleImageArray';


export default function PlanetPage() {
  const [planetData, setPlanetData] = useState(null);
  const { planetId } = useParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const planetsData = location.state?.planetsData || [];
  console.log('planetsData:', planetsData)
  console.log('planetId:', planetId)

  let selectedPlanet = null;

  if (planetsData.length > 1){
    console.log('IF SELECTED')
    selectedPlanet = planetsData.find((planet) => planet.id == parseInt(planetId, 10));
  } else {
    console.log('ELSE SELECTED')
    selectedPlanet = planetsData;
  }

  console.log('selectedPlanet:', selectedPlanet)

  const cacheKey = `planetData_${planetId}`;

  const cachedPlanetData = useMemo(() => {
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    return null;
  }, [cacheKey]);


  useEffect(() => {

    if (cachedPlanetData) {
      setPlanetData(cachedPlanetData);
      setIsLoading(false);
      return;
    }

    async function fetchPlanetData() {
      const planetUrl = `https://swapi.dev/api/planets/${planetId}`;
      try{
        const response = await fetch(planetUrl);
        const data = await response.json();
        console.log('planetData Initial Fetch:', data);

        if (Object.keys(data).length === 0) {
          setIsLoading(false); // Set loading to false
          return; // Exit if no data
        }

        const updatedPlanetData = {
          rotation: data.rotation_period,
          orbital: data.orbial_period,
          diameter: data.diameter,
          climate: data.climate,
          gravity: data.gravity,
          terrain: data.terrain,
          surfaceWater: data.surface_water,
          population: data.population,
          characters: data.residents,
          films: data.films,
        }

        const characterPromises = data.residents.map(async (characterUrl) =>{
          const characterResponse = await fetch(characterUrl);
          const characterData = await characterResponse.json();

          const characterId = characterUrl.split('/').slice(-2, -1)[0];

          const matchingCharacterImage = CharacterImageArray.find(
            (img) => img.id === parseInt(characterId, 10)
          );

          return {
            name: characterData.name,
            id: characterId,
            image: matchingCharacterImage ? matchingCharacterImage.image : null,
          };
        });
        
        const charactersData = await Promise.all(characterPromises);

        updatedPlanetData.characters = charactersData;

        const filmPromises = data.films.map(async (filmUrl) => {
          const filmResponse = await fetch(filmUrl);
          const filmData = await filmResponse.json();

          const filmId = filmData.episode_id;

          // Find the corresponding image from 'filmimagearray' using the ID
          const matchingFilmImage = FilmImageArray.find(
            (img) => img.id === parseInt(filmId, 10)
          );

          // Return only the name, ID, and image
          return {
            name: filmData.title,
            id: filmId,
            episodeId: filmData.episode_id,
            image: matchingFilmImage ? matchingFilmImage.image : null,
          };
        });

        const filmsData = await Promise.all(filmPromises);

        updatedPlanetData.films = filmsData;

        localStorage.setItem(cacheKey, JSON.stringify(updatedPlanetData));

        setIsLoading(false);
        setPlanetData(updatedPlanetData)       
      } catch (error){
        console.error('Error fetching planet data:', error);
        setIsLoading(false);
      }
    }
  
    
    if (!planetData){
      fetchPlanetData();
    }
  }, [planetId, planetData]);


  console.log('UPDATED PLANET DATA AFTER FETCH:', planetData);

  if (isLoading) {
    return (
      <div className="PlanetPage">
      <div className="PlanetPageContainer">
        <div className="PlanetPageMain">
          <div className ="PlanetPagePanel1">
            <h1>Planet Loading...</h1>
          </div>
        </div>
        <div className="PlanetPageLower">
          <div className="PlanetPagePanel2">
            <h1>Characters Loading...</h1>
          </div>
          <div className="PlanetPagePanel3">
            <h1>Films Loading...</h1>
          </div>
        </div>
      </div>
    </div>

    );
  }


  if (!selectedPlanet) {
    return <div>Planet not found.</div>
  }

  const planetImage = PlanetImageArray.find((img) => img.id == planetId);
  console.log('planetImage:', planetImage)

  return (
    <div className="PlanetPage">
      <div className="PlanetPageContainer">
        <div className="PlanetPageMain">
          <img className="PlanetPageImage" src={planetImage.image} alt="Planet"/>
          <div className ="PlanetPagePanel1">
            <h1 className="IndividualPageMainHeader">{selectedPlanet.name}</h1>
            {planetData && (
              <div className="PlanetPageMainPanelContainer">
                <div className="IndividualPagePanel1Row1" id="PlanetPagePanel1Row1">
                  {(planetData.rotation !=="0" && planetData.rotation !==null && planetData.rotation !=="null" && planetData.rotation !=="unknown" && planetData.rotation !=="none" && planetData.rotation !==undefined) && (<div className="Panel1Row1A">Rotation<div className="Panel1Row1B">{planetData.rotation}</div></div>)}
                  {(planetData.orbital !=="0" && planetData.orbital !==null && planetData.orbital !=="null" && planetData.orbital !=="unknown" && planetData.orbital !=="none" && planetData.orbital !==undefined) && (<div className="Panel1Row1A">Orbital<div className="Panel1Row1B">{planetData.orbital}</div></div>)}
                  {(planetData.diameter !=="0" && planetData.diameter !==null && planetData.diameter !=="null" && planetData.diameter !=="unknown" && planetData.diameter !=="none" && planetData.diameter !==undefined) && (<div className="Panel1Row1A">Diameter<div className="Panel1Row1B">{planetData.diameter}</div></div>)}
                  {(planetData.climate !=="0" && planetData.climate !==null && planetData.climate !=="null" && planetData.climate !=="unknown" && planetData.climate !=="none" && planetData.climate !==undefined) && (<div className="Panel1Row1A">Climate<div className="Panel1Row1B">{planetData.climate}</div></div>)}
                  {(planetData.gravity !==null && planetData.gravity !=="null" && planetData.gravity !=="unknown" && planetData.gravity !==undefined) && (<div className="Panel1Row1A">Gravity<div className="Panel1Row1B">{planetData.gravity}</div></div>)}
                </div>
                <div className="IndividualPagePanel1Row2" id="PlanetPagePanel1Row2">
                  {(planetData.terrain !=="0" && planetData.terrain !==null && planetData.terrain !=="null" && planetData.terrain !=="unknown" && planetData.terrain !=="none" && planetData.terrain !==undefined) && (<div className="Panel1Row2A">Terrain<div className="Panel1Row2B">{planetData.terrain}</div></div>)}
                  {(planetData.surfaceWater !==null && planetData.surfaceWater !=="null" && planetData.surfaceWater !=="unknown" && planetData.surfaceWater !==undefined) && (<div className="Panel1Row2A">Surface Water <div className="Panel1Row2B">{planetData.surfaceWater}</div></div>)}
                  {(planetData.population !==null && planetData.population !=="null" && planetData.population !=="unknown" && planetData.population !==undefined) && (<div className="Panel1Row2A">Population<div className="Panel1Row2B">{planetData.population}</div></div>)}
                </div>
              </div>
            )}
            </div>
        </div>
        <div className="PlanetPageLower">
          <div className="PlanetPagePanel2">
            <h1 className="IndividualPageLowerPanelHeader">Characters</h1>
            {planetData && (
              <div className="CharacterList">
                {planetData.characters.map((character, index) => (
                  <div className="CharacterListItem" key={index}>
                    <Link
                      className="InterpageLink"
                      to ={{pathname: `/characters/${character.id}`}}
                      state ={{charactersData: planetData.characters}}
                    >
                      {character.image && <img src={character.image} />} 
                    <div>{character.name}</div>
                    </Link>
                  </div>
                ))}
                {planetData.characters.length === 0 && (
                  <div className="IndividualPageNoDataFound">No Characters Data</div>
                )}
              </div>
            )}
          </div>
          <div className="PlanetPagePanel3">
            <h1 className="IndividualPageLowerPanelHeader">Films</h1>
            {planetData && (
              <div className="FilmList">
                {planetData.films.map((film) => (
                  <div className="FilmListItem" key={film.id}>
                    <Link
                      className="InterpageLink"
                      to={{pathname: `/films/${film.id}`}}
                      state={{ filmsData: planetData.films}}
                    >
                      {film.image && <img src={film.image} alt={film.name} />}
                      <div>{film.name}</div>
                    </Link>
                  </div>
                ))}
                  {planetData.films.length === 0 && (
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


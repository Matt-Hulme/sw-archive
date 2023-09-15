import React, { useState, useEffect } from 'react';
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


  useEffect(() => {
    async function fetchPlanetData() {
      const planetUrl = `https://swapi.dev/api/planets/${planetId}`;
      try{
        const response = await fetch(planetUrl);
        const data = await response.json();
        console.log('planetData Initial Fetch:', data);

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


        setPlanetData(updatedPlanetData)       
      } catch (error){
        console.error('Error fetching planet data:', error);
      }
    }
  
    
    if (!planetData){
      fetchPlanetData();
    }
  }, [planetId, planetData]);


  console.log('UPDATED PLANET DATA AFTER FETCH:', planetData);



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
            <h1>{selectedPlanet.name}</h1>
            {planetData && (
              <div className="PlanetMainPanelContainer">
                <div>Rotation: {planetData.rotation_period}</div>
                <div>Orbital: {planetData.orbital_period}</div>
                <div>Diameter: {planetData.diameter}</div>
                <div>Climate: {planetData.climate}</div>
                <div>Gravity: {planetData.gravity}</div>
                <div>Terrain: {planetData.terrain}</div>
                <div>Surface Water: {planetData.surfaceWater}</div>
                <div>Population: {planetData.population}</div>
                </div>
            )}
            </div>
        </div>
        <div className="PlanetPageLower">
          <div className="PlanetPagePanel2">
            <h1>Characters</h1>
            {planetData && (
              <div className="CharacterList">
                {planetData.characters.map((character, index) => (
                  <div className="CharacterListItem" key={index}>
                    <Link
                      to ={{pathname: `/characters/${character.id}`}}
                      state ={{charactersData: planetData.characters}}
                    >
                      {character.image && <img src={character.image} />} 
                    <div>{character.name}</div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="PlanetPagePanel3">
            <h1>Films</h1>
            {planetData && (
              <div className="FilmList">
                {planetData.films.map((film) => (
                  <div className="FilmListItem" key={film.id}>
                    <Link
                      to={{pathname: `/films/${film.id}`}}
                      state={{ filmsData: planetData.films}}
                    >
                      {film.image && <img src={film.image} alt={film.name} />}
                      <div>{film.name}</div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


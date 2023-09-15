import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import SpeciesImageArray from './SpeciesImageArray';
import CharacterImageArray from '../Character/CharacterImageArray';
import PlanetsImageArray from '../Planet/PlanetImageArray';
import FilmImageArray from '../Film/FilmImageArray';
import StarshipImageArray from '../Starship/StarshipImageArray';
import VehicleImageArray from '../Vehicle/VehicleImageArray';

export default function SpeciePage() {
  const [specieData, setSpecieData] = useState(null);
  const { speciesId } = useParams();
  const location = useLocation();

  const speciesData = location.state?.speciesData || [];
  console.log('speciesData:', speciesData)

  let selectedSpecies = null;

  if (speciesData.length > 1){
    selectedSpecies = speciesData.find((species) => species.id == parseInt(speciesId, 10));
  } else {
    selectedSpecies = speciesData;
  }

  console.log("selectedSpecies", selectedSpecies)
 
  useEffect(() => {
    async function fetchSpecieData(){
      const specieUrl = `https://swapi.dev/api/species/${speciesId}`;
      try {
        const response = await fetch(specieUrl);
        const data = await response.json();
        console.log('specieData Initial Fetch:', data);

        const updatedSpecieData = {
          classification: data.classification,
          designation: data.designation,
          height: data.average_height,
          skinColor: data.skin_colors,
          hairColor: data.hair_colors,
          eyeColor: data.eye_colors,
          lifespan: data.average_lifespan,
          language: data.language,
          homeworld: data.homeworld,
          characters: data.people,
          films: data.films,       
        };
        
        if (updatedSpecieData.homeworld.length !== 0){
          const homeworldResponse = await fetch(updatedSpecieData.homeworld);
          const homeworldData = await homeworldResponse.json();
          console.log('homeworldData Fetch Response:', homeworldData)

          const homeworldId = homeworldData.url.split('/').slice(-2, -1)[0];
          const matchingHomeworldImage = PlanetsImageArray.find(
            (img) => img.id === parseInt(homeworldId, 10)
          );

          if (matchingHomeworldImage){
            updatedSpecieData.homeworld = {
              name: homeworldData.name,
              id: homeworldId,
              image: matchingHomeworldImage.image,
            };
          }
        }



        const charactersPromises = data.people.map(async(characterUrl) => {
          const characterResponse = await fetch(characterUrl);
          const characterData = await characterResponse.json();
          console.log('characterData Fetch Response:', characterData);

          const characterId = characterUrl.split('/').slice(-2, -1)[0];

          const matchingCharacterImage = CharacterImageArray.find(
            (img) => img.id === parseInt(characterId, 10)
          );

          return{
            name: characterData.name,
            id: characterId,
            image: matchingCharacterImage ? matchingCharacterImage.image : null,
          };
        });

        const charactersData = await Promise.all(charactersPromises);

        updatedSpecieData.characters = charactersData;

        

        const filmPromises = data.films.map(async (filmUrl) => {
          const filmResponse = await fetch(filmUrl);
          const filmData = await filmResponse.json();
          console.log('filmData Fetch Response:', filmData);
          
          const filmId = filmData.episode_id;

          const matchingFilmImage = FilmImageArray.find(
            (img) => img.id === parseInt(filmId, 10)
          );

          return {
            name: filmData.title,
            id: filmId,
            episodeId: filmData.episode_id,
            image: matchingFilmImage ? matchingFilmImage.image : null,
          }
        });

        const filmsData = await Promise.all(filmPromises);

        updatedSpecieData.films = filmsData;

        setSpecieData(updatedSpecieData);
        
      } catch (error){
        console.error('Error fetching Species Data:', error);
      }
    }

    if (!specieData){
      fetchSpecieData();
    }
  }, [speciesId, specieData])

  console.log('UPDATED SPECIE DATA AFTER FETCH:', specieData);

  if (!selectedSpecies) {
    return <div>Species not found.</div>;
  }

  const specieImage = SpeciesImageArray.find(img => img.id == speciesId)
  console.log('specieImage:', specieImage)

  return (
    <div className="SpeciePage">
      <div className="SpeciePageContainer">
        <div className="SpeciePageMain">
          <img className="SpeciePageImage" src={specieImage.image} alt="Specie"/>
          <div className ="SpeciePagePanel1">
            <h1>{selectedSpecies.name}</h1>
            {specieData && (
              <div className="SpecieMainPanelContainer">
                <div>Classification: {specieData.classification}</div>
                <div>Designation: {specieData.designation}</div>
                <div>Height: {specieData.height}</div>
                <div>Skin Colors: {specieData.skin_colors}</div>
                <div>Hair Colors: {specieData.hair_colors}</div>
                <div>Eye Colors: {specieData.eye_colors}</div>
                <div>Lifespan: {specieData.average_lifespan} </div>
                <div>Language: {specieData.language}</div>
                {specieData.homeworld.length !== 0 && (
                  <div>
                    Homeworld
                    <Link
                      to={{pathname: `/planets/${specieData.homeworld.id}`}}
                      state={{ planetsData: specieData.homeworld}}
                    >
                      {specieData.homeworld.name}
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="SpeciePageLower">
          <div className="SpeciePagePanel2">
            <h1>Characters</h1>
            {specieData && (
              <div className="CharacterList">
                {specieData.characters.map((character, index) => (
                  <div className="Character" key={index}>
                    <Link
                      to ={{pathname: `/characters/${character.id}`}}
                      state ={{charactersData: specieData.characters}}
                    >
                      {character.image && <img src={character.image} />} 
                    <div>{character.name}</div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="SpeciePagePanel3">
            <h1>Films</h1>
            {specieData && (
              <div className="FilmList">
                {specieData.films.map((film) => (
                  <div className="FilmListItem" key={film.id}>
                    <Link
                      to={{pathname: `/films/${film.id}`}}
                      state={{ filmsData: specieData.films}}
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


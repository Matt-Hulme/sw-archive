import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import CharacterImageArray from './CharacterImageArray';
import SpeciesImageArray from '../Species/SpeciesImageArray';
import PlanetsImageArray from '../Planet/PlanetImageArray';
import FilmImageArray from '../Film/FilmImageArray';
import StarshipImageArray from '../Starship/StarshipImageArray';
import VehicleImageArray from '../Vehicle/VehicleImageArray';

export default function CharacterPage() {
  const [characterData, setCharacterData] = useState(null);
  const { characterId } = useParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  const charactersData = location.state?.charactersData || [];
  console.log('charactersData:', charactersData);

  let selectedCharacter = null;

  if (charactersData.length > 1) {
    selectedCharacter = charactersData.find((character) => character.id == parseInt(characterId, 10));
  } else {
    selectedCharacter = charactersData;
  }

  console.log('selectedCharacter:', selectedCharacter);

  // Create a unique cache key for the character data based on characterId
  const cacheKey = `characterData_${characterId}`;

  // Use useMemo to retrieve character data from cache or fetch it
  const cachedCharacterData = useMemo(() => {
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    return null;
  }, [cacheKey]);

  useEffect(() => {
    // If cached data exists, set it and exit early
    if (cachedCharacterData) {
      setCharacterData(cachedCharacterData);
      setIsLoading(false);
      return;
    }

    async function fetchCharacterData() {
      const characterUrl = `https://swapi.dev/api/people/${characterId}`;
      try {
        const response = await fetch(characterUrl);
        const data = await response.json();
        console.log('characterData Initial Fetch:', data);

        if (Object.keys(data).length === 0) {
          setIsLoading(false); // Set loading to false
          return; // Exit if no data
        }

        const updatedCharacterData = {
          height: data.height,
          mass: data.mass,
          hairColor: data.hair_color,
          skinColor: data.skin_color,
          eyeColor: data.eye_color,
          birthYear: data.birth_year,
          gender: data.gender,
          homeworld: data.homeworld,
          species: data.species,
          vehicles: data.vehicles,
          starships: data.starships,
        };

        // Fetch data for species
        if (updatedCharacterData?.species.length !== 0) {
          const speciesResponse = await fetch(updatedCharacterData.species[0]);
          const speciesData = await speciesResponse.json();
          const speciesId = speciesData.url.split('/').slice(-2, -1)[0];
          const matchingSpeciesImage = SpeciesImageArray.find(
            (img) => img.id === parseInt(speciesId, 10)
          );

          if (matchingSpeciesImage) {
            updatedCharacterData.species = {
              name: speciesData.name,
              image: matchingSpeciesImage.image,
              id: speciesId,
            };
          }
        }

        // Fetch data for homeworld
        if (updatedCharacterData?.homeworld.length !== 0) {
          const homeworldResponse = await fetch(updatedCharacterData.homeworld);
          const homeworldData = await homeworldResponse.json();
          console.log('HOMEWORLD DATA:', homeworldData);

          const homeworldId = homeworldData.url.split('/').slice(-2, -1)[0];
          const matchingHomeworldImage = PlanetsImageArray.find(
            (img) => img.id === parseInt(homeworldId, 10)
          );

          if (matchingHomeworldImage) {
            updatedCharacterData.homeworld = {
              id: homeworldId,
              name: homeworldData.name,
              image: matchingHomeworldImage.image,
            };
          }
        }

        // Fetch data for films
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

        updatedCharacterData.films = filmsData;

        // Fetch data for starships
        const starshipPromises = updatedCharacterData.starships.map(async (starshipUrl) => {
          const starshipResponse = await fetch(starshipUrl);
          const starshipData = await starshipResponse.json();

          // Extract the ID from the starship URL
          const starshipId = starshipUrl.split('/').slice(-2, -1)[0];

          // Find the corresponding image from 'StarshipImageArray' using the ID
          const matchingStarshipImage = StarshipImageArray.find(
            (img) => img.id === parseInt(starshipId, 10)
          );

          // Return the starship data with name, ID, and image
          return {
            name: starshipData.name,
            id: starshipId,
            image: matchingStarshipImage ? matchingStarshipImage.image : null,
          };
        });

        const starshipsData = await Promise.all(starshipPromises);

        updatedCharacterData.starships = starshipsData;

        // Fetch data for vehicles (similar to starships)
        const vehiclePromises = updatedCharacterData.vehicles.map(async (vehicleUrl) => {
          const vehicleResponse = await fetch(vehicleUrl);
          const vehicleData = await vehicleResponse.json();

          // Extract the ID from the vehicle URL
          const vehicleId = vehicleUrl.split('/').slice(-2, -1)[0];

          // Find the corresponding image from 'VehicleImageArray' using the ID
          const matchingVehicleImage = VehicleImageArray.find(
            (img) => img.id === parseInt(vehicleId, 10)
          );

          // Return the vehicle data with name, ID, and image
          return {
            name: vehicleData.name,
            id: vehicleId,
            image: matchingVehicleImage ? matchingVehicleImage.image : null,
          };
        });

        const vehiclesData = await Promise.all(vehiclePromises);

        updatedCharacterData.vehicles = vehiclesData;

        // Save character data to local storage for caching
        localStorage.setItem(cacheKey, JSON.stringify(updatedCharacterData));

        setIsLoading(false);
        setCharacterData(updatedCharacterData);
      } catch (error) {
        console.error('Error fetching character data:', error);
        setIsLoading(false); // Set loading to false in case of an error
      }
    }

    // Fetch data only once when characterData is null
    if (!characterData) {
      fetchCharacterData();
    }
  }, [characterId, characterData, cacheKey, cachedCharacterData]);

  if (isLoading) {
    // Render loading text while data is being fetched
    return (
      <div className="CharacterPage">
          <div className="LoadingPanel">
              <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>  
      </div>
    );
  }

  console.log('UPDATED CHARACTER DATA AFTER FETCH:', characterData);

  if (!selectedCharacter) {
    return <div>Character not found.</div>;
  }

  const characterImage = CharacterImageArray.find((img) => img.id == characterId);

  return (
    <div className="CharacterPage">
      <div className="CharacterPageContainer">
        <div className="CharacterPageMain">
          <img className="CharacterPageImage" src={characterImage.image} alt="Character" />
          <div className="CharacterPagePanel1">
            <h1 className="IndividualPageMainHeader">{selectedCharacter.name}</h1>
            {characterData && (
              <div className="CharacterPageMainPanelContainer">
                <div className="IndividualPagePanel1Row1">
                  <div>
                    {(characterData.species !== "0" && characterData.species !== null && characterData.species !== "null" && characterData.species !== "unknown" && characterData.species !== "none" && characterData.species !== undefined && characterData.species?.length !== 0) && (
                      <div style={{ whiteSpace: 'nowrap' }}>
                        <div className="Panel1Row1A">Species&nbsp;</div>
                        <Link
                          className="InterpageLink"
                          to={{ pathname: `/species/${characterData.species.id}` }}
                          state={{ speciesData: characterData.species }}
                        >
                          <div className = "Panel1Row1B">{characterData.species.name}</div>
                        </Link>
                      </div>
                    )}
                  </div>
                  <div>
                    {(characterData.homeworld !== "0" && characterData.homeworld !== null && characterData.homeworld !== "null" && characterData.homeworld !== "unknown" && characterData.homeworld !== "none" && characterData.homeworld !== undefined && characterData.homeworld?.length !==0) && (
                      <div style={{ whiteSpace: 'nowrap' }}>
                        <div className="Panel1Row1A">Homeworld&nbsp;</div>
                        <Link
                          className="InterpageLink" 
                          to={{ pathname: `/planets/${characterData.homeworld.id}` }}
                          state={{ planetsData: characterData.homeworld }}
                        >
                          <div className="Panel1Row1B">{characterData.homeworld.name}</div>
                        </Link>
                      </div>
                    )}
                  </div>
                  <div>
                    {(characterData.birthYear !== "0" && characterData.birthYear !== null && characterData.birthYear !== "null" && characterData.birthYear !== "none" && characterData.birthYear !== undefined) && (<div className="Panel1Row1A">Birth Year<div className="Panel1Row1B">{characterData.birthYear}</div></div>)}
                  </div>
                  {(characterData.gender !== "0" && characterData.gender !== null && characterData.gender !== "null" && characterData.gender !== undefined) && (<div className="Panel1Row1A">Gender<div className="Panel1Row1B">{characterData.gender}</div></div>)}
                </div>
                <div className="IndividualPagePanel1Row2">
                  {(characterData.height !== "0" && characterData.height !== null && characterData.height !== "null" && characterData.height !== "unknown" && characterData.height !== "none" && characterData.height !== undefined) && (<div className="Panel1Row2A">Height<div className="Panel1Row2B">{characterData.height}</div></div>)}
                  {(characterData.mass !== "0" && characterData.mass !== null && characterData.mass !== "null" && characterData.mass !== "unknown" && characterData.mass !== "none" && characterData.mass !== undefined) && (<div className="Panel1Row2A">Mass<div className="Panel1Row2B">{characterData.mass}</div></div>)}
                  {(characterData.hairColor !== "0" && characterData.hairColor !== null && characterData.hairColor !== "null" && characterData.hairColor !== "unknown" && characterData.hairColor !== "none" && characterData.hairColor !== undefined) && (<div className="Panel1Row2A">Hair Color<div className="Panel1Row2B">{characterData.hairColor}</div></div>)}
                  {(characterData.skinColor !== "0" && characterData.skinColor !== null && characterData.skinColor !== "null" && characterData.skinColor !== "unknown" && characterData.skinColor !== "none" && characterData.skinColor !== undefined) && (<div className="Panel1Row2A">Skin Color<div className="Panel1Row2B">{characterData.skinColor}</div></div>)}
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="CharacterPageLower">
          <div className="CharacterPagePanel2">
            <h1 className="IndividualPageLowerPanelHeader">Films</h1>
            {characterData && (
              <div className="FilmList">
                {characterData.films.map((film) => (
                  <div className="FilmListItem" key={film.id}>
                    <Link
                      className="InterpageLink"
                      to={{ pathname: `/films/${film.id}` }}
                      state={{ filmsData: characterData.films }}
                    >
                      {film.image && <img src={film.image} alt={film.name} />}
                      <div>{film.name}</div>
                    </Link>
                  </div>
                ))}
                {characterData.films.length === 0 && (
                  <div className="IndividualPageNoDataFound">No Films Data</div>
                )}
              </div>
            )}
          </div>
          <div className="CharacterPagePanel3">
            <h1 className="IndividualPageLowerPanelHeader">Vehicles</h1>
            {characterData && (
              <div className="VehicleList">
                {characterData.vehicles.map((vehicle, index) => (
                  <div className="VehicleListItem" key={index}>
                    <Link
                      className="InterpageLink"
                      to={{ pathname: `/vehicles/${vehicle.id}` }}
                      state={{ vehiclesData: characterData.vehicles }}
                    >
                      {vehicle.image && <img src={vehicle.image} alt={vehicle.name} />}
                      <div>{vehicle.name}</div>
                    </Link>
                  </div>
                ))}
                {characterData.vehicles.length === 0 && (
                  <div className="IndividualPageNoDataFound">No Vehicle Data</div>
                )}
              </div>
            )}
          </div>
          <div className="CharacterPagePanel4">
            <h1 className="IndividualPageLowerPanelHeader">Starships</h1>
            {characterData && (
              <div className="StarshipList">
                {characterData.starships.map((starship, index) => (
                  <div className="StarshipListItem" key={index}>
                    <Link
                      className="InterpageLink"
                      to={{ pathname: `/starships/${starship.id}` }}
                      state={{ starshipsData: characterData.starships }}
                    >
                      {starship.image && <img src={starship.image} alt={starship.name} />}
                      <div>{starship.name}</div>
                    </Link>
                  </div>
                ))}
                {characterData.starships.length === 0 && (
                  <div className="IndividualPageNoDataFound">No Starships Data</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

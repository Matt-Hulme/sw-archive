import React, { useState, useEffect } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import FilmImageArray from './FilmImageArray'
import CharacterImageArray from '../Character/CharacterImageArray';
import SpeciesImageArray from '../Species/SpeciesImageArray';
import PlanetImageArray from '../Planet/PlanetImageArray';
import StarshipImageArray from '../Starship/StarshipImageArray';
import VehicleImageArray from '../Vehicle/VehicleImageArray';

export default function FilmPage() {
  const [filmData, setFilmData] = useState(null);
  const { filmId } = useParams();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  console.log('Location State', location.state.filmsData)
  const filmsData = location.state?.filmsData || [];
  console.log('filmsData:', filmsData);

  let selectedFilm = null;


  if (filmsData.length > 1) {
    selectedFilm = filmsData.find((film) => film.id == parseInt(filmId, 10));
  } else {
    selectedFilm = filmsData[0];
  }

  console.log('selectedFilm:', selectedFilm)
  console.log('selected Film ID:', selectedFilm.id)

  selectedFilm.UrlId = null;
  switch (selectedFilm.id) {
    case 1:
      selectedFilm.UrlId = 4;
      break;
    case 2:
      selectedFilm.UrlId = 5;
      break;
    case 3:
      selectedFilm.UrlId = 6;
      break;
    case 4:
      selectedFilm.UrlId = 1;
      break;
    case 5:
      selectedFilm.UrlId = 2;
      break;
    case 6:
      selectedFilm.UrlId = 3;
      break;
    default:
      console.log('default case')
      break;
  }

console.log('Film URL Id:', selectedFilm.UrlId)

  useEffect(() => {
    async function fetchFilmData() {
      const filmUrl = `https://swapi.dev/api/films/${selectedFilm.UrlId}`;
      try{
        const response = await fetch(filmUrl);
        const data = await response.json();
        console.log('filmData Initial Fetch:', data);

        if (Object.keys(data).length === 0) {
          setIsLoading(false); // Set loading to false
          return; // Exit if no data
        }

        const updatedFilmData = {
          director: data.director,
          producer: data.producer,
          releaseDate: data.release_date,
          openingCrawl: data.opening_crawl,
          characters: data.characters,
          planets: data.planets,
          starships: data.starships,
          vehicles: data.vehicles,
          species: data.species
        }

        const charactersPromises = data.characters.map(async(characterUrl) => {
          const characterResponse = await fetch(characterUrl);
          const characterData = await characterResponse.json();

          const characterId = characterUrl.split('/').slice(-2, -1)[0];``

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

        updatedFilmData.characters = charactersData;


        
        const planetsPromises = data.planets.map(async(planetUrl) =>{
          const planetResponse = await fetch(planetUrl);
          const planetData = await planetResponse.json();

          const planetId = planetUrl.split('/').slice(-2, -1)[0];
          
          const matchingPlanetImage = PlanetImageArray.find(
            (img) => img.id === parseInt(planetId, 10)
          );
            
            return{
              name: planetData.name,
              id: planetId,
              image: matchingPlanetImage ? matchingPlanetImage.image : null,
            };
        });

        const planetsData = await Promise.all(planetsPromises);

        updatedFilmData.planets = planetsData;



        const vehiclesPromises = data.vehicles.map(async(vehicleUrl) => {
          const vehicleResponse = await fetch(vehicleUrl);
          const vehicleData = await vehicleResponse.json();

          const vehicleId = vehicleUrl.split('/').slice(-2, -1)[0];

          const matchingVehicleImage = VehicleImageArray.find(
            (img) => img.id === parseInt(vehicleId, 10)
          );

          return {
            name: vehicleData.name,
            id: vehicleId,
            image: matchingVehicleImage ? matchingVehicleImage.image : null,
          };
        });

        const vehiclesData = await Promise.all(vehiclesPromises);

        updatedFilmData.vehicles = vehiclesData;



        const starshipsPromises = data.starships.map(async(starshipUrl) => {
          const starshipResponse = await fetch(starshipUrl);
          const starshipData = await starshipResponse.json();

          const starshipId = starshipUrl.split('/').slice(-2, -1)[0];

          const matchingStarshipImage = StarshipImageArray.find(
            (img) => img.id === parseInt(starshipId, 10)
          );

          return {
            name: starshipData.name,
            id: starshipId,
            image: matchingStarshipImage ? matchingStarshipImage.image : null,
          };
        });
        
        const starshipsData = await Promise.all(starshipsPromises);

        updatedFilmData.starships = starshipsData;



        const speciesPromises = data.species.map(async(speciesUrl) => {
          const speciesResponse = await fetch(speciesUrl);
          const speciesData = await speciesResponse.json();

          const speciesId = speciesUrl.split('/').slice(-2, -1)[0];

          const matchingSpeciesImage = SpeciesImageArray.find(
            (img) => img.id === parseInt(speciesId, 10)
          );

          return {
            name: speciesData.name,
            id: speciesId,
            image: matchingSpeciesImage ? matchingSpeciesImage.image : null,
          }

        });

        const speciesData = await Promise.all(speciesPromises);

        updatedFilmData.species = speciesData;

        setIsLoading(false);  
        setFilmData(updatedFilmData);
        
      } catch (error){
        console.error('Error fetching Film data:', error);
        setIsLoading(false);
      }
    }

    if (!filmData) {
      fetchFilmData();
    }
  }, [filmId, filmData]);

  if (isLoading){
    return(
      <div className="FilmPage">
        <div className="FilmPageContainer">
          <div className="FilmPageMain">
            <div className ="FilmPagePanel1">
              <h1>Film Loading...</h1>
            </div>
          </div>
          <div className="FilmPageLower">
            <div className="FilmPagePanel2">
              <h1>Characters Loading...</h1>
            </div>
            <div className="FilmPagePanel3">
              <h1>Planets Loading...</h1>
          </div>
            <div className="FilmPagePanel4">
              <h1>Species Loading...</h1>
            </div>
            <div className="FilmPagePanel5">
              <h1>Vehicles Loading...</h1>
            </div>
            <div className="FilmPagePanel6">
              <h1>Starships Loading...</h1>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  console.log('UPDATED FILM DATA AFTER FETCH:', filmData);

  if (!selectedFilm) {
    return <div>Film not found.</div>;
  }

  const filmImage = FilmImageArray.find(img => img.id == filmId)

  return (
    <div className="FilmPage">
      <div className="FilmPageContainer">
        <div className="FilmPageMain">
          <img className="FilmPageImage" src={filmImage.image} alt="Film"/>
          <div className ="FilmPagePanel1">
            <h1>{selectedFilm.name}</h1>
            {filmData && (
              <div className="FilmPageMainPanelContainer">
                <div>Director: {filmData.director}</div>
                <div>Producers: {filmData.producer}</div>
                <div>Release Date: {filmData.releaseDate}</div>
                <div>Opening Crawl: {filmData.openingCrawl}</div>
              </div>
            )}
          </div>
        </div>
        <div className="FilmPageLower">
          <div className="FilmPagePanel2">
            <h1>Characters</h1>
            {filmData && (
              <div className="CharacterList">
                {filmData.characters.map((character, index) => (
                  <div className="CharacterListItem" key={index}>
                    <Link
                      to ={{pathname: `/characters/${character.id}`}}
                      state ={{charactersData: filmData.characters}}
                    >
                      {character.image && <img src={character.image} />} 
                    <div>{character.name}</div>
                    </Link>
                  </div>
                ))}
                {filmData.characters.length === 0 && (
                  <div className>No Characters Data</div>
                )}
              </div>
            )}
          </div>
          <div className="FilmPagePanel3">
            <h1>Planets</h1>
            {filmData && (
              <div className="PlanetList">
                {filmData.planets.map ((planet, index) => (
                  <div className="PlanetListItem" key={index}>
                    <Link
                      to ={{pathname: `/planets/${planet.id}`}}
                      state={{planetsData: filmData.planets}}
                    >
                      {planet.image && <img src={planet.image} alt={planet.name} />}
                      <div>{planet.name}</div>
                    </Link>
                  </div>
                ))}
                {filmData.planets.length === 0 && (
                  <div className>No Planets Data</div>
                )}
              </div>
            )}
         </div>
          <div className="FilmPagePanel4">
            <h1>Species</h1>
            {filmData && (
              <div className="SpeciesList">
                {filmData.species.map((species, index) => (
                  <div className="SpeciesListItem" key={index}>
                    <Link
                      to={{pathname: `/species/${species.id}`}}
                      state={{speciesData: filmData.species}}
                    >
                      {species.image && <img src={species.image} alt={species.name} />}
                      <div>{species.name}</div>
                    </Link>
                  </div>
                ))}
                {filmData.species.length === 0 && (
                  <div className>No Species Data</div>
                )}
              </div>
            )}
          </div>
          <div className="FilmPagePanel5">
            <h1>Vehicles</h1>
            {filmData && (
              <div className="VehicleList">
                {filmData.vehicles.map((vehicle, index) => (
                  <div className="VehicleListItem" key={index}>
                    <Link
                      to={{pathname: `/vehicles/${vehicle.id}`}}
                      state={{vehiclesData: filmData.vehicles}}
                    >
                      {vehicle.image && <img src={vehicle.image} alt={vehicle.name} />}
                      <div>{vehicle.name}</div>
                    </Link>
                  </div>
                ))}
                {filmData.vehicles.length === 0 && (
                  <div>No Vehicles Data</div>
                )}              
              </div>
            )}
          </div>
          <div className="FilmPagePanel6">
            <h1>Starships</h1>
            {filmData && (
              <div className="StarshipList">
                {filmData.starships.map((starship, index) => (
                  <div className="StarshipListItem" key={index}>
                    <Link
                      to={{pathname: `/starships/${starship.id}`}}
                      state={{starshipsData: filmData.starships}}
                    >
                      {starship.image && <img src={starship.image} alt={starship.name} />}
                      <div>{starship.name}</div>
                    </Link>
                  </div>
                ))}
                {filmData.starships.length === 0 && (
                  <div>No Starships Data</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

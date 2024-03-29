import React, { useState, useEffect, useMemo } from 'react';
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
  const [isLoading, setIsLoading] = useState(true);

  const speciesData = location.state?.speciesData || [];
  console.log('speciesData:', speciesData)

  let selectedSpecies = null;

  if (speciesData.length > 1){
    selectedSpecies = speciesData.find((species) => species.id == parseInt(speciesId, 10));
  } else {
    selectedSpecies = speciesData;
  }

  console.log("selectedSpecies", selectedSpecies)

  const cacheKey = `specieData_${speciesId}`;

  const cachedSpecieData = useMemo(() => {
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      return JSON.parse(cachedData);
    }

    return null;
  }, [cacheKey]);
 
  useEffect(() => {

    if (cachedSpecieData) {
      setSpecieData(cachedSpecieData);
      setIsLoading(false);
      return;
    }


    async function fetchSpecieData(){
      const specieUrl = `https://swapi.dev/api/species/${speciesId}`;
      try {
        const response = await fetch(specieUrl);
        const data = await response.json();
        console.log('specieData Initial Fetch:', data);

        if (Object.keys(data).length === 0) {
          setIsLoading(false); // Set loading to false
          return; // Exit if no data
        }

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

        console.log('updatedSpecieData:', updatedSpecieData)
        
        if (updatedSpecieData?.homeworld !==null){
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

        localStorage.setItem(cacheKey, JSON.stringify(updatedSpecieData));

        setIsLoading(false);
        setSpecieData(updatedSpecieData);
        
      } catch (error){
        console.error('Error fetching Species Data:', error);
        setIsLoading(false);
      }
    }

    if (!specieData){
      fetchSpecieData();
    }
  }, [speciesId, specieData])

  if (isLoading) {
    // Render loading text while data is being fetched
    return (
      <div className="SpeciePage">
          <div className="LoadingPanel">
              <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>  
      </div>
    );
  }

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
            <h1 className="IndividualPageMainHeader">{selectedSpecies.name}</h1>
            {specieData && (
              <div className="SpeciePageMainPanelContainer">
                <div className="IndividualPagePanel1Row1" id="SpeciePagePanel1Row1">
                  {(specieData.classification !=="0" && specieData.classification !==null && specieData.classification !=="null" && specieData.classification !=="unknown" && specieData.classification !=="none" && specieData.classificationclassification !==undefined) && (<div className="Panel1Row1A">Classification<div className="Panel1Row1B">{specieData.classificationclassification}</div></div>)}
                  {(specieData.designation !=="0" && specieData.designation !==null && specieData.designation !=="null" && specieData.designation !=="unknown" && specieData.designation !=="none" && specieData.designation !==undefined) && (<div className="Panel1Row1A">Designation<div className="Panel1Row1B">{specieData.designation}</div></div>)}
                  {(specieData.height !=="0" && specieData.height !==null && specieData.height !=="null" && specieData.height !=="unknown" && specieData.height !=="none" && specieData.height !==undefined) && (<div className="Panel1Row1A">Height<div className="Panel1Row1B">{specieData.height}</div></div>)}
                  {(specieData.lifespan !=="0" && specieData.lifespan !==null && specieData.lifespan !=="null" && specieData.lifespan !=="unknown" && specieData.lifespan !=="none" && specieData.lifespan !==undefined) && (<div className="Panel1Row1A">Lifespan<div className="Panel1Row1B">{specieData.lifespan}</div></div>)}
                  {(specieData.language !=="0" && specieData.language !==null && specieData.language !=="null" && specieData.language !=="unknown" && specieData.language !==undefined) && (<div className="Panel1Row1A">Language<div className="Panel1Row1B">{specieData.language}</div></div>)}
                  <div>
                    {specieData.homeworld && (
                      <div>
                        <div className="Panel1Row1A">Homeworld</div>
                        <Link
                          className="InterpageLink"   
                          to={{pathname: `/planets/${specieData.homeworld.id}`}}
                          state={{ planetsData: specieData.homeworld}}
                        >
                          <div className="Panel1Row1B">{specieData.homeworld.name}</div>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
                <div className="IndividualPagePanel1Row2" id="SpeciePagePanel1Row2">
                  {(specieData.skinColor !=="0" && specieData.skinColor !==null && specieData.skinColor !=="null" && specieData.skinColor !=="unknown" && specieData.skinColor !=="none" && specieData.skinColor !==undefined) && (<div className="Panel1Row2A">Skin Colors<div className="Panel1Row2B">{specieData.skinColor}</div></div>)}
                  {(specieData.hairColor !=="0" && specieData.hairColor !==null && specieData.hairColor !=="null" && specieData.hairColor !=="unknown" && specieData.hairColor !=="none" && specieData.hairColor !==undefined) && (<div className="Panel1Row2A">Hair Colors<div className="Panel1Row2B">{specieData.hairColor}</div></div>)}
                  {(specieData.eyeColor !=="0" && specieData.eyeColor !==null && specieData.eyeColor !=="null" && specieData.eyeColor !=="unknown" && specieData.eyeColor !=="none" && specieData.eyeColor !==undefined) && (<div className="Panel1Row2A">Eye Colors<div className="Panel1Row2B">{specieData.eyeColor}</div></div>)}
                </div>
                
              </div>
            )}
          </div>
        </div>
        <div className="SpeciePageLower">
          <div className="SpeciePagePanel2">
            <h1 className="IndividualPageLowerPanelHeader">Characters</h1>
            {specieData && (
              <div className="CharacterList">
                {specieData.characters.map((character, index) => (
                  <div className="CharacterListItem" key={index}>
                    <Link
                      className="InterpageLink"
                      to ={{pathname: `/characters/${character.id}`}}
                      state ={{charactersData: specieData.characters}}
                    >
                      {character.image && <img src={character.image} />} 
                    <div>{character.name}</div>
                    </Link>
                  </div>
                ))}
                {specieData.characters.length === 0 && (
                  <div className="IndividualPageNoDataFound">No Characters Data</div>
                )}
              </div>
            )}
          </div>
          <div className="SpeciePagePanel3">
            <h1 className="IndividualPageLowerPanelHeader">Films</h1>
            {specieData && (
              <div className="FilmList">
                {specieData.films.map((film) => (
                  <div className="FilmListItem" key={film.id}>
                    <Link
                      className="InterpageLink"
                      to={{pathname: `/films/${film.id}`}}
                      state={{ filmsData: specieData.films}}
                    >
                      {film.image && <img src={film.image} alt={film.name} />}
                      <div>{film.name}</div>
                    </Link>
                  </div>
                ))}
                {specieData.films.length === 0 && (
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


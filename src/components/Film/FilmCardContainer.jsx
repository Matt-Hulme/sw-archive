import React, { useState, useEffect } from 'react';
import FilmCard from './FilmCard.jsx';

export default function FilmCardContainer () {
  const [filmsData, setFilmsData] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  const [buttonText, setButtonText] = useState("See More");

  useEffect(() => {
    const cachedFilmsData = localStorage.getItem('filmsData');
    if (cachedFilmsData) {
      const parsedData = JSON.parse(cachedFilmsData);
      setFilmsData(parsedData);
      console.log(cachedFilmsData);
    } else {
      handleFetchMore('https://swapi.dev/api/films/');
    }
  }, []);

  const handleFetchMore = (initialUrl) => {
    if ( initialUrl && fetchCount === 0) {
      fetchFilms(initialUrl);
      setFetchCount(1);
      initialUrl=null;
    }
  };

  const fetchFilms = async (url) => {
    setButtonText("Loading...");
    try {
      const response = await fetch(url);
      const data = await response.json();
      const films = data.results.map((film) => ({
        name: film.title,
        id: film.id,
      }));
      const updatedFilmsData = [...filmsData, ...films];
      console.log("Updated films data:", updatedFilmsData);
      setFilmsData(updatedFilmsData);
      setFetchCount(0);

      localStorage.setItem('filmsData', JSON.stringify(updatedFilmsData));
    } catch (error) {
      console.error('Error fetching films:', error);
    }
    setIsDataLoaded(false);
    setButtonText("See More");
    console.log(filmsData);
  } 

  return (
    <>
      <div className="FilmCardContainer">
        {filmsData
          .map((film, index) => (
            <FilmCard key={index} film={film} />
          ))}
      </div>
    </>
  );
}
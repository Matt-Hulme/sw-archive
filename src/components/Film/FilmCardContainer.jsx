import React, { useState, useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import FilmCard from './FilmCard.jsx';
import FilmPage from './FilmPage.jsx';
import FilmImageArray from './FilmImageArray'

export default function FilmCardContainer() {
  const [filmsData, setFilmsData] = useState([]);
  const [fetchCount, setFetchCount] = useState(0);
  const [isDataLoaded, setIsDataLoaded] = useState(true);
  const [buttonText, setButtonText] = useState("See More");

  useEffect(() => {
    const cachedFilmsData = localStorage.getItem('filmsData');
    if (cachedFilmsData) {
      const parsedData = JSON.parse(cachedFilmsData);
      setFilmsData(parsedData);
    } else {
      handleFetchMore('https://swapi.dev/api/films/');
    }
  }, []);

  const handleFetchMore = (initialUrl) => {
    if (initialUrl && fetchCount === 0) {
      fetchFilms(initialUrl);
      setFetchCount(1);
      initialUrl = null;
    }
  };

  const fetchFilms = async (url) => {
    setButtonText("Loading...");
    try {
      const response = await fetch(url);
      const data = await response.json();
      const films = data.results.map((film) => ({
        name: film.title,
        id: film.episode_id,
      }));
      const updatedFilmsData = [...filmsData, ...films];
      setFilmsData(updatedFilmsData);
      setFetchCount(0);

      localStorage.setItem('filmsData', JSON.stringify(updatedFilmsData));
    } catch (error) {
      console.error('Error fetching films:', error);
    }
    setIsDataLoaded(false);
    setButtonText("See More");
  } 
  console.log("Films Data", filmsData)

  return (
  <>
    <div className="FilmCardContainer">
      {filmsData.length > 0 && filmsData.map((film, index) => (
        <Link
          key={index}
          to={`/films/${film.id}`}
          state={{ filmsData }}
        >
          <FilmCard key={index} film={film} />
        </Link>
      ))}
    </div>
  </>
);
}

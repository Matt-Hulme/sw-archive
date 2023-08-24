import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import FilmImageArray from './FilmImageArray'

export default function FilmPage() {
  const { filmId } = useParams();
  const location = useLocation();

  const filmsData = location.state?.filmsData || [];
  const selectedFilm = filmsData.find((film) => film.id === Number(filmId));

  if (!selectedFilm) {
    return <div>Film not found.</div>;
  }

  const filmImage = FilmImageArray[selectedFilm.id - 1];

  return (
    <div className="FilmPage">
      <h2>{selectedFilm.name}</h2>
      <img className="FilmPageImage" src={filmImage} alt="Film" />
    </div>
  );
}

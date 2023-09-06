import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import FilmImageArray from './FilmImageArray'

export default function FilmPage() {
  const { filmId } = useParams();
  const location = useLocation();

  const filmsData = location.state?.filmsData || [];
  console.log('filmsData:', filmsData);

  let selectedFilm = [];
  filmsData.length > 1 ? selectedFilm = filmsData.find((film) => film.id == parseInt(filmId, 10)) : selectedFilm = filmsData;
  console.log('selectedFilm:', selectedFilm);

  if (!selectedFilm) {
    return <div>Film not found.</div>;
  }

  const filmImage = FilmImageArray.find(img => img.id == filmId)

  return (
    <div className="FilmPage">
      <h2>{selectedFilm.name}</h2>
      <img className="FilmPageImage" src={filmImage.image} alt="Film" />
    </div>
  );
}

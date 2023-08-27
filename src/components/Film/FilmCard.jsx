import React from 'react';
import FilmImageArray from './FilmImageArray'

export default function FilmCard({ film }) {
  return (
    <div className="FilmCard" style={{ backgroundImage: `url(${FilmImageArray[film.id - 1]}`}}>
      <h3>{film.name}</h3>
    </div>
  );
}
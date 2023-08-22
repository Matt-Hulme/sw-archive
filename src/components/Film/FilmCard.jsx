import React from 'react';
import FilmImageArray from './FilmImageArray'

export default function FilmCard({ film }) {
  return (
    <div className="FilmCard">
      <h3>{film.name}</h3>
      <img src={FilmImageArray[film.id - 1]} alt="Image Not Available" />
    </div>
  );
}
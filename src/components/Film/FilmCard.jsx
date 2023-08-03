import React from 'react';
import FilmImage1 from '../../assets/Images/FilmCardImages/1.webp';
import FilmImage2 from '../../assets/Images/FilmCardImages/2.webp';
import FilmImage3 from '../../assets/Images/FilmCardImages/3.webp';
import FilmImage4 from '../../assets/Images/FilmCardImages/4.webp';
import FilmImage5 from '../../assets/Images/FilmCardImages/5.webp';
import FilmImage6 from '../../assets/Images/FilmCardImages/6.webp';

const filmImageArray = [
  FilmImage1,
  FilmImage2,
  FilmImage3,
  FilmImage4,
  FilmImage5,
  FilmImage6
]

export default function FilmCard({ film }) {

  return (
    <div className="FilmCard">
      <h3>{film.name}</h3>
      <img src={filmImageArray[film.id - 1]} alt='Image Not Available' />
    </div>
  );
}

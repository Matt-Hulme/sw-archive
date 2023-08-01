import React from 'react';
import image1 from '../../assets/Images/FilmCardImages/1.webp';
import image2 from '../../assets/Images/FilmCardImages/2.webp';
import image3 from '../../assets/Images/FilmCardImages/3.webp';
import image4 from '../../assets/Images/FilmCardImages/4.webp';
import image5 from '../../assets/Images/FilmCardImages/5.webp';
import image6 from '../../assets/Images/FilmCardImages/6.webp';

const imageUrlArray = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6
]

export default function FilmCard({ film }) {

  return (
    <div className="FilmCard">
      <h3>{film.name}</h3>
      <img src={imageUrlArray[film.id - 1]} alt='Image Not Available' />
    </div>
  );
}

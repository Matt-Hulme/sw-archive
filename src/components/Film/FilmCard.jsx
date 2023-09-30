import React from 'react';
import FilmImageArray from './FilmImageArray'



export default function FilmCard({ film }) {
  const filmImage = FilmImageArray.find(img => img.id == film.id);
  
  return (
    <div className="FilmCard" style={{ backgroundImage: `url(${filmImage ? filmImage.image : '/src/assets/images/Image-Not-Found-2.jpg'})` }}>
      <h3 className="FilmCardName">{film.name}</h3>
    </div>
  );
}
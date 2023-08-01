import React from 'react';
import NavBar from '../../NavBar.jsx';
import FilmCardContainer from 'src/Components/Film/FilmCardContainer.jsx';

export default function FilmsPage() {
  return (
    <div className="FilmsPage">
        <NavBar />
        <FilmCardContainer />
    </div>
  );
}

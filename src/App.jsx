import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Pages/Layout.jsx';
import HomePage from './components/Pages/HomePage.jsx';
import CharactersPage from './components/Pages/CharactersPage.jsx';
import CharacterPage from './components/Character/CharacterPage.jsx';
import FilmsPage from './components/Pages/FilmsPage.jsx';
import FilmPage from './components/Film/FilmPage.jsx';
import PlanetsPage from './components/Pages/PlanetsPage.jsx';
import SpeciesPage from './components/Pages/SpeciesPage.jsx';
import StarshipsPage from './components/Pages/StarshipsPage.jsx';
import VehiclesPage from './components/Pages/VehiclesPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="characters" element={<CharactersPage />} />
          <Route path="characters/:characterId" element={<CharacterPage />} /> 
          <Route path="films" element={<FilmsPage />} />
          <Route path="films/:filmId" element={<FilmPage />} /> 
          <Route path="planets" element={<PlanetsPage />} />
          <Route path="species" element={<SpeciesPage />} />
          <Route path="starships" element={<StarshipsPage />} />
          <Route path="vehicles" element={<VehiclesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

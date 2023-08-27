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
import PlanetPage from './components/Planet/PlanetPage.jsx'
import SpeciesPage from './components/Pages/SpeciesPage.jsx';
import SpeciePage from './components/Species/SpeciePage.jsx';
import StarshipsPage from './components/Pages/StarshipsPage.jsx';
import StarshipPage from './components/Starship/StarshipPage.jsx';
import VehiclesPage from './components/Pages/VehiclesPage.jsx';
import VehiclePage from './components/Vehicle/VehiclePage.jsx';

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
          <Route path="planets/:planetId" element={<PlanetPage />} /> 
          <Route path="species" element={<SpeciesPage />} />
          <Route path="species/:speciesId" element={<SpeciePage />} />
          <Route path="starships" element={<StarshipsPage />} />
          <Route path="starships/:starshipId" element={<StarshipPage />} />
          <Route path="vehicles" element={<VehiclesPage />} />
          <Route path="vehicles/:vehicleId" element={<VehiclePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

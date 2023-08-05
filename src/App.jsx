import React, { useState } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import Layout from './components/pages/layout.jsx'
import HomePage from './components/Pages/HomePage.jsx';
import CharactersPage from './components/Pages/CharactersPage.jsx';
import FilmsPage from './components/Pages/FilmsPage.jsx';
import PlanetsPage from './components/Pages/PlanetsPage.jsx';
import SpeciesPage from './components/Pages/SpeciesPage.jsx';
import StarshipsPage from './components/Pages/StarshipsPage.jsx';
import VehiclesPage from './components/Pages/VehiclesPage.jsx';


export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path ="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="characters" element={<CharactersPage />} />
          <Route path="films" element={<FilmsPage />} />
          <Route path="planets" element={<PlanetsPage />} />
          <Route path="species" element={<SpeciesPage />} />
          <Route path="starships" element={<StarshipsPage />} />
          <Route path="vehicles" element={<VehiclesPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}


import React, { useState } from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'src/App.css';
import Layout from 'src/components/pages/layout.jsx'
import HomePage from 'src/Components/Pages/HomePage.jsx';
import CharactersPage from 'src/Components/Pages/CharactersPage.jsx';
import FilmsPage from 'src/Components/Pages/FilmsPage.jsx';
import PlanetsPage from 'src/Components/Pages/PlanetsPage.jsx';
import SpeciesPage from 'src/Components/Pages/SpeciesPage.jsx';
import StarshipsPage from 'src/Components/Pages/StarshipsPage.jsx';
import VehiclesPage from 'src/Components/Pages/VehiclesPage.jsx';


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


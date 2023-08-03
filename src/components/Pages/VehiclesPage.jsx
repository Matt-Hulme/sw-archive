import React from 'react';
import NavBar from '../../NavBar.jsx';
import VehiclesCardContainer from '../Vehicle/VehicleCardContainer.jsx'

export default function VehiclesPage() {
  return (
    <div className="VehiclesPage">
        <NavBar />
        <VehiclesCardContainer />
    </div>
  );
}

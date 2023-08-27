import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import VehicleImageArray from './VehicleImageArray'

export default function VehiclePage() {
  const { vehicleId } = useParams(); 
  const location = useLocation();

  const vehiclesData = location.state?.vehiclesData || [];
  const selectedVehicle = vehiclesData.find((vehicle) => vehicle.id == parseInt(vehicleId, 10));
  console.log('Vehicles Data:', vehiclesData)
  console.log('selectedVehicle:', selectedVehicle)
 
  if (!selectedVehicle) {
    return <div>Vehicle not found.</div>;
  }

  const vehicleArrayId = selectedVehicle.arrayid;
  console.log('Array Id:', vehicleArrayId)
  const vehicleImage = VehicleImageArray[vehicleArrayId];

  return (
    <div className="VehiclePage">
      <h2>{selectedVehicle.name}</h2>
      <img className="VehiclePageImage" src={vehicleImage} alt="Vehicle" />
    </div>
  );
}


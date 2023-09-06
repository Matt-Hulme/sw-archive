import React from 'react';
import { useParams, useLocation } from 'react-router-dom';
import VehicleImageArray from './VehicleImageArray'

export default function VehiclePage() {
  const { vehicleId } = useParams(); 
  const location = useLocation();

  console.log('state:', location.state);

  const vehiclesData = location.state?.vehiclesData || [];
  console.log('vehiclesData:', vehiclesData);

  let selectedVehicle = [];
  vehiclesData.length > 1 ? selectedVehicle = vehiclesData.find((vehicle) => vehicle.id == parseInt(vehicleId, 10)) : selectedVehicle = vehiclesData;
  console.log('selectedVehicle:', selectedVehicle);
 
  if (!selectedVehicle) {
    return <div>Vehicle not found.</div>;
  }

  const vehicleImage = VehicleImageArray.find(img => img.id == vehicleId)
  console.log('vehicleImage:', vehicleImage)

  return (
    <div className="VehiclePage">
      <h2>{selectedVehicle.name}</h2>
      <img className="VehiclePageImage" src={vehicleImage.image} alt="Vehicle" />
    </div>
  );
}


import React from 'react';
import VehicleImageArray from './VehicleImageArray';



export default function VehicleCard ({ vehicle }) {
    const vehicleImage = VehicleImageArray.find(img => img.id == vehicle.id);

    return (
        <div className="VehicleCard" style={{ backgroundImage: `url(${vehicleImage ? vehicleImage.image : '/src/assets/images/Image-Not-Found-2.jpg'})` }}>
        <h3>{vehicle.name}</h3>
    </div>
    );
}
import React from 'react';
import VehicleImageArray from './VehicleImageArray';



export default function VehicleCard ({ vehicle }) {
    return (
        <div className="VehicleCard" style={{ backgroundImage: `url(${VehicleImageArray[vehicle.arrayid]})` }}>
        <h3>{vehicle.name}</h3>
    </div>
    );
}
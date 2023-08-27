import React from 'react';
import StarshipImageArray from './StarshipImageArray';

export default function StarshipCard({ starship, index }) {
    return (
        <div className="StarshipCard" style={{ backgroundImage: `url(${StarshipImageArray[index]})` }}>
            <h3>{starship.name}</h3>
        </div>
    );
}
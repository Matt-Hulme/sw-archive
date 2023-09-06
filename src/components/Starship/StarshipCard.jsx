import React from 'react';
import StarshipImageArray from './StarshipImageArray';

export default function StarshipCard({ starship, index }) {
    const starshipImage = StarshipImageArray.find(img => img.id == starship.id);

    return (
        <div className="StarshipCard" style={{ backgroundImage: `url(${starshipImage ? starshipImage.image : '/src/assets/images/Image-Not-Found-2.jpg'})` }}>
            <h3>{starship.name}</h3>
        </div>
    );
}
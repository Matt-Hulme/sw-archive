import React from 'react';
import SpeciesImage1 from '../../assets/Images/SpeciesCardImages1.webp'
import SpeciesImage2 from '../../assets/Images/SpeciesCardImages2.webp'
import SpeciesImage3 from '../../assets/Images/SpeciesCardImages3.webp'
import SpeciesImage4 from '../../assets/Images/SpeciesCardImages4.webp'
import SpeciesImage5 from '../../assets/Images/SpeciesCardImages5.webp'
import SpeciesImage6 from '../../assets/Images/SpeciesCardImages6.webp'
import SpeciesImage7 from '../../assets/Images/SpeciesCardImages7.webp'
import SpeciesImage8 from '../../assets/Images/SpeciesCardImages8.webp'
import SpeciesImage9 from '../../assets/Images/SpeciesCardImages9.webp'
import SpeciesImage10 from '../../assets/Images/SpeciesCardImages10.webp'
import SpeciesImage11 from '../../assets/Images/SpeciesCardImages11.webp'
import SpeciesImage12 from '../../assets/Images/SpeciesCardImages12.webp'
import SpeciesImage13 from '../../assets/Images/SpeciesCardImages13.webp'
import SpeciesImage14 from '../../assets/Images/SpeciesCardImages14.webp'
import SpeciesImage15 from '../../assets/Images/SpeciesCardImages15.webp'
import SpeciesImage16 from '../../assets/Images/SpeciesCardImages16.webp'
import SpeciesImage17 from '../../assets/Images/SpeciesCardImages17.webp'
import SpeciesImage18 from '../../assets/Images/SpeciesCardImages18.webp'
import SpeciesImage19 from '../../assets/Images/SpeciesCardImages19.webp'
import SpeciesImage20 from '../../assets/Images/SpeciesCardImages20.webp'
import SpeciesImage21 from '../../assets/Images/SpeciesCardImages21.webp'
import SpeciesImage22 from '../../assets/Images/SpeciesCardImages22.webp'
import SpeciesImage23 from '../../assets/Images/SpeciesCardImages23.webp'
import SpeciesImage24 from '../../assets/Images/SpeciesCardImages24.webp'
import SpeciesImage25 from '../../assets/Images/SpeciesCardImages25.webp'
import SpeciesImage26 from '../../assets/Images/SpeciesCardImages26.webp'
import SpeciesImage27 from '../../assets/Images/SpeciesCardImages27.webp'
import SpeciesImage28 from '../../assets/Images/SpeciesCardImages28.webp'
import SpeciesImage29 from '../../assets/Images/SpeciesCardImages29.webp'
import SpeciesImage30 from '../../assets/Images/SpeciesCardImages30.webp'
import SpeciesImage31 from '../../assets/Images/SpeciesCardImages31.webp'
import SpeciesImage32 from '../../assets/Images/SpeciesCardImages32.webp'
import SpeciesImage33 from '../../assets/Images/SpeciesCardImages33.webp'
import SpeciesImage34 from '../../assets/Images/SpeciesCardImages34.webp'
import SpeciesImage35 from '../../assets/Images/SpeciesCardImages35.webp'
import SpeciesImage36 from '../../assets/Images/SpeciesCardImages36.webp'
import SpeciesImage37 from '../../assets/Images/SpeciesCardImages37.webp'

const speciesImageArray = [
    SpeciesImage1,
    SpeciesImage2,
    SpeciesImage3,
    SpeciesImage4,
    SpeciesImage5,
    SpeciesImage6,
    SpeciesImage7,
    SpeciesImage8,
    SpeciesImage9,
    SpeciesImage10,
    SpeciesImage11,
    SpeciesImage12,
    SpeciesImage13,
    SpeciesImage14,
    SpeciesImage15,
    SpeciesImage16,
    SpeciesImage17,
    SpeciesImage18,
    SpeciesImage19,
    SpeciesImage20,
    SpeciesImage21,
    SpeciesImage22,
    SpeciesImage23,
    SpeciesImage24,
    SpeciesImage25,
    SpeciesImage26,
    SpeciesImage27,
    SpeciesImage28,
    SpeciesImage29,
    SpeciesImage30,
    SpeciesImage31,
    SpeciesImage32,
    SpeciesImage33,
    SpeciesImage34,
    SpeciesImage35,
    SpeciesImage36,
    SpeciesImage37,
]



export default function SpeciesCard ({ species }) {
    return (
        <div className="SpeciesCard">
            <h3>{species.name}</h3>
            <img src={speciesImageArray[species.id - 1]} alt='Image Not Available' />
        </div>
    );
}
import React from 'react';
import StarshipImage1 from '../../assets/Images/StarshipCardImages1.webp'
import StarshipImage2 from '../../assets/Images/StarshipCardImages2.webp'
import StarshipImage3 from '../../assets/Images/StarshipCardImages3.webp'
import StarshipImage4 from '../../assets/Images/StarshipCardImages4.webp'
import StarshipImage5 from '../../assets/Images/StarshipCardImages5.webp'
import StarshipImage6 from '../../assets/Images/StarshipCardImages6.webp'
import StarshipImage7 from '../../assets/Images/StarshipCardImages7.webp'
import StarshipImage8 from '../../assets/Images/StarshipCardImages8.webp'
import StarshipImage9 from '../../assets/Images/StarshipCardImages9.webp'
import StarshipImage10 from '../../assets/Images/StarshipCardImages10.webp'
import StarshipImage11 from '../../assets/Images/StarshipCardImages11.webp'
import StarshipImage12 from '../../assets/Images/StarshipCardImages12.webp'
import StarshipImage13 from '../../assets/Images/StarshipCardImages13.webp'
import StarshipImage14 from '../../assets/Images/StarshipCardImages14.webp'
import StarshipImage15 from '../../assets/Images/StarshipCardImages15.webp'
import StarshipImage16 from '../../assets/Images/StarshipCardImages16.webp'
import StarshipImage17 from '../../assets/Images/StarshipCardImages17.webp'
import StarshipImage18 from '../../assets/Images/StarshipCardImages18.webp'
import StarshipImage19 from '../../assets/Images/StarshipCardImages19.webp'
import StarshipImage20 from '../../assets/Images/StarshipCardImages20.webp'
import StarshipImage21 from '../../assets/Images/StarshipCardImages21.webp'
import StarshipImage22 from '../../assets/Images/StarshipCardImages22.webp'
import StarshipImage23 from '../../assets/Images/StarshipCardImages23.webp'
import StarshipImage24 from '../../assets/Images/StarshipCardImages24.webp'
import StarshipImage25 from '../../assets/Images/StarshipCardImages25.webp'
import StarshipImage26 from '../../assets/Images/StarshipCardImages26.webp'
import StarshipImage27 from '../../assets/Images/StarshipCardImages27.webp'
import StarshipImage28 from '../../assets/Images/StarshipCardImages28.webp'
import StarshipImage29 from '../../assets/Images/StarshipCardImages29.webp'
import StarshipImage30 from '../../assets/Images/StarshipCardImages30.webp'
import StarshipImage31 from '../../assets/Images/StarshipCardImages31.webp'
import StarshipImage32 from '../../assets/Images/StarshipCardImages32.webp'
import StarshipImage33 from '../../assets/Images/StarshipCardImages33.webp'
import StarshipImage34 from '../../assets/Images/StarshipCardImages34.webp'
import StarshipImage35 from '../../assets/Images/StarshipCardImages35.webp'
import StarshipImage36 from '../../assets/Images/StarshipCardImages36.webp'

const starshipImageArray = [
    StarshipImage1,
    StarshipImage2,
    StarshipImage3,
    StarshipImage4,
    StarshipImage5,
    StarshipImage6,
    StarshipImage7,
    StarshipImage8,
    StarshipImage9,
    StarshipImage10,
    StarshipImage11,
    StarshipImage12,
    StarshipImage13,
    StarshipImage14,
    StarshipImage15,
    StarshipImage16,
    StarshipImage17,
    StarshipImage18,
    StarshipImage19,
    StarshipImage20,
    StarshipImage21,
    StarshipImage22,
    StarshipImage23,
    StarshipImage24,
    StarshipImage25,
    StarshipImage26,
    StarshipImage27,
    StarshipImage28,
    StarshipImage29,
    StarshipImage30,
    StarshipImage31,
    StarshipImage32,
    StarshipImage33,
    StarshipImage34,
    StarshipImage35,
    StarshipImage36
]


export default function StarshipCard ({ starship }) {
    return (
        <div className="StarshipCard">
            <h3>{starship.name}</h3>
            <img src={starshipImageArray[starship.id - 1]} alt='Image Not Available' />
        </div>
    );
}
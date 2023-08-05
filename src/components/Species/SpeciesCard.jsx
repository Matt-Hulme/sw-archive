import React from 'react';
import SpeciesImage1 from '../../assets/Images/SpeciesCardImages/1.jpg'
import SpeciesImage2 from '../../assets/Images/SpeciesCardImages/2.jpg'
import SpeciesImage3 from '../../assets/Images/SpeciesCardImages/3.jpg'
import SpeciesImage4 from '../../assets/Images/SpeciesCardImages/4.jpg'
import SpeciesImage5 from '../../assets/Images/SpeciesCardImages/5.jpg'
import SpeciesImage6 from '../../assets/Images/SpeciesCardImages/6.jpg'
import SpeciesImage7 from '../../assets/Images/SpeciesCardImages/7.jpg'
import SpeciesImage8 from '../../assets/Images/SpeciesCardImages/8.jpg'
import SpeciesImage9 from '../../assets/Images/SpeciesCardImages/9.jpg'
import SpeciesImage10 from '../../assets/Images/SpeciesCardImages/10.jpg'
import SpeciesImage11 from '../../assets/Images/SpeciesCardImages/11.jpg'
import SpeciesImage12 from '../../assets/Images/SpeciesCardImages/12.jpg'
import SpeciesImage13 from '../../assets/Images/SpeciesCardImages/13.jpg'
import SpeciesImage14 from '../../assets/Images/SpeciesCardImages/14.jpg'
import SpeciesImage15 from '../../assets/Images/SpeciesCardImages/15.jpg'
import SpeciesImage16 from '../../assets/Images/SpeciesCardImages/16.jpg'
import SpeciesImage17 from '../../assets/Images/SpeciesCardImages/17.jpg'
import SpeciesImage18 from '../../assets/Images/SpeciesCardImages/18.jpg'
import SpeciesImage19 from '../../assets/Images/SpeciesCardImages/19.jpg'
import SpeciesImage20 from '../../assets/Images/SpeciesCardImages/20.jpg'
import SpeciesImage21 from '../../assets/Images/SpeciesCardImages/21.jpg'
import SpeciesImage22 from '../../assets/Images/SpeciesCardImages/22.jpg'
import SpeciesImage23 from '../../assets/Images/SpeciesCardImages/23.jpg'
import SpeciesImage24 from '../../assets/Images/SpeciesCardImages/24.jpg'
import SpeciesImage25 from '../../assets/Images/SpeciesCardImages/25.jpg'
import SpeciesImage26 from '../../assets/Images/SpeciesCardImages/26.jpg'
import SpeciesImage27 from '../../assets/Images/SpeciesCardImages/27.jpg'
import SpeciesImage28 from '../../assets/Images/SpeciesCardImages/28.jpg'
import SpeciesImage29 from '../../assets/Images/SpeciesCardImages/29.jpg'
import SpeciesImage30 from '../../assets/Images/SpeciesCardImages/30.jpg'
import SpeciesImage31 from '../../assets/Images/SpeciesCardImages/31.jpg'
import SpeciesImage32 from '../../assets/Images/SpeciesCardImages/32.jpg'
import SpeciesImage33 from '../../assets/Images/SpeciesCardImages/33.jpg'
import SpeciesImage34 from '../../assets/Images/SpeciesCardImages/34.jpg'
import SpeciesImage35 from '../../assets/Images/SpeciesCardImages/35.jpg'
import SpeciesImage36 from '../../assets/Images/SpeciesCardImages/36.jpg'
import SpeciesImage37 from '../../assets/Images/SpeciesCardImages/37.jpg'

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



export default function SpeciesCard ({ specie }) {
    return (
        <div className="SpeciesCard" style={{ backgroundImage: `url(${speciesImageArray[specie.id - 1]})` }}>
        <h3>{specie.name}</h3>
      </div>
    );
}
import React from 'react';
import VehicleImage1 from '../../assets/Images/VehicleCardImages1.webp'
import VehicleImage2 from '../../assets/Images/VehicleCardImages2.webp'
import VehicleImage3 from '../../assets/Images/VehicleCardImages3.webp'
import VehicleImage4 from '../../assets/Images/VehicleCardImages4.webp'
import VehicleImage5 from '../../assets/Images/VehicleCardImages5.webp'
import VehicleImage6 from '../../assets/Images/VehicleCardImages6.webp'
import VehicleImage7 from '../../assets/Images/VehicleCardImages7.webp'
import VehicleImage8 from '../../assets/Images/VehicleCardImages8.webp'
import VehicleImage9 from '../../assets/Images/VehicleCardImages9.webp'
import VehicleImage10 from '../../assets/Images/VehicleCardImages10.webp'
import VehicleImage11 from '../../assets/Images/VehicleCardImages11.webp'
import VehicleImage12 from '../../assets/Images/VehicleCardImages12.webp'
import VehicleImage13 from '../../assets/Images/VehicleCardImages13.webp'
import VehicleImage14 from '../../assets/Images/VehicleCardImages14.webp'
import VehicleImage15 from '../../assets/Images/VehicleCardImages15.webp'
import VehicleImage16 from '../../assets/Images/VehicleCardImages16.webp'
import VehicleImage17 from '../../assets/Images/VehicleCardImages17.webp'
import VehicleImage18 from '../../assets/Images/VehicleCardImages18.webp'
import VehicleImage19 from '../../assets/Images/VehicleCardImages19.webp'
import VehicleImage20 from '../../assets/Images/VehicleCardImages20.webp'
import VehicleImage21 from '../../assets/Images/VehicleCardImages21.webp'
import VehicleImage22 from '../../assets/Images/VehicleCardImages22.webp'
import VehicleImage23 from '../../assets/Images/VehicleCardImages23.webp'
import VehicleImage24 from '../../assets/Images/VehicleCardImages24.webp'
import VehicleImage25 from '../../assets/Images/VehicleCardImages25.webp'
import VehicleImage26 from '../../assets/Images/VehicleCardImages26.webp'
import VehicleImage27 from '../../assets/Images/VehicleCardImages27.webp'
import VehicleImage28 from '../../assets/Images/VehicleCardImages28.webp'
import VehicleImage29 from '../../assets/Images/VehicleCardImages29.webp'
import VehicleImage30 from '../../assets/Images/VehicleCardImages30.webp'
import VehicleImage31 from '../../assets/Images/VehicleCardImages31.webp'
import VehicleImage32 from '../../assets/Images/VehicleCardImages32.webp'
import VehicleImage33 from '../../assets/Images/VehicleCardImages33.webp'
import VehicleImage34 from '../../assets/Images/VehicleCardImages34.webp'
import VehicleImage35 from '../../assets/Images/VehicleCardImages35.webp'
import VehicleImage36 from '../../assets/Images/VehicleCardImages36.webp'
import VehicleImage37 from '../../assets/Images/VehicleCardImages37.webp'
import VehicleImage38 from '../../assets/Images/VehicleCardImages38.webp'
import VehicleImage39 from '../../assets/Images/VehicleCardImages39.webp'

const vehicleImageArray = [
    VehicleImage1,
    VehicleImage2,
    VehicleImage3,
    VehicleImage4,
    VehicleImage5,
    VehicleImage6,
    VehicleImage7,
    VehicleImage8,
    VehicleImage9,
    VehicleImage10,
    VehicleImage11,
    VehicleImage12,
    VehicleImage13,
    VehicleImage14,
    VehicleImage15,
    VehicleImage16,
    VehicleImage17,
    VehicleImage18,
    VehicleImage19,
    VehicleImage20,
    VehicleImage21,
    VehicleImage22,
    VehicleImage23,
    VehicleImage24,
    VehicleImage25,
    VehicleImage26,
    VehicleImage27,
    VehicleImage28,
    VehicleImage29,
    VehicleImage30,
    VehicleImage31,
    VehicleImage32,
    VehicleImage33,
    VehicleImage34,
    VehicleImage35,
    VehicleImage36,
    VehicleImage37,
    VehicleImage38,
    VehicleImage39
]



export default function vehicle ({ vehicle }) {
    return (
        <div className="VehicleCard">
            <h3>{vehicle.name}</h3>
            <img src={vehicleImageArray[vehicle.id - 1]} alt='Image Not Available' />
        </div>
    );
}
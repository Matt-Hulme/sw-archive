import React from 'react';
import VehicleImage1 from 'src/assets/Images/VehicleCardImages/1.jpg'
import VehicleImage2 from 'src/assets/Images/VehicleCardImages/2.jpg'
import VehicleImage3 from 'src/assets/Images/VehicleCardImages/3.jpg'
import VehicleImage4 from 'src/assets/Images/VehicleCardImages/4.jpg'
import VehicleImage5 from 'src/assets/Images/VehicleCardImages/5.jpg'
import VehicleImage6 from 'src/assets/Images/VehicleCardImages/6.jpg'
import VehicleImage7 from 'src/assets/Images/VehicleCardImages/7.jpg'
import VehicleImage8 from 'src/assets/Images/VehicleCardImages/8.jpg'
import VehicleImage9 from 'src/assets/Images/VehicleCardImages/9.jpg'
import VehicleImage10 from 'src/assets/Images/VehicleCardImages/10.jpg'
import VehicleImage11 from 'src/assets/Images/VehicleCardImages/11.jpg'
import VehicleImage12 from 'src/assets/Images/VehicleCardImages/12.jpg'
import VehicleImage13 from 'src/assets/Images/VehicleCardImages/13.jpg'
import VehicleImage14 from 'src/assets/Images/VehicleCardImages/14.jpg'
import VehicleImage15 from 'src/assets/Images/VehicleCardImages/15.jpg'
import VehicleImage16 from 'src/assets/Images/VehicleCardImages/16.jpg'
import VehicleImage17 from 'src/assets/Images/VehicleCardImages/17.jpg'
import VehicleImage18 from 'src/assets/Images/VehicleCardImages/18.jpg'
import VehicleImage19 from 'src/assets/Images/VehicleCardImages/19.jpg'
import VehicleImage20 from 'src/assets/Images/VehicleCardImages/20.jpg'
import VehicleImage21 from 'src/assets/Images/VehicleCardImages/21.webp'
import VehicleImage22 from 'src/assets/Images/VehicleCardImages/22.webp'
import VehicleImage23 from 'src/assets/Images/VehicleCardImages/23.webp'
import VehicleImage24 from 'src/assets/Images/VehicleCardImages/24.webp'
import VehicleImage25 from 'src/assets/Images/VehicleCardImages/25.webp'
import VehicleImage26 from 'src/assets/Images/VehicleCardImages/26.webp'
import VehicleImage27 from 'src/assets/Images/VehicleCardImages/27.webp'
import VehicleImage28 from 'src/assets/Images/VehicleCardImages/28.webp'
import VehicleImage29 from 'src/assets/Images/VehicleCardImages/29.webp'
import VehicleImage30 from 'src/assets/Images/VehicleCardImages/30.webp'
import VehicleImage31 from 'src/assets/Images/VehicleCardImages/31.webp'
import VehicleImage32 from 'src/assets/Images/VehicleCardImages/32.webp'
import VehicleImage33 from 'src/assets/Images/VehicleCardImages/33.webp'
import VehicleImage34 from 'src/assets/Images/VehicleCardImages/34.webp'
import VehicleImage35 from 'src/assets/Images/VehicleCardImages/35.webp'
import VehicleImage36 from 'src/assets/Images/VehicleCardImages/36.webp'
import VehicleImage37 from 'src/assets/Images/VehicleCardImages/37.webp'
import VehicleImage38 from 'src/assets/Images/VehicleCardImages/38.webp'
import VehicleImage39 from 'src/assets/Images/VehicleCardImages/39.webp'

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



export default function VehicleCard ({ vehicle }) {
    return (
        <div className="VehicleCard" style={{ backgroundImage: `url(${vehicleImageArray[vehicle.id - 1]})` }}>
        <h3>{vehicle.name}</h3>
      </div>
    );
}
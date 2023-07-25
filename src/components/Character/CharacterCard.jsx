import  React from 'react';
import image1 from '../../assets/Images/profileImages/1.jpg';
import image2 from '../../assets/Images/profileImages/2.jpg';
import image3 from '../../assets/Images/profileImages/3.jpg';
import image4 from '../../assets/Images/profileImages/4.jpg';
import image5 from '../../assets/Images/profileImages/5.jpg';
import image6 from '../../assets/Images/profileImages/6.jpg';
import image7 from '../../assets/Images/profileImages/7.jpg';
import image8 from '../../assets/Images/profileImages/8.jpg';
import image9 from '../../assets/Images/profileImages/9.jpg';
import image10 from '../../assets/Images/profileImages/10.jpg';
import image11 from '../../assets/Images/profileImages/11.jpg';
import image12 from '../../assets/Images/profileImages/12.jpg';
import image13 from '../../assets/Images/profileImages/13.jpg';
import image14 from '../../assets/Images/profileImages/14.jpg';
import image15 from '../../assets/Images/profileImages/15.jpg';
import image16 from '../../assets/Images/profileImages/16.jpg';
import image17 from '../../assets/Images/profileImages/A17.jpg';
import image18 from '../../assets/Images/profileImages/18.jpg';
import image19 from '../../assets/Images/profileImages/19.jpg';
import image20 from '../../assets/Images/profileImages/20.jpg';
import image21 from '../../assets/Images/profileImages/21.jpg';
import image22 from '../../assets/Images/profileImages/22.jpg';
import image23 from '../../assets/Images/profileImages/23.jpg';
import image24 from '../../assets/Images/profileImages/24.jpg';
import image25 from '../../assets/Images/profileImages/25.jpg';
import image26 from '../../assets/Images/profileImages/26.jpg';
import image27 from '../../assets/Images/profileImages/27.jpg';
import image28 from '../../assets/Images/profileImages/28.jpg';
import image29 from '../../assets/Images/profileImages/29.jpg';
import image30 from '../../assets/Images/profileImages/30.jpg';
import image31 from '../../assets/Images/profileImages/31.jpg';
import image32 from '../../assets/Images/profileImages/32.jpg';
import image33 from '../../assets/Images/profileImages/33.jpg';
import image34 from '../../assets/Images/profileImages/34.jpg';
import image35 from '../../assets/Images/profileImages/35.jpg';
import image36 from '../../assets/Images/profileImages/36.jpg';
import image37 from '../../assets/Images/profileImages/37.jpg';
import image38 from '../../assets/Images/profileImages/38.jpg';
import image39 from '../../assets/Images/profileImages/39.jpg';
import image40 from '../../assets/Images/profileImages/40.jpg';
import image41 from '../../assets/Images/profileImages/41.jpg';
import image42 from '../../assets/Images/profileImages/42.jpg';
import image43 from '../../assets/Images/profileImages/43.jpg';
import image44 from '../../assets/Images/profileImages/44.jpg';
import image45 from '../../assets/Images/profileImages/45.jpg';
import image46 from '../../assets/Images/profileImages/46.jpg';
import image47 from '../../assets/Images/profileImages/47.jpg';
import image48 from '../../assets/Images/profileImages/48.jpg';
import image49 from '../../assets/Images/profileImages/49.jpg';
import image50 from '../../assets/Images/profileImages/50.jpg';
import image51 from '../../assets/Images/profileImages/51.jpg';
import image52 from '../../assets/Images/profileImages/52.jpg';
import image53 from '../../assets/Images/profileImages/53.jpg';
import image54 from '../../assets/Images/profileImages/54.jpg';
import image55 from '../../assets/Images/profileImages/55.jpg';
import image56 from '../../assets/Images/profileImages/56.jpg';
import image57 from '../../assets/Images/profileImages/57.jpg';
import image58 from '../../assets/Images/profileImages/58.jpg';
import image59 from '../../assets/Images/profileImages/59.jpg';
import image60 from '../../assets/Images/profileImages/60.jpg';
import image61 from '../../assets/Images/profileImages/61.jpg';
import image62 from '../../assets/Images/profileImages/62.jpg';
import image63 from '../../assets/Images/profileImages/63.jpg';
import image64 from '../../assets/Images/profileImages/64.jpg';
import image65 from '../../assets/Images/profileImages/65.jpg';
import image66 from '../../assets/Images/profileImages/66.jpg';
import image67 from '../../assets/Images/profileImages/67.jpg';
import image68 from '../../assets/Images/profileImages/68.jpg';
import image69 from '../../assets/Images/profileImages/69.jpg';
import image70 from '../../assets/Images/profileImages/70.jpg';
import image71 from '../../assets/Images/profileImages/71.jpg';
import image72 from '../../assets/Images/profileImages/72.jpg';
import image73 from '../../assets/Images/profileImages/73.jpg';
import image74 from '../../assets/Images/profileImages/74.jpg';
import image75 from '../../assets/Images/profileImages/75.jpg';
import image76 from '../../assets/Images/profileImages/76.jpg';
import image77 from '../../assets/Images/profileImages/77.jpg';
import image78 from '../../assets/Images/profileImages/78.jpg';
import image79 from '../../assets/Images/profileImages/79.jpg';
import image80 from '../../assets/Images/profileImages/80.jpg';
import image81 from '../../assets/Images/profileImages/81.jpg';
import image82 from '../../assets/Images/profileImages/82.jpg';
import image83 from '../../assets/Images/profileImages/83.jpg';

const imageUrlArray = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
  image16,
  image17,
  image18,
  image19,
  image20,
  image21,
  image22,
  image23,
  image24,
  image25,
  image26,
  image27,
  image28,
  image29,
  image30,
  image31,
  image32,
  image33,
  image34,
  image35,
  image36,
  image37,
  image38,
  image39,
  image40,
  image41,
  image42,
  image43,
  image44,
  image45,
  image46,
  image47,
  image48,
  image49,
  image50,
  image51,
  image52,
  image53,
  image54,
  image55,
  image56,
  image57,
  image58,
  image59,
  image60,
  image61,
  image62,
  image63,
  image64,
  image65,
  image66,
  image67,
  image68,
  image69,
  image70,
  image71,
  image72,
  image73,
  image74,
  image75,
  image76,
  image77,
  image78,
  image79,
  image80,
  image81,
  image82,
  image83,  
]

export default function CharacterCard({ character }) {

  return (
    <div className="CharacterCard">
      <h3>{character.name}</h3>
      <img src={imageUrlArray[character.id - 1]} alt='Image Not Available' />
    </div>
  );
}

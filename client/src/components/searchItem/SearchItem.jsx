import { Link } from "react-router-dom";
import "./searchItem.css";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Carousel } from 'react-responsive-carousel';
import { useState, useEffect } from "react";


const SearchItem = ({ item }) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [distanceClinic, setDistanceClinic] = useState(0);
  
  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  useEffect(() => {

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLatitude(latitude);
          setLongitude(longitude);
        },
        (error) => {
          console.error('Error getting current position:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }


  }, [])



  useEffect(() => {
    
    if (latitude !== null && longitude !== null && item) {
      const latClinic = item.latitude;
      const lonClinic = item.longtitude;
      const distance = calculateDistance(latitude, longitude, latClinic, lonClinic);
      setDistanceClinic(distance);
    }
  }, [latitude, longitude, item]);
  

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };


  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.title}</h1>
        <span className="siSubtitle">
          {item.name}
        </span>
        <span className="siDistance"><LocationOnIcon />{item.address}</span>
        <span className="siDistance"> ระยะห่างจากคุณ – {distanceClinic.toFixed(2)} km</span>
        {/* <span className="siTaxiOp">Free airport taxi</span> */}

        {/* <span className="siFeatures">{item.desc}</span> */}
        <span className="siCancelOp">รายละเอียด </span>
        <span className="siCancelOpSubtitle">
        {item.description}
        </span>
      </div>
      <div className="siDetails">
        {/* {item.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>} */}
        <div className="siDetailTexts">
          {/* <span className="siPrice">${item.cheapestPrice}</span> */}
          {/* <span className="siTaxOp">Includes taxes and fees</span> */}
          <Link to={`/clinics/${item._id}`}>
            <button className="siCheckButton">รายละเอียด</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;

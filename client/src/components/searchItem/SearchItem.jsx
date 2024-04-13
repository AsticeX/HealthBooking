import { Link } from "react-router-dom";
import "./searchItem.css";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Carousel } from 'react-responsive-carousel';


const SearchItem = ({ item }) => {
  return (
    <div className="searchItem">
      <img src={item.photos[0]} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.title}</h1>
        <span className="siSubtitle">
          {item.name}
        </span>
        <span className="siDistance"><LocationOnIcon />{item.address}</span>
        {/* <span className="siTaxiOp">Free airport taxi</span> */}

        <span className="siFeatures">{item.desc}</span>
        <span className="siCancelOp">รายละเอียด </span>
        <span className="siCancelOpSubtitle">
        {item.description}
        </span>
      </div>
      <div className="siDetails">
        {item.rating && <div className="siRating">
          <span>Excellent</span>
          <button>{item.rating}</button>
        </div>}
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

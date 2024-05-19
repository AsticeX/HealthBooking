import React from "react";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import "./cal_searchItem.css";

const Cal_SearchItem = ({ item }) => {
  const handleButtonClick = () => {
    window.open(item.description_link, "_blank");
  };

  const handleAddButtonClick = (e) => {
    e.stopPropagation(); // Prevent click event from reaching the parent container
  };

  return (
    <div onClick={handleButtonClick} className="searchItem">
      <div className="searchItemContent">
        <img src={item.img} alt="" className="siImg" />
        <div className="siDesc">
          <h className="siTitle">{item.title}</h>
          <span className="siSubtitle">{item.clinic}</span>
          <span className="siLocation">
            <LocationOnIcon />
            {item.address}
          </span>
          <span className="mt-3 siSubPrice">ราคาเริ่มต้นที่</span>
          <h1 className="siPrices">{item.price}</h1>
        </div>
      </div>
      <div className="siDetailTexts">
        <button className="siCheckButton" onClick={handleAddButtonClick}>
          เพิ่ม
        </button>
      </div>
    </div>
  );
};

export default Cal_SearchItem;

import "./list.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";

const List = () => {
  const location = useLocation();
  // const [destination, setDestination] = useState(location.state.destination);
  //   const [dates, setDates] = useState(location.state.dates);
  //   const [openDate, setOpenDate] = useState(false);
  //   const [options, setOptions] = useState(location.state.options);

  const { data, loading, error, reFetch } = useFetch(
    `/clinics`
  );

  const handleClick = () => {
    reFetch();
  };

  // const handleDestinationChange = (e) => {
  //   setDestination(e.target.value);
  // };

  // useEffect(() => {
  //   console.log(data,"XXXXXXXX");
  // }, [data])
  
  return (
    
    <div>
          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <SearchItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
  );
};

export default List;

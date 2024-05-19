import React, { useState, useEffect } from "react";
import Cal_SearchItem from "../../components/cal_searchItem/Cal_SearchItem";
import { Button } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import "./cal_list.css";
import TopBar from "../../components/topbar/Topbar";

const ITEMS_PER_PAGE = 10; // Number of items to display per page

const Cal_List = () => {
  const { data: initialData, loading, error, reFetch } = useFetch(`${process.env.REACT_APP_API}/vaccine_cal`);
  const [allData, setAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (!loading && initialData) {
      setAllData(initialData); // Set initial data without concatenating
    }
  }, [loading, initialData]);

  const loadMoreItems = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSearch = (searchTerm) => {
    // Perform search logic here
    console.log("Searching for:", searchTerm);
    // Example: Filter data based on search term
    const filteredData = initialData.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setAllData(filteredData);
  };

  const handleSort = (sortOrder) => {
    // Perform sorting logic here
    console.log("Sorting order:", sortOrder);
    const sortedData = [...allData].sort((a, b) => {
      if (sortOrder === "near") {
        return a.price_no_thb - b.price_no_thb;
      } else if (sortOrder === "far") {
        return b.price_no_thb - a.price_no_thb;
      }
      return 0;
    });
    setAllData(sortedData);
  };

  if (loading && !allData.length) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = currentPage * ITEMS_PER_PAGE;
  const currentPageData = allData.slice(startIndex, endIndex);

  return (
    <div>
      <TopBar handleSearch={handleSearch} handleSort={handleSort} /> {/* Pass handleSearch and handleSort functions to the TopBar component */}
      <div className="listResult">
        {currentPageData.map((item) => (
          <Cal_SearchItem key={item._id} item={item} />
        ))}
      </div>
      {allData.length > endIndex && (
        <div style={{ textAlign: "center" }}>
          <Button variant="contained" onClick={loadMoreItems}>
            ดูแพ็กเกจเพิ่มเติม
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cal_List;

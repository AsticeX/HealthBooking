import React, { useState, useEffect } from "react";
import Cal_SearchItem from "../../components/cal_searchItem/Cal_SearchItem";
import { Grid, Button } from "@mui/material";
import useFetch from "../../hooks/useFetch";
import "./cal_list.css";
import TopBar from "../../components/topbar/Topbar";

const ITEMS_PER_PAGE = 10;

const Cal_List = () => {
  const { data: initialData, loading, error, reFetch } = useFetch(`${process.env.REACT_APP_API}/vaccine_cal`);
  const [allData, setAllData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]); // Initialize as an empty array

  useEffect(() => {
    if (!loading && initialData) {
      setAllData(initialData);
    }
  }, [loading, initialData]);

  const loadMoreItems = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleSearch = (searchTerm) => {
    const filteredData = initialData.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
    setAllData(filteredData);
  };

  const handleSort = (sortOrder) => {
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

  const addItem = (item) => {
    setSelectedItems((prevItems) => [...prevItems, item]);
  };

  const removeItem = (itemId) => {
    setSelectedItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
  };

  if (loading && !allData.length) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = currentPage * ITEMS_PER_PAGE;
  const currentPageData = allData.slice(startIndex, endIndex);

  return (
    <div>
      <TopBar
        handleSearch={handleSearch}
        handleSort={handleSort}
        selectedItems={selectedItems} // Pass selectedItems to TopBar
        removeItem={removeItem}
      />
      <Grid container component="main" sx={{ mt: 2, bgcolor: "#77B255" }}></Grid>

      <div className="listResult">
        {currentPageData.map((item) => (
          <Cal_SearchItem key={item._id} item={item} addItem={addItem} />
        ))}
      </div>
      {allData.length > endIndex && (
        <div style={{ textAlign: "center" }}>
          <Button variant="contained" onClick={loadMoreItems} sx={{ mt: 2 }}>
            ดูแพ็กเกจเพิ่มเติม
          </Button>
        </div>
      )}
      <Grid container component="main" sx={{ mt: 3, bgcolor: "#77B255" }}></Grid>
    </div>
  );
};

export default Cal_List;

import React, { useState } from "react";
import "./topbar.css";
import { TextField, Grid, InputLabel, MenuItem, FormControl, Select, IconButton, Box } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";

const TopBar = ({ handleSearch, handleSort, selectedItems = [], removeItem }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [showDescription, setShowDescription] = useState(true); // State to control description box visibility

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(searchTerm);
    }
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    handleSort(event.target.value);
  };

  const MAX_TITLE_LENGTH = 50;

  const getLimitedTitle = (title) => {
    return title.length > MAX_TITLE_LENGTH ? title.substring(0, MAX_TITLE_LENGTH) + "..." : title;
  };

  const addItem = (item) => {
    setShowDescription(false); // Hide the description box when adding an item
    handleSearch(""); // Clear the search term
    removeItem(item._id); // Remove the added item from the list of available items
  };

  return (
    <div className="topbar">
      <Grid container component="main" sx={{ mt: 8, bgcolor: "#77B255" }}></Grid>
      <Grid container spacing={3}>
        <Grid item xs={10} sm={3}>
          <TextField
            margin="normal"
            fullWidth
            variant="filled"
            id="search"
            label="ค้นหา"
            name="search"
            autoComplete="off"
            autoFocus
            sx={{ backgroundColor: "white" }}
            value={searchTerm}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            className="searchField"
          />
        </Grid>
        <Grid item xs={10} sm={3} mt={2}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">เรียงวัคซีนจากราคา</InputLabel>
            <Select sx={{ backgroundColor: "white" }} value={sortOrder} onChange={handleSortChange} displayEmpty inputProps={{ "aria-label": "Sort by price" }} className="sortSelect">
              <MenuItem value="" disabled>
                เรียงวัคซีนจากราคา
              </MenuItem>
              <MenuItem value="near">เรียงจากราคาต่ำสุด</MenuItem>
              <MenuItem value="far">เรียงจากราคาสูงสุด</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={10} sm={3} mt={2}>
          <div className="selectedItemsContainer">
            {/* Description text box */}
            {showDescription && (
              <div className="descriptionBox">
                {(!selectedItems || selectedItems.length === 0) && (
                  <div className="descriptionBox">
                    <p>กด "เพิ่ม" เพื่อคำนวนราคาวัคซีน</p>
                  </div>
                )}
              </div>
            )}

            {/* Render selected items */}
            {selectedItems?.map((item) => (
              <div key={item._id} className="selectedItem">
                <div className="selectedItemContent">
                  <span className="selectedItemTitle">{getLimitedTitle(item.title)}</span>
                  <IconButton sx={{ marginLeft: "auto" }} onClick={() => removeItem(item._id)} aria-label="remove item">
                    <ClearIcon />
                  </IconButton>
                </div>
              </div>
            ))}
          </div>
        </Grid>
      </Grid>

      <Grid container component="main" sx={{ mt: 1, bgcolor: "#77B255" }}></Grid>
    </div>
  );
};

export default TopBar;

import React, { useState } from "react";
import "./topbar.css";
import { TextField, Grid, InputLabel, MenuItem, FormControl, Select } from "@mui/material";

const TopBar = ({ handleSearch, handleSort }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSearch(searchTerm); // Call handleSearch function from props
    }
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
    handleSort(event.target.value); // Call handleSort function from props
  };

  return (
    <div className="topbar">
      <Grid container component="main" sx={{ mt: 11, bgcolor: "#77B255" }}></Grid>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={3}>
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
            onKeyPress={handleKeyPress} // Call handleKeyPress function when a key is pressed
            className="searchField"
          />
        </Grid>
        <Grid item xs={12} sm={3} mt={2}>
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
      </Grid>
      <Grid container component="main" sx={{ mt: 11, bgcolor: "#77B255" }}></Grid>
    </div>
  );
};

export default TopBar;

import React, { useState } from "react";
import "./topbar.css";
import { Box, TextField, Grid, InputLabel, MenuItem, FormControl, Select, IconButton, Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { styled } from "@mui/material/styles";
import { red, green, blue } from "@mui/material/colors";

const TopBar = ({ handleSearch, handleSort, selectedItems = [], removeItem }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [showDescription, setShowDescription] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);

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

  const MAX_TITLE_LENGTH = 75;

  const getLimitedTitle = (title) => {
    return title.length > MAX_TITLE_LENGTH ? title.substring(0, MAX_TITLE_LENGTH) + "..." : title;
  };

  const addItem = (item) => {
    setShowDescription(false);
    handleSearch("");
    removeItem(item._id);
  };

  const handleCalculatePrice = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <div className="topbar">
      <Grid container component="main" sx={{ mt: 8, bgcolor: "#77B255" }}></Grid>
      <Box component="form" noValidate sx={{ width: "100%", pl: 2, pr: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={10} sm={3} mt={4} sx={{ display: "flex", alignItems: "center" }}>
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
          <Grid item xs={10} sm={3} mt={5} sx={{ display: "flex", alignItems: "center" }}>
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
          <Grid item xs={10} sm={4} mt={2} sx={{ display: "flex", alignItems: "center", width: "100%" }}>
            <div sx={{ width: "100%" }} className="selectedItemsContainer">
              {showDescription && (
                <div className="descriptionBox">
                  {(!selectedItems || selectedItems.length === 0) && (
                    <div className="descriptionBox">
                      <p>กด "เพิ่ม" เพื่อคำนวนราคาวัคซีน &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;</p>
                    </div>
                  )}
                </div>
              )}
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
          <Grid item xs={10} sm={2} mt={2} sx={{ width: "100%", display: "flex", alignItems: "center" }}>
            <button className="siCheckButton2" onClick={handleCalculatePrice}>
              คำนวนราคา
            </button>
          </Grid>
        </Grid>
      </Box>
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth maxWidth="md">
        <DialogTitle style={{ backgroundColor: "#77B255", color: "white" }}>รายการที่เลือก</DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {selectedItems.map((item) => (
            <div key={item._id} className="selectedItem">
              <div className="selectedItemContent">
                <Typography>{getLimitedTitle(item.title)}</Typography>
                <Typography>{item.price}</Typography>
              </div>
            </div>
          ))}
        </DialogContent>
        <DialogActions style={{ backgroundColor: "#F0F0F0" }}>
          <Typography variant="h6" style={{ flexGrow: 1, color: "#333" }}>
            ราคารวม: {selectedItems.reduce((total, item) => total + item.price_no_thb, 0)} บาท
          </Typography>
          <button className="siCheckButton3" onClick={handleCloseDialog} color="primary">
            ปิด
          </button>
        </DialogActions>
      </Dialog>

      <Grid container component="main" sx={{ mt: 1, bgcolor: "#77B255" }}></Grid>
    </div>
  );
};

export default TopBar;

import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Box, TextField, Grid, InputLabel, MenuItem, FormControl, Select } from '@mui/material';
import SearchItem from '../../components/searchItem/SearchItem';
import useFetch from '../../hooks/useFetch';
import './list.css';

const List = () => {
  const location = useLocation();
  const [age, setAge] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('near');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const { data, loading, error, reFetch } = useFetch(`${process.env.REACT_APP_API}/clinics`);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };

  const handleClick = () => {
    reFetch();
  };

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

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
  }, []);

  const sortedData = [...data].sort((a, b) => {
    if (latitude !== null && longitude !== null) {
      const distanceA = calculateDistance(latitude, longitude, a.latitude, a.longtitude);
      const distanceB = calculateDistance(latitude, longitude, b.latitude, b.longtitude);
      
      if (sortOrder === 'near') {
        return distanceA - distanceB;
      } else if (sortOrder === 'far') {
        return distanceB - distanceA;
      }
    }
    return 0;
  });

  const filteredData = sortedData.filter(clinic => {
    if (searchTerm.length < 3) {
      return true; 
    }
    return clinic.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  

  return (
    <div>
      <Grid container component="main" sx={{ mt: 15, bgcolor: "#77B255" }}>
        <Box component="form" noValidate sx={{ width: '100%', pl: 2, pr: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
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
                onChange={handleSearchChange}
              />
            </Grid>
            <Grid item xs={12} sm={4} sx={{ display: 'flex', alignItems: 'center' }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">บริการ</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={age}
                  label="Age"
                  onChange={handleChange}
                  sx={{ backgroundColor: "white" }}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={4} sx={{ display: 'flex', alignItems: 'center' }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">ตัวกรอง</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={sortOrder}
                  label="Sort Order"
                  onChange={handleSortChange}
                  sx={{ backgroundColor: "white" }}
                >
                  <MenuItem value="near">ใกล้สุด-ไกลสุด</MenuItem>
                  <MenuItem value="far">ไกลสุด-ใกล้สุด</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </Grid>
      <div className="listResult">
        {loading ? (
          "loading"
        ) : (
          <>
            {filteredData.map((item) => (
              <SearchItem item={item} key={item._id} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default List;

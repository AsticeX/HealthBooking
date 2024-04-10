import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, IconButton, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

const HospitalFinderComponent = () => {
  const [location, setLocation] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [mapInitialized, setMapInitialized] = useState(false);

  let map;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          if (error.code === error.PERMISSION_DENIED) {
            console.error('User denied geolocation access.');
          } else {
            console.error('Error getting location:', error.message);
          }
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (location && !mapInitialized) {
      initMap();
      setMapInitialized(true);
    }
  }, [location, mapInitialized]);

  const handleKeyUp = (event) => {
    if (event.keyCode !== 13) return;
    doSearch();
  };

  const initMap = () => {
    map = new window.longdo.Map({
      placeholder: document.getElementById('map'),
      zoom: 15,
      lastView: false,
    });

    map.Tags.add('hospital', {
      visibleRange: { min: 10, max: 20 },
      icon: { url: 'https://mmmap15.longdo.com/mmmap/images/icons/hospital.png' }
    });

    const searchInput = document.getElementById('search-input');
    if (searchInput) {
      searchInput.addEventListener('keyup', handleKeyUp);
    } else {
      console.error('Search input element not found.');
    }
  };

  const searchNearby = () => {
    const { latitude, longitude } = location;
    axios.get("https://api.longdo.com/POIService/json/search?", {
      params: {
        key: '79e088d5668d8e7316d055233c8cf1c4',
        lon: longitude,
        lat: latitude,
        tag: 'hospital',
        limit: 10,
      }
    })
      .then((response) => {
        console.log(response.data.data);
        const hospitals = response.data.data.map(hospital => {
          hospital.distance = calculateDistance(latitude, longitude, hospital.lat, hospital.lon);
          return hospital;
        });
        setSearchResults(hospitals);
      })
      .catch((error) => {
        console.error('Error searching nearby:', error);
      });
  };

  const doSearch = () => {
    const searchValue = document.getElementById('search-input').value;
    if (map && searchValue) {
      map.Search.search(searchValue, {
        tag: 'hospital',
      });
      const suggest = document.getElementById('result');
      suggest.style.display = 'none';
    }
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

  const deg2rad = (deg) => {
    return deg * (Math.PI / 180);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6} sx={{ mt: 10 }}>
          <div id="result"></div>
          <h2>โรงพยาบาลใกล้ฉัน</h2>
          <Button onClick={searchNearby} variant="contained">Search Nearby</Button>
          {searchResults.map((hospital) => (
            <div key={hospital.id}>
              <p>{hospital.name} {hospital.distance ? hospital.distance.toFixed(2) : 'Distance not available'} km <SubdirectoryArrowRightIcon /></p>
            </div>
          ))}
        </Grid>
        <Grid item xs={6} sx={{ height: '100%', mt: 8.5, position: 'relative' }}>
          <TextField
            sx={{
              color: "#000",
              fontFamily: "Arial",
              fontWeight: "bold",
              backgroundColor: "#f4f4f4",
              borderTopLeftRadius: "7px",
              borderTopRightRadius: "7px",
            }}
            fullWidth
            variant="filled"
            id='search-input'
            label='Search'
            InputProps={{
              endAdornment: (
                <IconButton onClick={doSearch}>
                  <SearchIcon />
                </IconButton>
              ),
            }}
          />
          <div style={{ flex: 1 }}>
            <div id="map" style={{ height: '600px', width: '100%' }}></div>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HospitalFinderComponent;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, IconButton, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import SearchIcon from '@mui/icons-material/Search';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';
import PersonPinCircleIcon from '@mui/icons-material/PersonPinCircle';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import useFetch from '../../hooks/useFetch';

const HospitalFinderComponent = () => {
  const [location, setLocation] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [mapInitialized, setMapInitialized] = useState(false);
  const { data, loading, error } = useFetch(`${process.env.REACT_APP_API}/clinics}`);

  let map;
  let search;



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

  const showMap = () => {
    map = new window.longdo.Map({
      placeholder: document.getElementById('map'),
      zoom: 15,
      lastView: false,
    });

    map.Tags.add('hospital', {
      visibleRange: { min: 10, max: 20 },
      icon: { url: 'https://mmmap15.longdo.com/mmmap/images/icons/hospital.png' }
    });
    map.location(window.longdo.LocationMode.Geolocation);


  }

  const routeMap = (hospitalId) => {
    const { latitude, longitude } = location;
    // console.log(hospitalId);
    showMap()
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
        // console.log(hospitalId);
        const hospitals = response.data.data.map(hospital => {
          hospital.distance = calculateDistance(latitude, longitude, hospital.lat, hospital.lon);
          if (hospitalId === hospital.id) {
            var marker = new window.longdo.Marker({ lon: longitude, lat: latitude });
            map.Route.add(marker);
            map.Route.add({ lon: hospital.lon, lat: hospital.lat });
            map.Route.search();
          }
          return hospital;
        });
        // console.log(hospitals);
        setSearchResults(hospitals);
      })
      .catch((error) => {
        console.error('Error searching nearby:', error);
      });
    map.Route.placeholder(document.getElementById('result'));
  }



  const initMap = () => {
    showMap()
    search = document.getElementById('search')
    if (search) {
      map.Search.placeholder(document.getElementById('result'));
      search.onkeyup = function (event) {
        if ((event || window.event).keyCode !== 13) return;
        doSearch();
      };
    } else {
      console.error('Search element not found.');
    }
  };

  const searchNearby = () => {
    const { latitude, longitude } = location;
    showMap()
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
          var marker = new window.longdo.Marker({ lon: hospital.lon, lat: hospital.lat });
          map.Overlays.add(marker);
          return hospital;
        });
        const suggest = document.getElementById('result');
        suggest.style.display = 'none';
        setSearchResults(hospitals);
      })
      .catch((error) => {
        console.error('Error searching nearby:', error);
      });
  };

  const doSearch = () => {
    if (map) {
      map.Search.search(search.value, {
        tag: 'hospital',
      });

      const suggest = document.getElementById('result');
      suggest.style.display = 'block';
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
          <h2 style={{display:"flex",justifyContent:"center"}}>สถานบริการใกล้ฉัน</h2>
          <Card sx={{ minWidth: 275,backgroundColor:'transparent' }}>
            {searchResults.map((hospital) => (
              <CardContent key={hospital.id} sx={{ m: 2, backgroundColor: "#EEEEE6", borderRadius: 4, boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", transition: "box-shadow 0.3s", '&:hover': { boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)" },mr:8,ml:8 }}>
                <Typography sx={{ fontSize: 18, display:"flex",alignItems:"center" ,justifyContent:'center'}} color="text.secondary" gutterBottom>
                  <div>
                    <p>
                      {hospital.name} {hospital.distance ? hospital.distance.toFixed(2) : 'Distance not available'} km
                      <IconButton sx={{ width: 32, height: 32,color:'blue' }} onClick={() => routeMap(hospital.id)}>
                        <SubdirectoryArrowRightIcon />
                      </IconButton>
                    </p>
                  </div>
                </Typography>
              </CardContent>
            ))}
          </Card>

        </Grid>
        <Grid item xs={6} sx={{ height: '100%', mt: 8.5, position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton sx={{ width: 32, height: 32 ,color:'blue'}} onClick={searchNearby}>
              <PersonPinCircleIcon />
            </IconButton>
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
              id='search'
              label='Search'
              InputProps={{
                endAdornment: (
                  <IconButton sx={{color:'blue'}}>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <div id="map" style={{ height: '600px', width: '100%' }}></div>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HospitalFinderComponent;

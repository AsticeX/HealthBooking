import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box,TextField } from '@mui/material';
// import SearchHospital from '../searchHospital/SearchHospital';
const HospitalFinderComponent = () => {
  const [location, setLocation] = useState(null);
  const [hospitals, setHospitals] = useState([]);
  const [searchTag, setSearchTag] = useState('');
  const [searchResults, setSearchResults] = useState([]);

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

  // useEffect(() => {
  //   if (location && searchTag) {
  //     const { latitude, longitude } = location;
  //     // const apiUrl = `http://localhost:3001/longdo-api/search?keyword=tag:hospital&lon=${longitude}&lat=${latitude}&key=${process.env.REACT_APP_LONGDO_API_KEY}&tag=${searchTag}`;

  //     // axios.get(apiUrl)
  //     //   .then((response) => {
  //     //     setHospitals(response.data.results);  
  //     //   })
  //     //   .catch((error) => {
  //     //     console.error('Error fetching hospitals:', error);
  //     //   });
  //   }
  // }, [location, searchTag]);

  useEffect(() => {
    // Initialize map when the component mounts
    initMap();
  }, [hospitals]);

  const initMap = () => {
    map = new window.longdo.Map({
      placeholder: document.getElementById('map'),
      zoom: 15,
      lastView: false,
    });

    map.Tags.add('hospital', {
      visibleRange: { min: 10, max: 20 },
      icon: { url: 'https://mmmap15.longdo.com/mmmap/images/icons/hospital.png' }
    })
    search = document.getElementById('search');

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
    // Use axios for consistency and simplicity
    axios.get("https://api.longdo.com/POIService/json/search?", {
      params: {
        key: '79e088d5668d8e7316d055233c8cf1c4',
        lon: longitude,
        lat: latitude,
        tag: 'hospital',
      }
    })
      .then((response) => {
        console.log(response.data.data);
        setSearchResults(response.data.data);
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
      suggest.style.display = 'none';
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
     <div style={{ flex: 1 }}>
      <TextField>
      </TextField>
      </div>
      <div style={{ flex: 1 }}>
        <Box id="map" sx={{ height: '600px' }}></Box>
      </div>
    </div>

    // <div>
    //   <div id="map" style={{ height: '500px' }}></div>
    //   <input id="search" />
    //   <div id="result">
    //     {/* Conditional rendering of search results */}
    //     <button onClick={searchNearby}>Search Nearby</button>
    //     <h2>โรงพยาบาลใกล้ฉัน</h2>
    //     {searchResults && searchResults.map((hospital) => (
    //       <div key={hospital.id}>
    //         <p>{hospital.name}</p>
    //         {/* Add more information as needed */}
    //       </div>
    //     ))}
    //   </div>
    // </div>
  );
};

export default HospitalFinderComponent;

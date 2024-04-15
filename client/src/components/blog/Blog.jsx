import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography'
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from 'react';
import axios from 'axios';

const BlogHome = () => {
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [description, setDescription] = useState('');
  const [description2, setDescription2] = useState('');
  const [description3, setDescription3] = useState('');


  const handleChange = (event) => {
    const selectedValue = event.target.value;
    const selectedOption = data.find(item => item._id === selectedValue);
    setDescription(selectedOption ? selectedOption.description : '');
    setDescription2(selectedOption ? selectedOption.description2 : '');
    setDescription3(selectedOption ? selectedOption.description3 : '');

    setAge(selectedValue || '');
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/vaccine`)
      .then((response) => {
        const options = response.data;
        setData(options);
      })
      .catch((error) => {
        console.error("Error fetching vaccine options:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Card sx={{ width: "100%", height: "700px", pl: 4,pr:4,pb:10, backgroundColor: "#EEEEE6" }}>
        <CardContent>
          <Typography sx={{ fontSize: 20, color: "#77B255" }} color="text.secondary" gutterBottom>
            ข้อมูลวัคซีน
          </Typography>
        </CardContent>
        <Card sx={{ width:"100%",height: "100%", backgroundColor: "#77B255", borderRadius: 4 }}>
          <CardContent>
            <Typography sx={{ fontSize: 18 }} color="text.secondary" gutterBottom>
              เลือกวัคซีน
            </Typography>
            <FormControl sx={{ width: 200 }}>
              <InputLabel id="demo-simple-select-label">วัคซีน</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={age}
                label="Age"
                onChange={handleChange}
                sx={{ backgroundColor: 'white' }}
              >
                {loading ? (
                  "Loading..."
                ) : (
                  data.map((vaccineItem) => (
                    <MenuItem key={vaccineItem._id} value={vaccineItem._id}>
                      {vaccineItem.vaccine_name_th}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
            <Typography variant="body1" mt={2} sx={{ fontSize: 18, color: "#EEEEE6" }}>
              ป้องกันโรค
            </Typography>
            {description && (
              <Typography variant="body1" mt={2} ml={2} sx={{ fontSize: { xs: 14, sm: 16 } }}>
                {description}
              </Typography>
            )}
            <Typography variant="body1" mt={2} sx={{ fontSize: 18, color: "#EEEEE6" }}>
              ความต่อเนื่อง
            </Typography>
            {description2 && (
              <Typography variant="body1" mt={2} ml={2} sx={{ fontSize: { xs: 14, sm: 16 } }}>
                {description2}
              </Typography>
            )}
            <Typography variant="body1" mt={2} sx={{ fontSize: 18, color: "#EEEEE6" }}>
              ผลข้างเคียง
            </Typography>
            {description3 && (
              <Typography variant="body1" mt={2} ml={2} sx={{ fontSize: { xs: 14, sm: 16 } }}>
                {description3}
              </Typography>
            )}
          </CardContent>
        </Card>
      </Card>
    </div>
  );
}

export default BlogHome;

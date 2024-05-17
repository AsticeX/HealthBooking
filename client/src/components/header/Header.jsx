import React from 'react';
import { Box, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const Header = () => {
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Grid container component="main" sx={{ mt: 15 }}>
      <Box component="form" noValidate sx={{ width: '100%', pl: 2, pr: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <TextField
              margin="normal"
              fullWidth
              variant="filled"
              id="username"
              label="ค้นหา"
              name="username"
              autoComplete="username"
              autoFocus
              sx={{ backgroundColor: "white" }}
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
                value={age}
                label="Age"
                onChange={handleChange}
                sx={{ backgroundColor: "white" }}
              >
                <MenuItem value={"near"}>ใกล้สุด-ไกลสุด</MenuItem>
                <MenuItem value={"far"}>ไกลสุด-ใกล้สุด</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
    </Grid>
  );
};

export default Header;

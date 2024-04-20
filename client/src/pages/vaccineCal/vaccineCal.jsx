import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useContext, useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button } from "@mui/material";
import Alert from "@mui/material/Alert";
import moment from "moment";
import { Box, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const VaccineCal = () => {
  const { dispatch, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [queue, setQueue] = useState([]);
  const [birthday, setBirthday] = React.useState(null);



  useEffect(() => {
    handleQueue();
  }, [queue]);

  const handleCancel = async (row) => {
    try {
      console.log("XXXXX", row.id);
      const status = "Cancel";
      const dataToSend = {
        status: status,
      };
      await axios.put(`${process.env.REACT_APP_API}/appointment/${row.id}`, dataToSend);
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };
  const handleBooking = async (row) => {
    try {
      const status = "Pending";
      const dataToSend = {
        status: status,
      };
      await axios.put(`${process.env.REACT_APP_API}/appointment/${row.id}`, dataToSend);
    } catch (error) {
      console.error("Error cancelling appointment:", error);
    }
  };

  const handleQueue = async (values, actions) => {
    dispatch({ type: "APPOINTMENT_START" });
    try {
      if (user) {
        const res = await axios.get(`${process.env.REACT_APP_API}/appointment/${user._id}`);
        const newData = res.data;
        newData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setQueue(newData);
        dispatch({ type: "APPOINTMENT_SUCCESS", payload: res.data.details });
      }
    } catch (err) {
      console.error("Appointment failed:", err);
      dispatch({ type: "APPOINTMENT_FAILURE", payload: err.response.data });
    }
  };

  function createData(id, date, name, hospital, department, time, status) {
    return { id, date, name, hospital, department, time, status };
  }

  const rows = queue.map((queueItem) =>
    createData(
      queueItem._id,
      moment(queueItem.createdAt).format("DD/MM/YYYY"),
      `${queueItem.name} ${queueItem.lastname}`,
      queueItem.hospitalName,
      queueItem.department,
      `${queueItem.start_time} น. - ${queueItem.stop_time}น.`,
      queueItem.status
    )
  );

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div style={{ backgroundColor: "#EEEEE6", minHeight: "100vh" }}>
      <TableContainer sx={{ mt: 8, p: 4 }}>
        <Navbar />
        <h2 style={{ alignItems: "center", display: "flex", justifyContent: "center" }}>ค้นหาวัคซีน</h2>
        <Grid container component="main" sx={{ mt: 2 }}>
          <Box component="form" noValidate sx={{ width: '100%', pl: 2, pr: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    sx={{ width: "100%",backgroundColor: "white" }}
                    disableFuture
                    value={birthday}
                    onChange={(newValue, context) => {
                      if (context.validationError == null) {
                        setBirthday(newValue);
                      }
                    }}
                  />
                </LocalizationProvider>
              </Grid>
              <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">ราคาต่ำสุด</InputLabel>
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
              <Grid item xs={12} sm={3} sx={{ display: 'flex', alignItems: 'center' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">ราคาสูงสุด</InputLabel>
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
              <Grid item xs={12} sm={2} sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                fullWidth
                variant="contain"
                sx={{backgroundColor:"#77B255"}}
                >
                  ค้นหา
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Grid>
        <Table sx={{ minWidth: 650, mt: 4 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "#77B255" }}>
            <TableRow>
              <TableCell>ชื่อวัคซีน</TableCell>
              <TableCell align="center">ช่วงอายุ</TableCell>
              <TableCell align="center">ประเภทวัคซีน</TableCell>
              <TableCell align="center">ราคาวัคซีน</TableCell>
              {/* <TableCell align="center">เวลา</TableCell> */}
              <TableCell align="center">เลือก</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{ backgroundColor: "#F7F7F6" }}>
            {rows.map((row) => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.date}</TableCell>
                <TableCell align="center">{row.hospital}</TableCell>
                <TableCell align="center">{row.department}</TableCell>
                <TableCell align="center">{row.time}</TableCell>
                <TableCell align="center">
                  {row.status === "Pending" ? (
                    <Alert
                      severity="info"
                      variant="filled"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "1rem",
                        padding: "8px",
                      }}
                    >
                      รอคิว
                    </Alert>
                  ) : row.status === "Cancel" ? (
                    <Alert
                      severity="error"
                      variant="filled"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "1rem",
                        padding: "8px",
                      }}
                    >
                      ยกเลิก
                    </Alert>
                  ) : (
                    row.status === "Complete" && (
                      <Alert
                        severity="success"
                        variant="filled"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          fontSize: "1rem",
                          padding: "8px",
                        }}
                      >
                        จองสำเร็จ
                      </Alert>
                    )
                  )}
                </TableCell>
                <TableCell align="right">
                  {row.status === "Pending" ? (
                    <div>
                      <Button variant="outlined" color="error" onClick={() => handleCancel(row)}>
                        ยกเลิก
                      </Button>
                      <Button
                        variant="outlined"
                        color="primary"
                        sx={{ ml: 2 }}
                      // onClick={() => handleEdit(row)} // Assuming you have a handleEdit function for editing
                      >
                        แก้ไข
                      </Button>
                    </div>
                  ) : row.status === "Cancel" ? (
                    <Button variant="outlined" color="primary" onClick={() => handleBooking(row)} disabled>
                      ยกเลิก
                    </Button>
                  ) : (
                    <div>
                      <Button variant="outlined" color="error" onClick={() => handleCancel(row)} disabled>
                        ยกเลิก
                      </Button>
                      <Button variant="outlined" color="primary" sx={{ ml: 2 }} disabled>
                        แก้ไข
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default VaccineCal;

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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Grid, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import EditReserve from "../../components/editreserve/EditReserve";

const History = () => {
  const { dispatch, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [queue, setQueue] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = useState(null);
  const [idClinic, setIdClinic] = useState(null);
  const [idAppoint, setIdAppoint] = useState(null);

  const [openModal, setOpenModal] = useState(false);





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

  function createData(id, date, name, hospitalName, department, time, status,hospitalId) {
    return { id, date, name, hospitalName, department, time, status,hospitalId };
  }

  const rows = queue.map((queueItem) =>
    createData(
      queueItem._id,
      moment(queueItem.date).format("DD/MM/YYYY"),
      `${queueItem.name} ${queueItem.lastname}`,
      queueItem.hospitalName,
      queueItem.department,
      `${queueItem.start_time} น. - ${queueItem.stop_time}น.`,
      queueItem.status,
      queueItem.hospital
    )
  );

  const handleClick = (row) => {
    if (user) {
      setOpenModal(true);
    } 
    setIdClinic(row.hospitalId)
    setIdAppoint(row.id)
  };

  return (
    <div>
      
      <div style={{ backgroundColor: "#EEEEE6", minHeight: "100vh" }}>
        <TableContainer sx={{ mt: 8, p: 4 }}>
          <Navbar />
          <h2 style={{ alignItems: "center", display: "flex", justifyContent: "center" }}>บันทึกการเข้ารับบริการทางการแพทย์</h2>
          <Table sx={{ minWidth: 650, mt: 4 }} aria-label="simple table">
            <TableHead sx={{ backgroundColor: "#77B255" }}>
              <TableRow>
                <TableCell>ชื่อ-นามสกุล</TableCell>
                <TableCell align="center">วัน/เดือน/ปีเกิด</TableCell>
                <TableCell align="center">สถานบริการ</TableCell>
                <TableCell align="center">บริการ</TableCell>
                <TableCell align="center">เวลา</TableCell>
                <TableCell align="center">สถานะ</TableCell>
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
                  <TableCell align="center">{row.hospitalName}</TableCell>
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
                        รอการยืนยัน
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
                          onClick={() => handleClick(row)}
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
                        <Button variant="outlined" color="primary" sx={{ ml: 2 }} disabled >
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
      {openModal && <EditReserve setOpen={setOpenModal} clinicId={idClinic}  appointmentId={idAppoint}/>}
    </div>

  );
};

export default History;

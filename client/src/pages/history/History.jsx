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

const History = () => {
  const { dispatch, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [queue, setQueue] = useState([]);

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

  return (
    <TableContainer sx={{ mt: 8, p: 4 }}>
      <Navbar />
      <h2 style={{ alignItem: "center", display: "flex", justifyContent: "center" }}>ประวัติการรักษา</h2>
      <Table sx={{ minWidth: 650, mt: 4 }} aria-label="simple table">
        <TableHead sx={{ backgroundColor: "#77B255" }}>
          <TableRow>
            <TableCell>ชื่อ-นามสกุล</TableCell>
            <TableCell align="center">วันที่</TableCell>
            <TableCell align="center">คลินิค</TableCell>
            <TableCell align="center">แผนก</TableCell>
            <TableCell align="center">เวลา</TableCell>
            <TableCell align="center">สถานะ</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ backgroundColor: "#EEEEE6" }}>
          {rows.map((row) => (
            <TableRow
              key={row.name}

              //
            >
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
  );
};

export default History;

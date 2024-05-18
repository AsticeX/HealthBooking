import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Formik } from "formik";
import "./reserve.css";
import useFetch from "../../hooks/useFetch";
import { useContext, useState, useEffect } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, TextField } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Alert from '@mui/material/Alert';


const Reserve = ({ setOpen, clinicId }) => {
  const { dispatch, user } = useContext(AuthContext);
  // const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`${process.env.REACT_APP_API}/clinics/find/${clinicId}`);
  const [departmentData, setDepartmentData] = useState("");
  const [queue, setQueue] = useState([]);
  const [selectedQueue, setSelectedQueue] = useState("");
  const [date, setDate] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [available, setAvaliable] = useState(0);



  const isTimeInRange = (startTime, stopTime, selectedDate) => {
    const currentDate = new Date();
    const selectedDateObj = new Date(selectedDate);
    const currentDateTime = currentDate.setHours(0, 0, 0, 0);
    const selectedDateTime = selectedDateObj.setHours(0, 0, 0, 0);

    // If the selected date is in the future, return false to indicate all times are selectable
    if (selectedDateTime > currentDateTime) {
        return false;
    }

    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();

    const startHour = parseInt(startTime.split(':')[0], 10);
    const startMinute = parseInt(startTime.split(':')[1], 10);
    const stopHour = parseInt(stopTime.split(':')[0], 10);
    const stopMinute = parseInt(stopTime.split(':')[1], 10);

    let currentMinutes = currentHour * 60 + currentMinute;
    const startMinutes = startHour * 60 + startMinute;
    let stopMinutes = stopHour * 60 + stopMinute;

    if (stopMinutes < startMinutes) {
        stopMinutes += 24 * 60;
        if (currentMinutes < startMinutes) {
            currentMinutes += 24 * 60;
        }
    }

    return currentMinutes >= startMinutes && currentMinutes < stopMinutes;
};


  
  // Test cases
  console.log(isTimeInRange("19:00", "22:40")); // true
  console.log(isTimeInRange("23:00", "00:00")); // true
  
  const navigate = useNavigate();

  const department = data.department;
  const hospitalName = data.name;
  const hospitalUserIdData = data.user_id;
  // const queue = data.queue

  const handleQueue = async (values, actions) => {
    dispatch({ type: "APPOINTMENT_START" });
    try {
      if (user) {
        const res = await axios.get(`${process.env.REACT_APP_API}/queue_by_hospital_id/${clinicId}`);
        const dataQueue = res.data;
        setQueue(dataQueue);
        dispatch({ type: "APPOINTMENT_SUCCESS", payload: res.data.details });
      }
    } catch (err) {
      console.error("Appointment failed:", err);
      dispatch({ type: "APPOINTMENT_FAILURE", payload: err.response.data });
    }
  };

  useEffect(() => {

    handleQueue();
  }, [queue]);

  // useEffect(() => {
  //   // console.log(queue);
  // }, [])

  const schema = Yup.object().shape({
    name: Yup.string().required("Name is a required field"),
    lastname: Yup.string().required("Lastname is a required field"),
  });

  const handleChangeClick = (event) => {
    const selectedValue = event.target.value;
    setDepartmentData(selectedValue || "");
  };

  const handleQueueChange = (event) => {
    const selectedQueueId = event.target.value;
    setSelectedQueue(selectedQueueId || "");
  };

  const handleClick = async (values, actions) => {
    dispatch({ type: "APPOINTMENT_START" });

    try {
      if (user) {
        const dataToSend = {
          ...values,
          hospital_user_Id: hospitalUserIdData,
          date: date,
          department: departmentData,
          hospital: clinicId,
          hospitalName: hospitalName,
          user_Id: `${user._id}`,
          queue: selectedQueue,
          start_time: queue.find((item) => item._id === selectedQueue)?.start_time,
          stop_time: queue.find((item) => item._id === selectedQueue)?.stop_time,
        };
        const res = await axios.post(`${process.env.REACT_APP_API}/appointment`, dataToSend);
        setAvaliable(res.data.availableSlots)
        setShowAlert(false)
        dispatch({ type: "APPOINTMENT_SUCCESS", payload: res.data.details });
        navigate("/main", { state: { fromLogin: true } });
      }
    } catch (err) {
      setShowAlert(true)
      console.error("Appointment failed:", err);
      dispatch({ type: "APPOINTMENT_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon icon={faCircleXmark} className="rClose" onClick={() => setOpen(false)} />
        <span>กรอกข้อมูลการจอง</span>
        <Formik
          validationSchema={schema}
          initialValues={{
            name: user ? user.name : "",
            lastname: user ? user.lastname : "",
          }}
          onSubmit={(values, actions) => handleClick(values, actions)}
        >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
            <Box component="form" onSubmit={handleSubmit} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="name"
                    label="ชื่อ"
                    name="name"
                    autoComplete="name"
                    autoFocus
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && !!errors.name}
                    helperText={touched.name && errors.name}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="lastname"
                    label="นามสกุล"
                    name="lastname"
                    type="lastname"
                    autoComplete="current-lastname"
                    value={values.lastname}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.lastname && !!errors.lastname}
                    helperText={touched.lastname && errors.lastname}
                    variant="outlined"
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      sx={{ width: "100%" }}
                      disablePast
                      label="วันที่"
                      format="DD/MM/YYYY"
                      value={date}
                      onChange={(newValue, context) => {
                        if (context.validationError == null) {
                          setDate(newValue);
                        }
                      }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12} sm={12}>
                  {!loading && department && (
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">แผนก</InputLabel>
                      <Select labelId="demo-simple-select-label" id="demo-simple-select" value={departmentData} label="Age" onChange={handleChangeClick} sx={{ backgroundColor: "white" }}>
                        {department.map((clinic) => (
                          <MenuItem key={clinic} value={clinic}>
                            {clinic}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  )}
                </Grid>
                <Grid item xs={12} sm={12}>
                  {!loading && queue && departmentData && queue.length > 0 && (
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">คิว</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={selectedQueue}
                        label="Age"
                        onChange={handleQueueChange}
                        sx={{ backgroundColor: "white" }}
                      >
                        {queue
                          .filter((queueItem) => queueItem.department === departmentData) 
                          .sort((a, b) => a.start_time.localeCompare(b.start_time))
                          .map((queueItem) => {
                            const disabled = isTimeInRange(queueItem.start_time, queueItem.stop_time);
                            return (
                              <MenuItem key={queueItem._id} value={queueItem._id} disabled={isTimeInRange(queueItem.start_time, queueItem.stop_time,date)}>
                                {queueItem.start_time} น. - {queueItem.stop_time} น.
                              </MenuItem>
                            );
                          })}

                      </Select>
                    </FormControl>
                  )}
                  {(loading || !queue || queue.length === 0) && (
                    <p>{loading ? 'Loading...' : 'No queues available'}</p>
                  )}
                </Grid>

                <Grid item xs={12} sm={12}>
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    label="หมายเหตุ"
                    name="description"
                    autoComplete="description"
                    autoFocus
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.description && !!errors.description}
                    helperText={touched.description && errors.description}
                    variant="outlined"
                  />
                </Grid>
              </Grid>
              {showAlert && (
                <Alert variant="outlined" severity="warning">
                  คิวที่คุณเลือกเต็มแล้วโปรดเลือกใหม่
                </Alert>
              )}
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button type="submit" variant="contained" sx={{ background: "#77B255" }} onClick={handleSubmit}>
                  จอง
                </Button>
              </Grid>
            </Box>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Reserve;

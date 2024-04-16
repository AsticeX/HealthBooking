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
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';




const Reserve = ({ setOpen, clinicId }) => {
  const { dispatch, user } = useContext(AuthContext);
  // const [selectedRooms, setSelectedRooms] = useState([]);
  const { data, loading, error } = useFetch(`/clinics/find/${clinicId}`);
  const [departmentData, setDepartmentData] = useState('');
  // const { dates } = useContext(SearchContext);
  const navigate = useNavigate();

  const department = data.department



  const schema = Yup.object().shape({
    name: Yup.string()
      .required("Name is a required field"),
    lastname: Yup.string()
      .required("Lastname is a required field"),
  });

  const handleChangeClick = (event) => {
    const selectedValue = event.target.value;
    setDepartmentData(selectedValue || '');
  };


  const handleClick = async (values, actions) => {
    dispatch({ type: "APPOINTMENT_START" });

    try {
      if (user) {
        const dataToSend = { ...values, department: departmentData, hospital: clinicId, user_Id: `${user._id}` };
        const res = await axios.post(`${process.env.REACT_APP_API}/appointment`, dataToSend);
        dispatch({ type: "APPOINTMENT_SUCCESS", payload: res.data.details });
        navigate("/main", { state: { fromLogin: true } });
      }

    } catch (err) {
      console.error("Appointment failed:", err);
      dispatch({ type: "APPOINTMENT_FAILURE", payload: err.response.data });
    }
  };



  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
        <span>กรอกข้อมูลการจอง</span>
        <Formik
          validationSchema={schema}
          initialValues={{ name: `${user.name}`, lastname: `${user.lastname}` }}
          onSubmit={(values, actions) => handleClick(values, actions)}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <Box component="form" onSubmit={handleSubmit} noValidate  >

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
                <Grid item xs={12} sm={12}>
                  {!loading && department && (
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">แผนก</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={departmentData}
                        label="Age"
                        onChange={handleChangeClick}
                        sx={{ backgroundColor: 'white' }}
                      >
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
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    id="description"
                    label="คำอธิบาย"
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
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end" }}> {/* Aligns the button to the right */}
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ background: "#77B255" }}
                  onClick={handleSubmit} // Add your submit handler function here
                >
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

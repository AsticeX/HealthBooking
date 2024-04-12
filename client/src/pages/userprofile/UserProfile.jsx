import React, { useContext, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Formik } from "formik";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Navbar from "../../components/navbar/Navbar";


const UserProfile = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = React.useState('');
  const [birthday, setBirthday] = React.useState(null);


  const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };


  const handleChangeTel = (newPhone) => {
    setPhone(newPhone);
  };


  const handleClickSnack = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const handleClick = async (values, actions) => {
    dispatch({ type: "REGISTER_START" });
    try {
      const dataToSend = { ...values, phone, birthday };
      const res = await axios.post("/auth/register", dataToSend);
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });
      navigate("/Login", { state: { fromLogin: true } });
      handleClickSnack();
    } catch (err) {
      console.error("Registration failed:", err);
      setShowAlert(true);
      dispatch({ type: "REGISTER_FAILURE", payload: err.response.data });
    }
  };

  const schema = Yup.object().shape({
    username: Yup.string()
      .required("Username is a required field"),
    email: Yup.string()
      .email('Invalid email')
      .required("Email is a required field"),
    name: Yup.string()
      .required("Name is a required field"),
    lastname: Yup.string()
      .required("Lastname is a required field"),
    phone: Yup.number()
      .typeError("Phone Number must be a number")
      .required("Phone Number is a required field"),
    password: Yup.string()
      .required("Password is a required field")
    // .min(8, "Password must be at least 8 characters"),
  });

  return (
    <Grid container component="main" sx={{ height: '100vh', display: "flex", justifyContent: "center" }}>
      <Navbar />
      <CssBaseline />
      <Grid item xs={12} sm={8} md={5} elevation={6} square >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5" sx={{ marginBottom: 5 }}>
            Profile
          </Typography>
          <Formik
            validationSchema={schema}
            initialValues={{ password: "", name: "", lastname: "", disease: "" }}
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
                <div style={{ alignItems: "center", display: "flex", justifyContent: "center" }}>
                  <input accept="image/*" id="upload-avatar-pic" type="file" hidden onChange={handleImageChange}/>
                  <label htmlFor="upload-avatar-pic">
                    <IconButton component="span" >
                      <Avatar
                        sx={{ width: 64, height: 64 }} src={image} />
                    </IconButton>
                  </label>
                </div>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="name"
                      label="Name"
                      name="name"
                      autoComplete="name"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.name && !!errors.name}
                      helperText={touched.name && errors.name}
                      variant="outlined"
                      className={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="lastname"
                      label="Lastname"
                      name="lastname"
                      autoComplete="current-lastname"
                      value={values.lastname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.lastname && !!errors.lastname}
                      helperText={touched.lastname && errors.lastname}
                      variant="outlined"
                      className={touched.lastname && errors.lastname}
                    />
                  </Grid>
                  <Grid item xs={12} >
                    <TextField
                      margin="normal"
                      fullWidth
                      id="congenitaldisease"
                      label="Congenital disease(not required)"
                      name="congenitaldisease"
                      autoComplete="current-congenitaldisease"
                      value={values.disease}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.disease && !!errors.disease}
                      helperText={touched.disease && errors.disease}
                      variant="outlined"
                      className={touched.disease && errors.disease}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        sx={{ width: "100%" }}
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
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, background: '#77B255', }}
                >
                  บันทึก
                </Button>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                  <Alert
                    onClose={handleClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                  >
                    This is a success Alert inside a Snackbar!
                  </Alert>
                </Snackbar>
              </Box>
            )}
          </Formik>
        </Box>
      </Grid>
    </Grid>
  );
};

export default UserProfile;

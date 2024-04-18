import React, { useContext, useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { Formik } from "formik";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import { MuiTelInput } from 'mui-tel-input'
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';


const Register = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = React.useState('');
  const [birthday, setBirthday] = React.useState(null);


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
      const res = await axios.post(`${process.env.REACT_APP_API}/auth/register`, dataToSend);
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
    <Grid container component="main" sx={{ height: '100vh' }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/logo.png)`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#77B255',
          backgroundSize: '256px',
          backgroundPosition: 'center',
        }}
      />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square >
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Formik
            validationSchema={schema}
            initialValues={{ username: "", email: "", name: "", lastname: "", disease: "", phone: 0, password: "", gender: "MALE" }}
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
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      autoFocus
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.username && !!errors.username}
                      helperText={touched.username && errors.username}
                      variant="outlined"
                      className={touched.username && errors.username}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="password"
                      label="Password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                      variant="outlined"
                      className={touched.password && errors.password}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email address"
                      name="email"
                      autoComplete="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                      variant="outlined"
                      className={touched.email && errors.email}
                    />
                  </Grid>
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
                  <Grid item xs={12} sm={6}>
                    {/* <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="nation_id"
                      label="Nation ID"
                      name="nation_id"
                      autoComplete="nation_id"
                      value={values.nation_id}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.nation_id && !!errors.nation_id}
                      helperText={touched.nation_id && errors.nation_id}
                      variant="outlined"
                      className={touched.nation_id && errors.nation_id}
                    /> */}

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        sx={{width:"100%"}}
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
                  <Grid item xs={12} sm={6}>
                    <MuiTelInput
                      fullWidth
                      name="phone"
                      label="Phone Number"
                      type="phone"
                      id="phone"
                      defaultCountry="TH"
                      autoComplete="current-phone"
                      value={phone}
                      onChange={handleChangeTel}
                      onBlur={handleBlur}
                      error={touched.phone && !!errors.phone}
                      helperText={touched.phone && errors.phone}
                      variant="outlined"
                      className={touched.phone && errors.phone}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl component="fieldset">
                      <FormLabel component="legend">Gender</FormLabel>
                      <RadioGroup
                        row
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="row-radio-buttons-group"
                        defaultValue="MALE"
                        value={values.gender}
                        onChange={handleChange}
                      >
                        <FormControlLabel value="MALE" control={<Radio />} label="Male" />
                        <FormControlLabel value="FEMALE" control={<Radio />} label="Female" />
                        <FormControlLabel value="other" control={<Radio />} label="Other" />
                      </RadioGroup>

                    </FormControl>
                  </Grid>
                </Grid>
                {showAlert && (
                  <Alert severity="error">Email address or Username is used </Alert>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, background: '#77B255', }}
                >
                  Sign Up
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

export default Register;

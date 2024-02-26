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
const Register = () => {
  const { dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [open, setOpen] = useState(false);


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
      const res = await axios.post("/auth/register", values);
      dispatch({ type: "REGISTER_SUCCESS", payload: res.data.details });
      navigate("/Login", { state: { fromLogin: true } });
      handleClickSnack();
    } catch (err) {
      setShowAlert(true)
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
    nation_id: Yup.number()
      .min(13, "Nation ID must be at least 13 digits")
      .typeError("Nation ID must be a number")
      .required("Nation ID is a required field")
      .positive("Nation ID must be a positive number"),
    phone: Yup.number()
      .required("Phone Number is a required field")
      .typeError("Phone Number must be a number")
      .required("Phone Number is a required field"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters"),
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
          backgroundImage: 'url(https://i.pinimg.com/564x/9a/1c/82/9a1c820067facf2db26fca2f11fe1c9d.jpg), url(path/to/your/logo.png)',
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
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
            initialValues={{ username: "", email: "", name: "", lastname: "", nation_id: 0, phone: 0, password: "", gender: "MALE" }}
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
              <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                  margin="normal"
                  required
                  sx={{ mr: 1, width: 280 }}
                  // fullWidth
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
                <TextField
                  margin="normal"
                  required
                  // fullWidth
                  sx={{ width: 280 }}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  variant="outlined"
                  className={touched.password && errors.password}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  variant="outlined"
                  className={touched.email && errors.email}
                />
                <TextField
                  margin="normal"
                  required
                  sx={{ mr: 1, width: 280 }}
                  // fullWidth
                  name="name"
                  label="Name"
                  type="name"
                  id="name"
                  autoComplete="name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  variant="outlined"
                  className={touched.name && errors.name}
                />
                <TextField
                  margin="normal"
                  required
                  // fullWidth
                  sx={{ width: 280 }}
                  name="lastname"
                  label="Lastname"
                  type="lastname"
                  id="lastname"
                  autoComplete="current-lastname"
                  value={values.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.lastname && !!errors.lastname}
                  helperText={touched.lastname && errors.lastname}
                  variant="outlined"
                  className={touched.lastname && errors.lastname}
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="nation_id"
                  label="Nation ID"
                  name="nation_id"
                  autoComplete="nation_id"
                  autoFocus
                  value={values.nation_id}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.nation_id && !!errors.nation_id}
                  helperText={touched.nation_id && errors.nation_id}
                  variant="outlined"
                  className={touched.nation_id && errors.nation_id}
                />
                <MuiTelInput
                  fullWidth
                  sx={{ mt: 2 }}
                  name="phone"
                  label="Phone Number"
                  type="phone"
                  id="phone"
                  defaultCountry="TH"
                  autoComplete="current-phone"
                  // value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phone && !!errors.phone}
                  helperText={touched.phone && errors.phone}
                  variant="outlined"
                  className={touched.phone && errors.phone}
                />
                {/* <FormControl> */}
                <FormLabel id="demo-row-radio-buttons-group-label">Gender</FormLabel>
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
                {/* </FormControl> */}
                {showAlert && (
                  <Alert severity="error">Email address or Password Incorrect </Alert>
                )}
                {/* <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                /> */}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, background: '#32b372', }}
                >
                  Sign Up
                </Button>
                {/* <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Forgot password?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid> */}
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

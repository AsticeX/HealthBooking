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
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Login = () => {
  const { dispatch,user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/auth/login`, values);
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      localStorage.setItem('access_token', res.data.token);
      axios.defaults.headers.common['access_token'] = res.data.token;
      // console.log(res.data);
      navigate("/main", { state: { fromLogin: true } });
      handleClickSnack();
    } catch (err) {
      setShowAlert(true)
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  const schema = Yup.object().shape({
    email: Yup.string()
      .email('แบบฟอร์มอีเมลไม่ถูกต้อง')
      .required("โปรดใส่อีเมล"),
    password: Yup.string()
      .required("โปรดใส่รหัสผ่าน")
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
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
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
            เข้าสู่ระบบ
          </Typography>
          <Formik
            validationSchema={schema}
            initialValues={{ email: "", password: "" }}
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
                  fullWidth
                  id="email"
                  label="อีเมล"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  variant="outlined"
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="รหัสผ่าน"
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  autoComplete="current-password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  variant="outlined"
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
                {showAlert && (
                  <Alert severity="error">อีเมลหรือรหัสผ่านผิดโปรดตรวจสอบ</Alert>
                )}
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2, background: '#77B255' }}
                >
                  เข้าสู่ระบบ
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/forgot" variant="body2">
                      ลืมรหัสผ่าน?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/register" variant="body2">
                      {"ไม่มีบัญชี? สมัครสมาชิก"}
                    </Link>
                  </Grid>
                </Grid>
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

export default Login;

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
const Forgot = () => {
    const { dispatch } = useContext(AuthContext);
    const navigate = useNavigate();
    const [showAlert, setShowAlert] = useState(false);
    const [open, setOpen] = useState(false);
    const [phone, setPhone] = React.useState('');

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
            const dataToSend = { ...values, phone };
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
        email: Yup.string()
            .email('Invalid email')
            .required("Email is a required field"),

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
                    backgroundColor: '#32b372',
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
                        Forgot Password 
                    </Typography>
                    <Formik
                        validationSchema={schema}
                        initialValues={{ username: "", email: "", name: "", lastname: "", nation_id: "", phone: 0, password: "", gender: "MALE" }}
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
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{alignContent:"center",mt:16}}  >
                                <Grid container>
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
                                            sx={{width:500, alignItems:"centers"}}
                                        />
                                    </Grid>
                                </Grid>

                                {showAlert && (
                                    <Alert severity="error">Email address or Username is used </Alert>
                                )}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 6, mb: 2, background: '#32b372', }}
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

export default Forgot;

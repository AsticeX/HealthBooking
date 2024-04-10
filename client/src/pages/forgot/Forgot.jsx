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
            const res = await axios.post("/users/forgot-password", values);
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
        <Grid container component="main" sx={{ height: '100',marginTop:8, display: "flex", justifyContent: "center" }}>
            <CssBaseline />
            <Grid item xs={12} sm={6} md={6} component={Paper} elevation={6} square >
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
                        เปลี่ยนรหัสผ่าน 
                    </Typography>
                    <Formik
                        validationSchema={schema}
                        initialValues={{ email: "" }}
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
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{alignContent:"center",mt:4}}  >
                                <Grid container>
                                    <Grid item xs={12} sm={12} md={12}>
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
                                            sx={{alignItems:"center"}}
                                        />
                                    </Grid>
                                    
                                </Grid>

                                {/* {showAlert && (
                                    <Alert severity="error">Email address or Username is used </Alert>
                                )} */}
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 6, mb: 2, background: '#77B255', }}
                                >
                                    ส่ง
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

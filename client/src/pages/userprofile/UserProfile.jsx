import React, { useContext, useEffect, useState } from "react";
import "./UserProfile.css";
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
import useFetch from "../../hooks/useFetch";
import UploadIcon from '@mui/icons-material/Upload';
const UserProfile = () => {
  const { dispatch, user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = React.useState('');
  const [birthday, setBirthday] = React.useState(null);
  const [profile, setProfile] = React.useState('');
  const [files, setFiles] = useState("");



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

    console.log("XXXXXXXXXX");
    try {
      if (user) {
        const photo = await Promise.all(
          Object.values(files).map(async (file) => {
            const data = new FormData();
            data.append("file", file);
            data.append("upload_preset", "gijwryvm");
            const uploadRes = await axios.post(
              "https://api.cloudinary.com/v1_1/dahdw7wqc/image/upload",
              data
            );
            console.log();
            const { url } = uploadRes.data;
            return url;
          })
        );
        const dataToSend = { ...values, birthday,photo:photo[0] };
        const res = await axios.put(`/users/${user._id}`, dataToSend);
        navigate("/main", { state: { fromLogin: true } });
        handleClickSnack();
      }
    } catch (err) {
      console.error("Registration failed:", err);
      setShowAlert(true);
    }
  };

  const schema = Yup.object().shape({
    name: Yup.string()
      .required("Name is a required field"),
    lastname: Yup.string()
      .required("Lastname is a required field"),

  });

  if (!user) {
    return null;
  }

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
            โปรไฟล์
          </Typography>
          <Formik
            validationSchema={schema}
            initialValues={{ name: `${user.name}`, lastname: `${user.lastname}`, disease: `${user.disease}` }}
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
                <div className="new">
                  <div className="newContainer">
                    <div className="bottom">
                      <div className="left">
                        <img
                          src={
                            files
                              ? URL.createObjectURL(files[0])
                              : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                          }
                          alt=""
                        />
                      </div>
                      
                    </div>
                    <div className="bottom">
                        <form style={{ display: "flex", justifyContent: "center" }}>
                          <div >
                            <label htmlFor="file">
                              Upload: <UploadIcon className="icon" />
                            </label>
                            <input
                              type="file"
                              id="file"
                              // multiple
                              onChange={(e) => setFiles(e.target.files)}
                              style={{ display: "none" }}
                            />
                          </div>
                        </form>
                      </div>
                  </div>
                </div>


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
                      label="นามสกุล"
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
                      id="disease"
                      label="โรคประจำตัว(ถ้าไม่มีไม่จำเป็นต้องกรอก)"
                      name="disease"
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

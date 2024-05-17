import Featured from "../../components/featured/Featured";
import FeaturedProperties from "../../components/featuredProperties/FeaturedProperties";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
// import SearchItem from "../../components/searchItem/SearchItem";
import Navbar from "../../components/navbar/Navbar";
import PropertyList from "../../components/propertyList/PropertyList";
import "./main.css";
import React, { useState, useEffect } from "react";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useLocation } from "react-router-dom";
import ClinicList from "../list/List";
const Main = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.fromLogin) {
      setOpenSnackbar(true);
    }
  }, [location.state]);

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

  };
  return (
    <div style={{backgroundColor:"#77B255"}}>
      <Navbar />
      <Header/>
      <div className="homeContainer">
        <ClinicList />
        <Footer />
      </div>
      {/* <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Alert onClose={handleCloseSnackbar} severity="success" variant="filled">
          Login Successful
        </Alert>
      </Snackbar> */}
    </div>
  );
};

export default Main;

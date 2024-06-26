import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Hotel from "./pages/hotel/Hotel";
import List from "./pages/list/List";
import Login from "./pages/login/Login";
import Main from "./pages/main/Main";
import Register from "./pages/register/Register";
import VaccineComponent from "./pages/vaccine/VaccineComponent";
import Forgot from "./pages/forgot/Forgot";
import Hospital from "./pages/hospital/Hospital";
import UserProfile from "./pages/userprofile/UserProfile";
import Reset from "./pages/resetpassword/Reset";
import History from "./pages/history/History";
import VaccineCal from "./pages/vaccineCal/vaccineCal";
import { useEffect } from "react";

import axios from "axios";

axios.defaults.withCredentials = true;

function App() {
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      axios.defaults.headers.common["access_token"] = token;
    }
  }, []);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/clinics" element={<List />} />
        <Route path="/clinics/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/vaccine" element={<VaccineComponent />} />
        <Route path="/hospital" element={<Hospital />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/history" element={<History />} />
        <Route path="/vaccinecalculate" element={<VaccineCal />} />
        <Route path="/reset_password/:id/:token" element={<Reset />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

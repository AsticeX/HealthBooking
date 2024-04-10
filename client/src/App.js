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
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/hotels" element={<List />} />
        <Route path="/hotels/:id" element={<Hotel />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/vaccine" element={<VaccineComponent />} />
        <Route path="/hospital" element={<Hospital />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/reset_password/:id/:token" element={<Reset />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

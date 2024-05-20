import * as React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import Cal_List from "../cal_list/Cal_List";
import Topbar from "../../components/topbar/Topbar";
const VaccineCal = () => {
  return (
    <div style={{ backgroundColor: "#EEEEE6", minHeight: "100vh" }}>
      <div sx={{ mt: 8, p: 4 }}>
        <Navbar />
        <Cal_List />
        <Footer />
      </div>
    </div>
  );
};

export default VaccineCal;

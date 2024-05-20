// Import necessary dependencies
import React, { useState, useEffect } from "react";
import axios from "axios";
import useFetch from "../../hooks/useFetch";
import { queueInputs } from "../../formSource";
import "./newQueue.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const NewQueue = () => {
  const [info, setInfo] = useState({});
  const [clinicId, setClinicId] = useState(undefined);
  const [department, setDepartment] = useState("");
  const [startTime, setStartTime] = useState("");
  const [stopTime, setStopTime] = useState("");
  const [userClinics, setUserClinics] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchUserClinics = async () => {
      try {
        // Fetch clinics associated with the logged-in user
        const response = await axios.get(`${process.env.REACT_APP_API}/clinics/auth/${user.username}`);
        setUserClinics(response.data);
      } catch (error) {
        console.error("Error fetching user clinics:", error);
      }
    };

    fetchUserClinics();
  }, [user]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInfo((prevInfo) => ({ ...prevInfo, [id]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      console.log(user.username);
      // Create the new queue item
      const response = await axios.post("/queue", {
        ...info,
        user_id: user.username,
        hospital_id: clinicId,
        department,
        start_time: startTime,
        stop_time: stopTime,
      });

      const {
        data: { _id: queueId },
      } = response;
      const clinicResponse = await axios.get(`/clinics/${clinicId}`);
      const {
        data: { queue: currentQueue },
      } = clinicResponse;
      const updatedQueue = [...currentQueue, queueId];
      await axios.put(`/clinics/${clinicId}`, { queue: updatedQueue });
      console.log("Service added successfully!");
    } catch (err) {
      console.error("Error adding service:", err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>เพิ่มบริการ</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput">
                <label>เลือกสถานบริการ</label>
                <select id="clinicId" onChange={(e) => setClinicId(e.target.value)} value={clinicId || ""}>
                  <option value="" disabled>
                    เลือกสถานบริการ
                  </option>
                  {userClinics.map((clinic) => (
                    <option key={clinic._id} value={clinic._id}>
                      {clinic.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="formInput">
                <label>เลือกบริการ</label>
                <select id="department" onChange={(e) => setDepartment(e.target.value)} value={department || ""}>
                  <option value="" disabled>
                    เลือกบริการ
                  </option>
                  {userClinics
                    .find((clinic) => clinic._id === clinicId)
                    ?.department.map((dept) => (
                      <option key={dept} value={dept}>
                        {dept}
                      </option>
                    ))}
                </select>
              </div>
              <div className="formInput">
                <label>เวลาเริ้ม</label>
                <input type="time" id="startTime" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
              </div>
              <div className="formInput">
                <label>เวลาสิ้นสุด</label>
                <input type="time" id="stopTime" value={stopTime} onChange={(e) => setStopTime(e.target.value)} />
              </div>
              {queueInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleChange} />
                </div>
              ))}
              <div className="submitBtn">
                <button onClick={handleClick}>Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewQueue;

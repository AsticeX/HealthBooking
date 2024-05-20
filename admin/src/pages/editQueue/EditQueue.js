import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./editQueue.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const EditQueue = () => {
  const { id } = useParams();
  const [clinicId, setClinicId] = useState("");
  const [department, setDepartment] = useState("");
  const [startTime, setStartTime] = useState("");
  const [stopTime, setStopTime] = useState("");
  const [maxQueue, setMaxQueue] = useState(0); // Add state for MaxQueue
  const [clinics, setClinics] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/queue/${id}`);
        const data = response.data;
        setClinicId(data.hospital_id);
        setDepartment(data.department);
        setStartTime(data.start_time);
        setStopTime(data.stop_time);
        setMaxQueue(data.max_queue); // Set MaxQueue from response
        setLoading(false);
      } catch (err) {
        console.error("Error fetching queue:", err);
      }
    };

    const fetchClinics = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/clinics`);
        setClinics(response.data);
      } catch (err) {
        console.error("Error fetching clinics:", err);
      }
    };

    fetchQueue();
    fetchClinics();
  }, [id]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        if (clinicId) {
          const response = await axios.get(`${process.env.REACT_APP_API}/clinics/${clinicId}/departments`);
          setDepartments(response.data);
        }
      } catch (err) {
        console.error("Error fetching departments:", err);
      }
    };

    fetchDepartments();
  }, [clinicId]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${process.env.REACT_APP_API}/queue/${id}`, {
        hospital_id: clinicId,
        department,
        start_time: startTime,
        stop_time: stopTime,
        max_queue: maxQueue,
      });
    } catch (err) {
      console.error("Error updating queue:", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>แก้ไขบริการ</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleUpdate}>
              <div className="formInput">
                <label>เลือกสถานบริการ</label>
                <select value={clinicId} onChange={(e) => setClinicId(e.target.value)} required>
                  <option value="" disabled>
                    เลือกสถานบริการ{" "}
                  </option>
                  {clinics
                    .filter((clinic) => clinic.user_id === user.username) // Filter clinics based on user ID
                    .map((clinic) => (
                      <option key={clinic._id} value={clinic._id}>
                        {clinic.name}
                      </option>
                    ))}
                </select>
              </div>

              <div className="formInput">
                <label>เลือกบริการ</label>
                <select value={department} onChange={(e) => setDepartment(e.target.value)} required>
                  <option value="" disabled>
                    เลือกบริการ
                  </option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
              <div className="formInput">
                <label>เวลาเริ้ม</label>
                <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
              </div>
              <div className="formInput">
                <label>เวลาสิ้นสุด</label>
                <input type="time" value={stopTime} onChange={(e) => setStopTime(e.target.value)} required />
              </div>
              <div className="formInput">
                <label>ผู้ใช้บริการสูงสุด</label>
                <input type="number" value={maxQueue} onChange={(e) => setMaxQueue(e.target.value)} required />
              </div>
              <div className="submitBtn">
                <button type="submit">Update</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditQueue;

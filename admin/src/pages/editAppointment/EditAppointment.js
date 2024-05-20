import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./editAppointment.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const EditQueue = () => {
  const { id } = useParams();
  const [clinicId, setClinicId] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [startTime, setStartTime] = useState("");
  const [stopTime, setStopTime] = useState("");
  const [status, setStatus] = useState(""); // State for status dropdown
  const [clinics, setClinics] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchQueue = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/appointments/${id}`);
        const data = response.data;
        setClinicId(data.hospital_id);
        setName(data.name);
        setLastName(data.lastname);
        setDepartment(data.department);
        setStartTime(data.start_time);
        setStopTime(data.stop_time);
        setStatus(data.status); // Set status from fetched data
        setPhone(data.phone);
        setDescription(data.description);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching queue:", err);
      }
    };

    const fetchClinics = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API}/appointment`);
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
      await axios.put(`${process.env.REACT_APP_API}/appointment/${id}`, {
        name: name,
        lastname: lastname,
        start_time: startTime,
        stop_time: stopTime,
        status: status, // Include status in the request body
      });
    } catch (err) {
      console.error("Error updating appointment:", err);
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
          <h1>แก้ไขการจอง</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleUpdate}>
              <div className="formInput">
                <label>สถานะ</label>
                <select value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="Complete">Complete</option>
                  <option value="Pending">Pending</option>
                  <option value="Cancel">Cancel</option>
                </select>
              </div>
              <div className="formInput">
                <label>ชื่อ</label>
                <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="formInput">
                <label>นามสกุล</label>
                <input id="lastname" value={lastname} onChange={(e) => setLastName(e.target.value)} />
              </div>
              <div className="formInput">
                <label>เวลาเริ่ม</label>
                <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
              </div>
              <div className="formInput">
                <label>เวลาสิ้นสุด</label>
                <input type="time" value={stopTime} onChange={(e) => setStopTime(e.target.value)} required />
              </div>
              <div className="formInput">
                <label>เบอร์</label>
                <input id="lastname" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="formInput">
                <label>หมายเหตุ</label>
                <input id="lastname" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="submitBtn">
                <button type="submit">บันทึก</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditQueue;

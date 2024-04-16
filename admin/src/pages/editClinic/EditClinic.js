import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./editClinic.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { clinicInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import Select from "react-select";
import { AuthContext } from "../../context/AuthContext";

const EditClinic = () => {
  const { id } = useParams();
  const [clinicData, setClinicData] = useState({});
  const [files, setFiles] = useState([]);
  const [queue, setQueue] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [departmentInputs, setDepartmentInputs] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const { data: queueData, loading: queueLoading } = useFetch(`/queue_by_hospital_id/${id}`);

  useEffect(() => {
    const fetchClinic = async () => {
      try {
        const response = await axios.get(`/clinics/${id}`);
        const clinic = response.data;
        setClinicData(clinic);
        setFiles(clinic.photos); // Set uploaded photos
        setInputValue(clinic.name);
        setSelectedAddress(clinic.address);
        setLatitude(clinic.latitude);
        setLongitude(clinic.longitude);
        setQueue(clinic.queue); // Set selected rooms
        setDepartmentInputs(clinic.department || []);
      } catch (error) {
        console.error("Error fetching clinic:", error);
      }
    };

    fetchClinic();
  }, [id]);

  const handleChange = (e) => {
    setClinicData((prevData) => ({ ...prevData, [e.target.id]: e.target.value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setQueue((prevQueue) => [...prevQueue, value]);
    } else {
      setQueue((prevQueue) => prevQueue.filter((item) => item !== value));
    }
  };

  const handleDepartmentInputChange = (index, value) => {
    const newInputs = [...departmentInputs];
    newInputs[index] = value;
    setDepartmentInputs(newInputs);
  };

  const addDepartmentInput = () => {
    setDepartmentInputs((prevInputs) => [...prevInputs, ""]);
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setInputValue(value);
    setClinicData((prevData) => ({ ...prevData, search: value }));
    searchPlace(value);
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
        files.map(async (file) => {
          if (file.url) {
            return file.url; // If file already uploaded, use URL directly
          }
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "gijwryvm");
          const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dahdw7wqc/image/upload", data);
          return uploadRes.data.url;
        })
      );

      const updatedClinic = {
        ...clinicData,
        name: inputValue,
        address: selectedAddress,
        latitude: latitude,
        longitude: longitude,
        department: departmentInputs,
        queue: queue,
        photos: list,
      };

      const res = await axios.put(`/clinics/${id}`, updatedClinic);
      console.log(res.data);
    } catch (error) {
      console.error("Error updating clinic:", error);
    }
  };

  const searchPlace = (value) => {
    // Implement your search function here
    // Use the value to search for clinics/places
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Edit Clinic</h1>
        </div>
        <div className="bottom">
          <div className="left">
            {files.map((file, index) => (
              <img key={index} src={file.url ? file.url : file instanceof File && URL.createObjectURL(file)} alt={`Image ${index}`} />
            ))}
          </div>
          <div className="right">
            <form onSubmit={handleClick}>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input type="file" id="file" multiple onChange={(e) => setFiles(e.target.files)} style={{ display: "none" }} />
              </div>
              <div className="formInput">
                <label>Name</label>
                <input id="name" value={inputValue} onChange={handleInputChange} />
              </div>
              <div className="formInput">
                <label>Address</label>
                <input id="address" value={selectedAddress} onChange={(e) => setSelectedAddress(e.target.value)} />
              </div>
              {clinicInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} value={clinicData[input.id]} onChange={handleChange} type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              {/* Department Inputs */}
              {departmentInputs.map((input, index) => (
                <div className="formInput" key={index}>
                  <label htmlFor={`department${index}`}>Department</label>
                  <input id={`department${index}`} value={input} onChange={(e) => handleDepartmentInputChange(index, e.target.value)} type="text" placeholder="Enter department" />
                </div>
              ))}
              <button type="button" onClick={addDepartmentInput}>
                Add Department
              </button>
              <div className="selectRooms">
                <label>Queue </label>
                {queueLoading
                  ? "Loading..."
                  : queueData &&
                    queueData.map((queueItem) => (
                      <div key={queueItem._id}>
                        <input type="checkbox" id={queueItem._id} value={queueItem._id} checked={queue.includes(queueItem._id)} onChange={handleCheckboxChange} />
                        <label htmlFor={queueItem._id}>
                          {queueItem.start_time} - {queueItem.stop_time}
                        </label>
                      </div>
                    ))}
              </div>

              <button type="submit">Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditClinic;

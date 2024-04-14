import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { clinicInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import Select from 'react-select';


const NewHotel = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [queue, setQueue] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [departmentInputs, setDepartmentInputs] = useState([""]);
  const [inputValue, setInputValue] = useState('');
  const [selectedAddress, setSelectedAddress] = useState(null);

  



  const { data, loading, error } = useFetch("/queue");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleHospitalNameClick = (hospitalName) => {
    // console.log(hospitalName);
    setInputValue(hospitalName.name);
    setSelectedAddress(hospitalName.address)

  }

  useEffect(() => {
    searchPlace()
  }, [])

  const searchPlace = (value) => {
    axios.get("https://api.longdo.com/POIService/json/search?", {
      params: {
        key: '79e088d5668d8e7316d055233c8cf1c4',
        keyword: value,
        tag: 'hospital',
        limit: 5,
      }
    })
      .then((response) => {
        console.log(response.data);
        const hospitals = response.data.data.map(hospital => {

          return hospital;
        });
        // const suggest = document.getElementById('result');
        // suggest.style.display = 'none';
        setSearchResults(hospitals);
      })
      .catch((error) => {
        console.error('Error searching nearby:', error);
      });
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
    setInfo((prevInfo) => ({ ...prevInfo, search: value }));
    searchPlace(value);
  };

  console.log(files);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const list = await Promise.all(
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
      console.log(selectedAddress);
      const newclinic = {
        ...info,
        name: inputValue,
        address:selectedAddress,
        department: departmentInputs, // Use departmentInputs instead of departments
        queue,
        photos: list,
      };
      const res = await axios.post("/clinics", newclinic);
      // console.log(res,"xxxxxx");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Clinic</h1>
        </div>
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
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>
              <div className="formInput">
                <label>Name</label>
                <input
                  id="search"
                  value={inputValue}
                  onChange={handleInputChange}
                />
                {searchResults.length > 0 && info.search && (
                  <div>
                    {searchResults.map((hospital) => (
                      <div key={hospital.id} onClick={() => handleHospitalNameClick(hospital)}>
                        {hospital.name}
                      </div>
                    ))}
                    
                  </div>
                  
                )}
              </div>
              <div className="formInput">
                <label>Address</label>
                <input
                  id="search"
                  value={selectedAddress}
                  onChange={handleInputChange}
                />
              </div>


              {clinicInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}

              {/* Department Inputs */}
              {departmentInputs.map((input, index) => (
                <div className="formInput" key={index}>
                  <label htmlFor={`department${index}`}>Department</label>
                  <input
                    id={`department${index}`}
                    value={input}
                    onChange={(e) => handleDepartmentInputChange(index, e.target.value)}
                    type="text"
                    placeholder="Enter department"
                  />
                </div>
              ))}
              <button type="button" onClick={addDepartmentInput}>
                Add Department
              </button>

              <div className="selectRooms">
                <label>Rooms</label>
                {loading ? (
                  "Loading..."
                ) : (
                  data &&
                  data.map((queueItem) => (
                    <div key={queueItem._id}>
                      <input
                        type="checkbox"
                        id={queueItem._id}
                        value={queueItem._id}
                        checked={queue.includes(queueItem._id)}
                        onChange={handleCheckboxChange}
                      />
                      <label htmlFor={queueItem._id}>{queueItem.department}</label>
                    </div>
                  ))
                )}
              </div>
              <button onClick={handleClick}>Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewHotel;

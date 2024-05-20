import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useEffect, useState } from "react";
import { clinicInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import Select from "react-select";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const NewHotel = () => {
  const [type, setTypes] = useState(""); // State for status dropdown
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [queue, setQueue] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [departmentInputs, setDepartmentInputs] = useState([""]);
  const [inputValue, setInputValue] = useState("");
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [longtidue, setLongtitude] = useState(null);

  const { data, loading, error } = useFetch(`${process.env.REACT_APP_API}/queue`);
  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleHospitalNameClick = (hospitalName) => {
    // console.log(hospitalName);
    setLatitude(hospitalName.lat);
    setLongtitude(hospitalName.lon);
    setInputValue(hospitalName.name);
    setSelectedAddress(hospitalName.address);
  };

  useEffect(() => {
    searchPlace();
  }, []);

  const searchPlace = (value) => {
    axios
      .get("https://api.longdo.com/POIService/json/search?", {
        params: {
          key: "79e088d5668d8e7316d055233c8cf1c4",
          keyword: value,
          tag: "hospital",
          limit: 5,
        },
      })
      .then((response) => {
        console.log(response.data);
        const hospitals = response.data.data.map((hospital) => {
          return hospital;
        });
        // const suggest = document.getElementById('result');
        // suggest.style.display = 'none';
        setSearchResults(hospitals);
      })
      .catch((error) => {
        console.error("Error searching nearby:", error);
      });
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
          const uploadRes = await axios.post("https://api.cloudinary.com/v1_1/dahdw7wqc/image/upload", data);
          console.log();
          const { url } = uploadRes.data;
          return url;
        })
      );
      console.log(selectedAddress);
      const newclinic = {
        ...info,
        user_id: user.username,
        name: inputValue,
        type: type,
        address: selectedAddress,
        latitude: latitude,
        longtitude: longtidue,
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
          <h1>เพิ่มสถานบริการ</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img src={files ? URL.createObjectURL(files[0]) : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"} alt="" />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input type="file" id="file" multiple onChange={(e) => setFiles(e.target.files)} style={{ display: "none" }} />
              </div>
              <div className="formInput">
                <label>ประเภท</label>
                <select value={type} onChange={(e) => setTypes(e.target.value)}>
                  <option value="" disabled>
                    เลือกประเภท
                  </option>
                  <option value="คลินิกเวชกรรม">คลินิกเวชกรรม</option>
                  <option value="คลินิกทันตกรรม">คลินิกทันตกรรม</option>
                  <option value="คลินิกการพยาบาลและผดุงครรภ์">คลินิกการพยาบาลและผดุงครรภ์</option>
                  <option value="คลินิกกายภาพบำบัด">คลินิกกายภาพบำบัด</option>
                  <option value="คลินิกเทคนิคการแพทย์">คลินิกเทคนิคการแพทย์</option>
                  <option value="คลินิกการแพทย์แผนไทย">คลินิกการแพทย์แผนไทย</option>
                  <option value="คลินิกการประกอบโรคศิลปะ 7 สาขา">คลินิกการประกอบโรคศิลปะ 7 สาขา</option>
                  <option value="คลินิกเฉพาะด้าน">คลินิกเฉพาะด้าน</option>
                  <option value="สหคลินิก">สหคลินิก</option>
                  <option value="สหคลินิก">อื่นๆ</option>
                </select>
              </div>
              <div className="formInput">
                <label>ชื่อสถานบริการ</label>
                <input id="search" value={inputValue} onChange={handleInputChange} />
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
                <label>ที่ตั้ง</label>
                <input id="search" value={selectedAddress} onChange={handleInputChange} />
              </div>

              {clinicInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} onChange={handleChange} type={input.type} placeholder={input.placeholder} />
                </div>
              ))}
              {/* Department Inputs */}
              {departmentInputs.map((input, index) => (
                <div className="formInput" key={index}>
                  <label htmlFor={`department${index}`}>แผนกที่ {index + 1}</label>
                  <input id={`department${index}`} value={input} onChange={(e) => handleDepartmentInputChange(index, e.target.value)} type="text" placeholder="" />
                </div>
              ))}
              <button type="button" onClick={addDepartmentInput}>
                เพิ่มแผนก
              </button>
              <button onClick={handleClick}>Add</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewHotel;

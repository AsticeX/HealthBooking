import "./newHotel.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import { clinicInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const NewHotel = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [queue, setQueue] = useState([]);
  const [departments, setDepartments] = useState([]);

  const { data, loading, error } = useFetch("/queue");


  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setQueue((prevQueue) => [...prevQueue, value]);
    } else {
      setQueue((prevQueue) => prevQueue.filter((item) => item !== value));
    }
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setQueue(value);
  };

  console.log(files)

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

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newclinic = {
        ...info,
        queue,
        photos: list,
      };
      const res = await axios.post("/clinics", newclinic);
      // console.log(res,"xxxxxx");
    } catch (err) { console.log(err) }
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
              {/* <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div> */}
              <div className="selectRooms">
                <label>Schedule</label>
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
                      <label htmlFor={queueItem._id}>ชื่อ:{queueItem.hospital_id} แผนก:{queueItem.department} เวลาทำกร:{queueItem.start_time} - {queueItem.stop_time}</label>
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

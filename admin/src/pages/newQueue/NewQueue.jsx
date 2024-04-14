// Import necessary dependencies and styles
import "./newQueue.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { queueInputs } from "../../formSource"; // Assuming you have a file for queue inputs
import axios from "axios";
import useFetch from "../../hooks/useFetch";




const NewQueue = () => {
  
  const [info, setInfo] = useState({});
  const [clinicId, setClinicId] = useState(undefined);
  const [department, setDepartment] = useState(""); // Define department state
  const { data, loading, error } = useFetch("/clinics");


  // Handle change function for input fields
  const handleChange = (e) => {
    const { id, value } = e.target;
    setInfo((prevInfo) => ({ ...prevInfo, [id]: value }));
  };

  // Handle click function for form submission
  const handleClick = async (e) => {
    e.preventDefault();
    try {
      // Send POST request to create new queue
      console.log(clinicId);
      await axios.post("/queue", { ...info, clinic_id: clinicId, department }); // Include department in the data to be submitted
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
          <h1>Add New Service</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form>
              <div className="formInput">
                <label>Choose a clinic</label>
                <select id="clinicId" onChange={(e) => setClinicId(e.target.value)} value={clinicId || ""}>
                  <option value="" disabled>
                    Select a hotel
                  </option>
                  {
                    data &&
                    data.map((clinics) => (
                      <option key={clinics._id} value={clinics.name}>
                        {clinics.name}
                      </option>
                    ))}
                </select>
              </div>
              <div className="formInput">
                <label>Select a department</label>
                <select id="department" onChange={(e) => setDepartment(e.target.value)} value={department || ""}>
                  <option value="" disabled>
                    Select a department
                  </option>
                  {
                    data &&
                    data.map((clinics) => (
                      <option key={clinics._id} value={clinics.department}>
                        {clinics.department}
                      </option>
                    ))}
                </select>
              </div>
              {queueInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input id={input.id} type={input.type} placeholder={input.placeholder} onChange={handleChange} />
                </div>
              ))}
              {/* Move the button below the form inputs */}
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

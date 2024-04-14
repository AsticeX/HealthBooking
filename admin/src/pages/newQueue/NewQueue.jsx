import "./newQueue.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import { useState } from "react";
import { queueInputs } from "../../formSource";
import axios from "axios";
import useFetch from "../../hooks/useFetch";

const NewQueue = () => {
  const [info, setInfo] = useState({});
  const [clinicId, setClinicId] = useState(undefined);
  const [department, setDepartment] = useState("");
  const { data, loading, error } = useFetch("/clinics");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInfo((prevInfo) => ({ ...prevInfo, [id]: value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      console.log(clinicId);
      await axios.post("/queue", { ...info, hospital_id: clinicId, department });
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
                    Select a clinic
                  </option>
                  {data &&
                    data.map((clinic) => (
                      <option key={clinic._id} value={clinic._id}>
                        {clinic.name}
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
                  {data &&
                    clinicId &&
                    data
                      .find((clinic) => clinic._id === clinicId)
                      ?.department.map((dept) => (
                        <option key={dept} value={dept}>
                          {dept}
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

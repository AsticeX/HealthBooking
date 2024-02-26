import { useState, useEffect } from "react";
import NavbarComponent from "./NavbarComponent";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal, Button } from "react-bootstrap";

const VaccineComponent = () => {
  const [state, setState] = useState({
    user_id: "",
    vaccine_name_th: "",
    expire: "",
    attendance_date: "",
    hospital_name: "",
    dose_user: [],
    dose_require: "",
    hospital: "",
    priority: 0,
    flag: true,
    type: "", // Adding type field to state
  });

  const { user_id, vaccine_name_th, expire, attendance_date, hospital_name, dose_user, dose_require, hospital, priority, flag, type } = state;

  const inputValue = (name) => (event) => {
    if (name === "attendance_date") {
      setState({ ...state, attendance_date: event.target.value, dose_user: event.target.value });
    } else {
      setState({ ...state, [name]: event.target.value });
    }
  };

  const [vaccineOptions, setVaccineOptions] = useState([]);
  const [vaccineUsers, setVaccineUsers] = useState([]);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/vaccine_user/search-vaccine-user-by-priority`)
      .then((response) => {
        setVaccineUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching vaccine users:", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/vaccine`)
      .then((response) => {
        const options = response.data.map((vaccine) => ({
          name: vaccine.vaccine_name_th,
          type: vaccine.type,
        }));
        setVaccineOptions(options);
      })
      .catch((error) => {
        console.error("Error fetching vaccine options:", error);
      });
  }, []);

  const handleDropdownChange = (event) => {
    const selectedOption = vaccineOptions.find((option) => option.name === event.target.value);
    console.log("Selected vaccine:", selectedOption);
    setState({ ...state, vaccine_name_th: event.target.value, type: selectedOption.type });
  };

  const handleDelete = (id) => {
    // Display a confirmation dialog using SweetAlert2
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // If user confirms, send a DELETE request to the API to delete the user with the specified ID
        axios
          .delete(`${process.env.REACT_APP_API}/vaccine_user/${id}`)
          .then((response) => {
            console.log("User deleted successfully:", response.data);
            // Remove the deleted user from the vaccineUsers state array
            setVaccineUsers(vaccineUsers.filter((user) => user._id !== id));
            // Display a success message
            Swal.fire("Deleted!", "Your user has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting user:", error);
            // Display an error message
            Swal.fire("Error!", "Failed to delete user.", "error");
          });
      }
    });
  };

  const submitForm = (e) => {
    e.preventDefault();

    axios
      .post(`${process.env.REACT_APP_API}/vaccine_user`, {
        user_id,
        vaccine_name_th,
        expire,
        attendance_date,
        type,
        hospital_name,
        dose_user,
        dose_require,
        hospital,
        priority,
        flag,
        vaccine_name: vaccine_name_th,
      })
      .then((response) => {
        // Update the vaccineUsers state array with the newly added user
        setVaccineUsers([...vaccineUsers, response.data]);
        // Clear the form fields
        setState({
          user_id: "",
          vaccine_name_th: "",
          expire: "",
          attendance_date: "",
          hospital_name: "",
          dose_user: [],
          dose_require: "",
          hospital: "",
          priority: 0,
          flag: true,
          type: "",
        });
        // Display a success message
        Swal.fire({
          title: "Success",
          text: "บันทึกข้อมูลสำเร็จ",
          icon: "success",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Oops...",
          text: err.response.data.error,
          icon: "error",
        });
      });
  };

  const handleEdit = (user) => {
    setEditUser(user); // Set the state with the user data to populate the form in the modal
    setEditModalShow(true); // Show the edit modal
  };

  const submitEditForm = (e) => {
    e.preventDefault();

    axios
      .put(`${process.env.REACT_APP_API}/vaccine_user/${editUser._id}`, {
        user_id: editUser.user_id,
        vaccine_name_th: editUser.vaccine_name_th,
        expire: editUser.expire,
        attendance_date: editUser.attendance_date,
        type: editUser.type,
        hospital_name: editUser.hospital_name,
        dose_user: editUser.dose_user,
        dose_require: editUser.dose_require,
        hospital: editUser.hospital,
        priority: editUser.priority,
        flag: editUser.flag,
        vaccine_name: editUser.vaccine_name_th,
      })
      .then((response) => {
        // Update the vaccineUsers state array with the edited user
        setVaccineUsers(vaccineUsers.map((user) => (user._id === editUser._id ? response.data : user)));
        // Close the edit modal
        setEditModalShow(false);
        // Display a success message
        Swal.fire({
          title: "Success",
          text: "บันทึกข้อมูลสำเร็จ",
          icon: "success",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Oops...",
          text: err.response.data.error,
          icon: "error",
        });
      });
  };

  // Function to handle closing the edit modal
  const handleCloseEditModal = () => {
    setEditModalShow(false); // Close the edit modal
  };

  return (
    <div className="container p-5">
      <NavbarComponent />
      <h1>บันทึกวัคซีน</h1>
      <form onSubmit={submitForm}>
        <div className="form-group">
          <label>วัคซีน</label>
          <select className="form-control" value={vaccine_name_th} onChange={handleDropdownChange}>
            <option value="">โปรดเลือก</option>
            {vaccineOptions.map((option, index) => (
              <option key={index} value={option.name}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>วันเข้ารับการฉีดวัคซีน</label>
          <input type="date" className="form-control" value={attendance_date.split("T")[0]} onChange={inputValue("attendance_date")} />
        </div>
        <div className="form-group">
          <label>โรงพยาบาล</label>
          <textarea type="text" className="form-control" value={hospital_name} onChange={inputValue("hospital_name")}></textarea>
        </div>
        <div className="form-group">
          <label>จำนวนโดสที่ต้องฉีด</label>
          <input type="number" className="form-control" defaultValue={1} onChange={inputValue("dose_require")} />
        </div>
        <br />
        <input type="submit" value="บันทึก" className="btn btn-primary" />
      </form>{" "}
      <br />
      <h1>บันทึกวัคซีน</h1>
      <div className="table-responsive">
        {/* Table to display existing data */}
        {/* Example: */}
        <table className="table table-striped">
          {/* Table headers */}
          <thead>
            <tr>
              <th>Vaccine Name</th>
              <th>Expire</th>
              <th>Attendance Date</th>
              <th>Hospital Name</th>
              <th>Dose User</th>
              <th>Dose Require</th>
              <th>Priority</th>
              <th>Flag</th>
              <th>Type</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {/* Iterate through vaccineUsers to display each user's data */}
            {vaccineUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.vaccine_name}</td>
                <td>{new Date(user.expire).toLocaleDateString()}</td>
                <td>{new Date(user.attendance_date).toLocaleDateString()}</td>
                <td>{user.hospital_name}</td>
                <td>
                  {user.dose_user.map((doseTime, index) => (
                    <div key={index}>{new Date(doseTime).toLocaleDateString()}</div>
                  ))}
                </td>
                <td>{user.dose_require}</td>
                <td>{user.priority}</td>
                <td>{user.flag ? "True" : "False"}</td>
                <td>{user.type}</td>
                <td>
                  {/* Edit and delete buttons */}
                  <button className="btn btn-primary mr-2" onClick={() => handleEdit(user)}>
                    Edit
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Modal for editing data */}
      <Modal show={editModalShow} onHide={handleCloseEditModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Vaccine User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Conditional rendering based on editUser */}
          {editUser && (
            <form onSubmit={submitEditForm}>
              {/* Input fields for editing data */}
              <div className="form-group">
                <label>Vaccine Name</label>
                <input type="text" className="form-control" value={editUser.vaccine_name} onChange={(e) => setEditUser({ ...editUser, vaccine_name_th: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Expire</label>
                <input type="date" className="form-control" value={editUser?.expire?.split("T")[0]} onChange={(e) => setEditUser({ ...editUser, expire: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Attendance Date</label>
                <input type="date" className="form-control" value={editUser?.attendance_date?.split("T")[0]} onChange={(e) => setEditUser({ ...editUser, attendance_date: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Hospital Name</label>
                <input type="text" className="form-control" value={editUser.hospital_name} onChange={(e) => setEditUser({ ...editUser, hospital_name: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Dose User</label>
                <input type="text" className="form-control" value={editUser.dose_user} onChange={(e) => setEditUser({ ...editUser, dose_user: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Dose Require</label>
                <input type="number" className="form-control" value={editUser.dose_require} onChange={(e) => setEditUser({ ...editUser, dose_require: e.target.value })} />
              </div>
              <br />
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default VaccineComponent;

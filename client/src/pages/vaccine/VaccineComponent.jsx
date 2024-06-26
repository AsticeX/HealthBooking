import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Modal } from "react-bootstrap";
import Navbar from "../../components/navbar/Navbar";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Select from "react-select";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button } from "@mui/material";
import { Box } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const VaccineComponent = () => {
  const [state, setState] = useState({
    user_id: "",
    vaccine_name_th: "",
    number_for_next_dose: "",
    expire: "",
    hospital_name: "",
    dose_user: [],
    dose_require: 1,
    hospital: [],
    priority: 0,
    flag: true,
    type: "",
  });

  const { user } = useContext(AuthContext);
  const { vaccine_name_th, expire, dose_user, dose_require, hospital, priority, flag, type } = state;

  const inputValue = (name) => (event) => {
    if (name === "dose_user_1") {
      const newDoseUser = [...state.dose_user];
      newDoseUser[0] = event.target.value;
      setState({ ...state, dose_user: newDoseUser });
    } else if (name === "dose_user_2") {
      const newDoseUser = [...state.dose_user];
      newDoseUser[1] = event.target.value;
      setState({ ...state, dose_user: newDoseUser });
    } else if (name === "dose_user_3") {
      const newDoseUser = [...state.dose_user];
      newDoseUser[2] = event.target.value;
      setState({ ...state, dose_user: newDoseUser });
    } else if (name === "dose_require") {
      setState({ ...state, [name]: event.target.value });
    } else {
      setState({ ...state, [name]: event.target.value });
    }
  };

  const inputValue2 = (name) => (event) => {
    if (name === "hospital_user_1") {
      const newHospital = [...state.hospital];
      newHospital[0] = event.target.value;
      setState({ ...state, hospital: newHospital });
    } else if (name === "hospital_user_2") {
      const newHospital = [...state.hospital];
      newHospital[1] = event.target.value;
      setState({ ...state, hospital: newHospital });
    } else if (name === "hospital_user_3") {
      const newHospital = [...state.hospital];
      newHospital[3] = event.target.value;
      setState({ ...state, hospital: newHospital });
    } else if (name === "dose_require") {
      setState({ ...state, [name]: event.target.value });
    } else {
      setState({ ...state, [name]: event.target.value });
    }
  };

  const [vaccineOptions, setVaccineOptions] = useState([]);
  const [vaccineUsers, setVaccineUsers] = useState([]);
  const [editModalShow, setEditModalShow] = useState(false);
  const [formModalShow, setFormModalShow] = useState(false);
  const [formModalShow2, setFormModalShow2] = useState(false);
  const [formModalShow3, setFormModalShow3] = useState(false);
  const [editUser, setEditUser] = useState(null);

  useEffect(() => {
    if (user) {
      axios
        .get(`${process.env.REACT_APP_API}/vaccine_user/search-vaccine-user-by-priority?user_id=${user.username}`)
        .then((response) => {
          setVaccineUsers(response.data);
        })
        .catch((error) => {
          console.error("Error fetching vaccine users:", error);

          Swal.fire({
            title: "ผิดพลาด!",
            text: "ไม่สามารถบันทึกข้อมูลวัคซีนได้.",
            icon: "error",
          });
        });
    }
  }, [user]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/vaccine`)
      .then((response) => {
        const options = response.data.map((vaccine) => ({
          name: vaccine.vaccine_name_th,
          type: vaccine.type,
          number_for_next_dose: vaccine.number_for_next_dose,
          dose_require: vaccine.dose_require,
        }));
        setVaccineOptions(options);
      })
      .catch((error) => {
        console.error("Error fetching vaccine options:", error);
      });
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "ยืนยันการลบ?",
      text: "คุณไม่สามารถย้อนกลับการกระทำนี้ได้!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยันการลบ",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${process.env.REACT_APP_API}/vaccine_user/${id}`)
          .then((response) => {
            console.log("User deleted successfully:", response.data);

            setVaccineUsers(vaccineUsers.filter((user) => user._id !== id));

            Swal.fire("ลบเรียบร้อย", "ข้อมูลถูกลบเรียบร้อยแล้ว", "success");
          })
          .catch((error) => {
            console.error("Error deleting user:", error);

            Swal.fire("ผิดพลาด!", "ไม่สามารถลบข้อมูลได้", "error");
          });
      }
    });
  };

  const submitForm = (e) => {
    e.preventDefault();

    if (!user) {
      Swal.fire({
        title: "Error!",
        text: "User is not authenticated.",
        icon: "error",
      });
      return;
    }

    let priority = 1;
    if (expire) {
      priority = 1;
    } else {
      priority = 2;
    }

    axios
      .post(`${process.env.REACT_APP_API}/vaccine_user`, {
        email: user.email,
        user_id: user.username,
        vaccine_name_th,
        expire,
        type,
        dose_user,
        dose_require: state.dose_require,
        hospital,
        priority,
        flag,
        vaccine_name: vaccine_name_th,
      })
      .then((response) => {
        setVaccineUsers([...vaccineUsers, response.data]);

        setState({
          email: "",
          user_id: "",
          vaccine_name_th: "",
          expire: "",
          dose_user: [],
          dose_require: "",
          hospital: [],
          priority: 0,
          flag: 0,
          type: "",
        });

        handleCloseFormModal();
        handleCloseFormModal2();
        handleCloseFormModal3();
        Swal.fire({
          title: "สำเร็จ",
          text: "บันทึกข้อมูลสำเร็จ",
          icon: "success",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "ผิดพลาด",
          text: err.response.data.error,
          icon: "error",
        });
      });
  };

  const submitDose = (e) => {
    e.preventDefault();
    const administeredDoses = parseInt(document.getElementById("administeredDoses").value);

    if (administeredDoses === 1) {
      handleForm();
    } else if (administeredDoses === 2) {
      handleForm2();
    } else if (administeredDoses === 3) {
      handleForm3();
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setEditModalShow(true);
  };

  const handleForm = () => {
    setFormModalShow(true);
  };
  const handleForm2 = () => {
    setFormModalShow2(true);
  };
  const handleForm3 = () => {
    setFormModalShow3(true);
  };

  const submitEditForm = (e) => {
    e.preventDefault();

    // Check if expiration date is greater than today's date
    const today = new Date();
    const expireDate = new Date(editUser.expire);
    let priority = 1; // Default priority

    if (expireDate < today) {
      priority = 0; // Set priority to 0 if expiration date is less than today
    }

    axios
      .put(`${process.env.REACT_APP_API}/vaccine_user/${editUser._id}`, {
        user_id: editUser.user_id,
        vaccine_name_th: editUser.vaccine_name_th,
        expire: editUser.expire,
        type: editUser.type,
        hospital_name: editUser.hospital_name,
        dose_user: editUser.dose_user,
        dose_require: editUser.dose_require,
        hospital: editUser.hospital,
        priority: priority, // Update priority based on expiration date
        flag: editUser.flag,
        vaccine_name: editUser.vaccine_name_th,
      })
      .then((response) => {
        setVaccineUsers(vaccineUsers.map((user) => (user._id === editUser._id ? response.data : user)));

        setEditModalShow(false);

        Swal.fire({
          title: "สำเร็จ",
          text: "บันทึกข้อมูลสำเร็จ",
          icon: "success",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "ผิดพลาด",
          text: err.response.data.error,
          icon: "error",
        });
      });
  };

  const handleSelectChange = (selectedOption) => {
    const selectedVaccineName = selectedOption.value;
    const isVaccineAlreadySelected = vaccineUsers.some((user) => user.vaccine_name === selectedVaccineName);

    if (!isVaccineAlreadySelected) {
      console.log("Selected vaccine:", selectedOption);

      const today = new Date();

      let expirationDate = null;
      const selectedVaccine = vaccineOptions.find((option) => option.name === selectedVaccineName);
      if (selectedVaccine.number_for_next_dose !== 0) {
        expirationDate = new Date(today.getFullYear(), today.getMonth() + selectedVaccine.number_for_next_dose, today.getDate());
      }

      setState({
        ...state,
        vaccine_name_th: selectedVaccineName,
        type: selectedVaccine.type,
        number_for_next_dose: selectedVaccine.number_for_next_dose,
        expire: expirationDate ? expirationDate.toISOString().split("T")[0] : null,
        dose_require: selectedVaccine.dose_require,
      });
    } else {
      Swal.fire({
        title: "Oops...",
        text: "This vaccine has already been chosen.",
        icon: "warning",
      });
    }
  };

  const handleCloseEditModal = () => {
    setEditModalShow(false);
  };

  const handleCloseFormModal = () => {
    setFormModalShow(false);
  };
  const handleCloseFormModal2 = () => {
    setFormModalShow2(false);
  };
  const handleCloseFormModal3 = () => {
    setFormModalShow3(false);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const day = `0${d.getDate()}`.slice(-2);
    const month = `0${d.getMonth() + 1}`.slice(-2);
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleExpire = (user) => {
    let expireMessage;
    let expireHeader;
    if (user.priority === 0) {
      // Calculate how long it has been expired
      const today = new Date();
      const expireDate = new Date(user.expire);
      const differenceInDays = Math.floor((today - expireDate) / (1000 * 60 * 60 * 24));
      expireMessage = `หมดอายุมาแล้ว ${differenceInDays} วัน`;
      expireHeader = "วัคซีนหมดอายุแล้ว";
    } else if (user.priority === 1) {
      // Calculate how long until it expires
      const today = new Date();
      const expireDate = new Date(user.expire);
      const differenceInDays = Math.floor((expireDate - today) / (1000 * 60 * 60 * 24));
      expireMessage = `หมดอายุใน ${differenceInDays} วัน`;
      expireHeader = "วัคซีนยังไม่หมดอายุ";
    }

    if (user.priority === 0) {
      Swal.fire({
        title: expireHeader,
        text: expireMessage,
        icon: "warning",
      });
    } else if (user.priority === 1) {
      Swal.fire({
        title: expireHeader,
        text: expireMessage,
        icon: "info",
      });
    }
  };

  return (
    <div>
      <Box sx={{ height: "100vh", bgcolor: "#F7F7F6" }}>
        {" "}
        <div className="  p-5">
          <Navbar />
          <Box>
            <h1 className="mt-5">บันทึกวัคซีน</h1>
            <form onSubmit={submitDose}>
              <div className="form-group">
                <label>วัคซีน</label>
                <div className="form-group">
                  <Select
                    options={vaccineOptions.map((option) => ({ value: option.name, label: option.name }))}
                    value={{ value: vaccine_name_th, label: vaccine_name_th }}
                    onChange={(selectedOption) => handleSelectChange(selectedOption)}
                  />
                </div>
              </div>
              <div className="form-group">
                <label>จำนวนโดสที่ฉีดไปแล้ว</label>
                <input type="number" className="form-control" id="administeredDoses" required min="1" />
              </div>
              <div className="form-group mb-2">
                <label>จำนวนโดสที่ต้องฉีด</label>
                <input type="number" className="form-control" value={dose_require} onChange={inputValue("dose_require")} required min="1" />
              </div>
              <Button type="submit" variant="contained" sx={{ backgroundColor: "#77B255" }}>
                ต่อไป
              </Button>
              {/* <input type="submit" value="ต่อไป" className="btn btn-primary mb-2" /> */}
            </form>
          </Box>
          <br />
          <Box sx={{ height: 2, bgcolor: "#BBBBBB81" }}></Box>
          <TableContainer sx={{ mt: 8, p: 4 }}>
            <h2 style={{ alignItem: "center", display: "flex", justifyContent: "center" }}>ประวัติการฉีดวัคซีน</h2>
            <Table sx={{ minWidth: 650, mt: 4 }} aria-label="simple table">
              <TableHead sx={{ backgroundColor: "#77B255" }}>
                <TableRow>
                  <TableCell align="center">ชื่อวัคซีน</TableCell>
                  <TableCell align="center">วัน/เดือน/ปี หมดอายุ</TableCell>
                  <TableCell align="center">โรงพยาบาลที่เข้ารับการฉีดวัคซีน</TableCell>
                  <TableCell align="center">วัน/เดือน/ปี ที่ฉีดวัคซีน</TableCell>
                  <TableCell align="center">จำนวนโดสที่ต้องฉีด</TableCell>
                  <TableCell align="center">สถานะ</TableCell>
                  {/* <th>Flag</th> */}
                  <TableCell align="center">ประเภท</TableCell>
                  {/* <th>User ID</th> */}
                  <TableCell align="center">ปรับแต่ง</TableCell>
                  <TableCell align="center">ลบ</TableCell>
                </TableRow>
              </TableHead>

              <TableBody sx={{ backgroundColor: "#EEEEE6" }}>
                {vaccineUsers.map((user) => (
                  <TableRow>
                    <TableCell align="center">{user.vaccine_name}</TableCell>
                    <TableCell align="center">{user.expire ? formatDate(user.expire) : "ไม่มีวันหมดอายุ"}</TableCell>
                    <TableCell align="center">
                      {user.hospital.map((doseTime, index) => (
                        <div key={index}>{doseTime}</div>
                      ))}
                    </TableCell>
                    <TableCell align="center">
                      {user.dose_user.map((doseTime, index) => (
                        <div key={index}>{formatDate(doseTime)}</div>
                      ))}
                    </TableCell>
                    <TableCell align="center">{user.dose_require}</TableCell>
                    <TableCell align="center">
                      {user.priority === 0 ? (
                        <span className="btn btn-danger" onClick={() => handleExpire(user)}>
                          <InfoOutlinedIcon className="icon" />
                          &nbsp;หมดอายุ
                        </span>
                      ) : user.priority === 1 ? (
                        <span className="btn btn-success" onClick={() => handleExpire(user)}>
                          <CheckCircleOutlineIcon className="icon" />
                          &nbsp;ยังไม่หมดอายุ
                        </span>
                      ) : user.priority === 2 ? (
                        <span className="btn btn-secondary">
                          <CheckCircleOutlineIcon className="icon" />
                          &nbsp;ไม่มีวันหมดอายุ
                        </span>
                      ) : null}
                    </TableCell>
                    {/* <td>{user.flag ? "True" : "False"}</td> */}
                    <TableCell align="center">{user.type}</TableCell>
                    {/* <td>{user.user_id}</td> */}
                    <TableCell align="center">
                      <Button variant="outlined" color="primary" onClick={() => handleEdit(user)}>
                        แก้ไข
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button variant="outlined" color="error" onClick={() => handleDelete(user._id)}>
                        ลบ
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </Box>

      <Modal show={formModalShow} onHide={handleCloseFormModal} style={{ marginTop: "100px", zIndex: "1050" }}>
        <Modal.Header closeButton>
          <Modal.Title>บันทึกวัคซีน</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submitForm}>
            <div className="form-group">
              <label>วัคซีน</label>
              <input type="text" className="form-control" value={vaccine_name_th} readOnly />
            </div>
            <div className="form-group">
              <label>วันเข้ารับการฉีดวัคซีน</label>
              <input required type="date" max={new Date().toISOString().split("T")[0]} className="form-control" value={dose_user} onChange={inputValue("dose_user")} />
            </div>
            <div className="form-group">
              <label>โรงพยาบาลที่เข้ารับการฉีดวัคซีน</label>
              <input required type="text" className="form-control" value={hospital[0]} onChange={inputValue2("hospital_user_1")} />
            </div>

            <br />
            <input type="submit" value="บันทึก" className="btn btn-success" />
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={formModalShow2} onHide={handleCloseFormModal2} style={{ marginTop: "100px", zIndex: "1050" }}>
        <Modal.Header closeButton>
          <Modal.Title>บันทึกวัคซีน</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submitForm}>
            <div className="form-group">
              <label>วัคซีน</label>
              <input type="text" className="form-control" value={vaccine_name_th} readOnly />
            </div>
            <div className="form-group">
              <label>วันเข้ารับการฉีดวัคซีนเข็มที่ 1</label>
              <input required type="date" max={new Date().toISOString().split("T")[0]} className="form-control" value={dose_user[0]} onChange={inputValue("dose_user_1")} />
            </div>
            <div className="form-group">
              <label>วันเข้ารับการฉีดวัคซีนเข็มที่ 2</label>
              <input required type="date" max={new Date().toISOString().split("T")[0]} className="form-control" value={dose_user[1]} onChange={inputValue("dose_user_2")} />
            </div>
            {/* <div className="form-group">
                <label>โรงพยาบาล</label>
                <textarea type="text" className="form-control" value={hospital_name} onChange={inputValue("hospital_name")}></textarea>
              </div>
              <br /> */}
            <div className="form-group">
              <label>โรงพยาบาลที่เข้ารับการฉีดวัคซีนเข็มที่ 1</label>
              <input required type="text" className="form-control" value={hospital[0]} onChange={inputValue2("hospital_user_1")} />
            </div>
            <div className="form-group">
              <label>โรงพยาบาลที่เข้ารับการฉีดวัคซีนเข็มที่ 2</label>
              <input required type="text" className="form-control" value={hospital[1]} onChange={inputValue2("hospital_user_2")} />
            </div>
            <input type="submit" value="บันทึก" className="btn btn-success" />
          </form>{" "}
        </Modal.Body>
      </Modal>

      <Modal show={formModalShow3} onHide={handleCloseFormModal3} style={{ marginTop: "100px", zIndex: "1050" }}>
        <Modal.Header closeButton>
          <Modal.Title>บันทึกวัคซีน</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submitForm}>
            <div className="form-group">
              <label>วัคซีน</label>
              <input type="text" className="form-control" value={vaccine_name_th} readOnly />
            </div>
            <div className="form-group">
              <label>วันเข้ารับการฉีดวัคซีนเข็มที่ 1</label>
              <input required type="date" max={new Date().toISOString().split("T")[0]} className="form-control" value={dose_user[0]} onChange={inputValue("dose_user_1")} />
            </div>
            <div className="form-group">
              <label>วันเข้ารับการฉีดวัคซีนเข็มที่ 2</label>
              <input required type="date" max={new Date().toISOString().split("T")[0]} className="form-control" value={dose_user[1]} onChange={inputValue("dose_user_2")} />
            </div>
            <div className="form-group">
              <label>วันเข้ารับการฉีดวัคซีนเข็มที่ 3</label>
              <input required type="date" max={new Date().toISOString().split("T")[0]} className="form-control" value={dose_user[2]} onChange={inputValue("dose_user_3")} />
            </div>
            {/* <div className="form-group">
              <label>โรงพยาบาล</label>
              <textarea type="text" className="form-control" value={hospital_name} onChange={inputValue("hospital_name")}></textarea>
            </div>
            <br /> */}
            <div className="form-group">
              <label>โรงพยาบาลที่เข้ารับการฉีดวัคซีนเข็มที่ 1</label>
              <input required type="text" className="form-control" value={hospital[0]} onChange={inputValue2("hospital_user_1")} />
            </div>
            <div className="form-group">
              <label>โรงพยาบาลที่เข้ารับการฉีดวัคซีนเข็มที่ 2</label>
              <input required type="text" className="form-control" value={hospital[1]} onChange={inputValue2("hospital_user_2")} />
            </div>
            <div className="form-group">
              <label>โรงพยาบาลที่เข้ารับการฉีดวัคซีนเข็มที่ 3</label>
              <input required type="text" className="form-control" value={hospital[2]} onChange={inputValue2("hospital_user_3")} />
            </div>
            <input type="submit" value="บันทึก" className="btn btn-success" />
          </form>{" "}
        </Modal.Body>
      </Modal>

      <Modal show={editModalShow} onHide={handleCloseEditModal} style={{ marginTop: "100px", zIndex: "1050" }}>
        <Modal.Header closeButton>
          <Modal.Title>แก้ไขข้อมูลวัคซีน</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editUser && (
            <form onSubmit={submitEditForm}>
              <div className="form-group">
                <label>ชื่อวัคซีน</label>
                <input type="text" className="form-control" value={editUser.vaccine_name} readOnly />
              </div>
              <div className="form-group">
                <label>วันหมดอายุ</label>
                {editUser.expire ? (
                  <input type="date" className="form-control" value={editUser.expire?.split("T")[0]} onChange={(e) => setEditUser({ ...editUser, expire: e.target.value })} />
                ) : (
                  <input type="text" className="form-control" value="Not specified" readOnly />
                )}
              </div>

              <div className="form-group">
                {editUser &&
                  editUser.dose_user &&
                  editUser.dose_user.map((dose, index) => (
                    <div key={index} className="dose-date">
                      <label>วันเข้ารับการฉีดวัคซีนเข็มที่ {index + 1}</label>
                      <div className="input-group">
                        <input
                          type="date"
                          className="form-control"
                          value={dose}
                          {...(dose ? {} : { max: new Date().toISOString().split("T")[0] })} // Conditionally apply max attribute
                          onChange={(e) => {
                            const newDoseUser = [...editUser.dose_user];
                            newDoseUser[index] = e.target.value;
                            setEditUser({ ...editUser, dose_user: newDoseUser });
                          }}
                        />

                        <div className="input-group-append">
                          <button
                            className="btn btn-danger"
                            type="button"
                            onClick={() => {
                              const newDoseUser = [...editUser.dose_user];
                              newDoseUser.splice(index, 1); // Remove the dose date at index
                              setEditUser({ ...editUser, dose_user: newDoseUser });
                            }}
                          >
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <button
                className="btn btn-success mb-3 mt-2"
                onClick={() => {
                  const numberOfNewBoxes = 1;

                  const newEmptyBoxes = Array.from({ length: numberOfNewBoxes }, () => "");

                  const newDoseUser = [...editUser.dose_user, ...newEmptyBoxes];
                  setEditUser({ ...editUser, dose_user: newDoseUser });
                }}
                type="button"
              >
                +
              </button>
              {/* xxxxxxxxxxxxxx */}
              <div className="form-group">
                {editUser &&
                  editUser.hospital &&
                  editUser.hospital.map((dose, index) => (
                    <div key={index} className="dose-date">
                      <label>โรงพยาบาลที่เข้ารับการฉีดวัคซีนเข็มที่ {index + 1}</label>
                      <div className="input-group">
                        <input
                          type="string"
                          className="form-control"
                          value={dose}
                          onChange={(e) => {
                            const newHospital = [...editUser.hospital];
                            newHospital[index] = e.target.value;
                            setEditUser({ ...editUser, hospital: newHospital });
                          }}
                        />

                        <div className="input-group-append">
                          <button
                            className="btn btn-danger"
                            type="button"
                            onClick={() => {
                              const newHospital = [...editUser.hospital];
                              newHospital.splice(index, 1);
                              setEditUser({ ...editUser, hospital: newHospital });
                            }}
                          >
                            -
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              <button
                className="btn btn-success mb-3 mt-2"
                onClick={() => {
                  const numberOfNewBoxes = 1;

                  const newEmptyBoxes = Array.from({ length: numberOfNewBoxes }, () => "");

                  const newHospital = [...editUser.hospital, ...newEmptyBoxes];
                  setEditUser({ ...editUser, hospital: newHospital });
                }}
                type="button"
              >
                +
              </button>

              <div className="form-group">
                <label>จำนวนโดสที่ต้องฉีด</label>
                <input type="text" className="form-control" value={editUser.dose_require} readOnly />
              </div>
              <br />
              <Button variant="contained" color="success" type="submit">
                บันทึก
              </Button>
            </form>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};
export default VaccineComponent;

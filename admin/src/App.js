import Login from "./pages/login/Login";
import List from "./pages/list/List";
import New from "./pages/new/New";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { productInputs, userInputs } from "./formSource";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext";
import { AuthContext } from "./context/AuthContext";
import { hotelColumns, userColumns, queueColumns, appointmentColumns } from "./datatablesource";
import NewHotel from "./pages/newHotel/NewHotel";
import Appointment from "./pages/appointment/appointment";
import NewQueue from "./pages/newQueue/NewQueue";
import EditQueue from "./pages/editQueue/EditQueue";
import EditClinic from "./pages/editClinic/EditClinic";
import EditAppointment from "./pages/editAppointment/EditAppointment";
import { useEffect } from "react";
import axios from "axios";

// axios.defaults.withCredentials = true;

function App() {
  const { darkMode } = useContext(DarkModeContext);

  const ProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
      return <Navigate to="/login" />;
    }

    return children;
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
       
            <Route path="/" element={<Appointment />} />

            <Route
              path="/appointment/:id"
              element={
                <ProtectedRoute>
                  <EditAppointment />
                </ProtectedRoute>
              }
            />
            <Route
              path="new"
              element={
                <ProtectedRoute>
                  <New inputs={userInputs} title="Add New User" />
                </ProtectedRoute>
              }
            />
            {/* <Route path="users">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={userColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path=":userId"
                element={
                  <ProtectedRoute>
                    <Single />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New inputs={userInputs} title="Add New User" />
                  </ProtectedRoute>
                }
              />
            </Route> */}
            <Route path="/appointment">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={appointmentColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/appointment/:id"
                element={
                  <ProtectedRoute>
                    <EditAppointment />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <New inputs={userInputs} title="Add New User" />
                  </ProtectedRoute>
                }
              />
            </Route>
            <Route path="clinics">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={hotelColumns} />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/clinics/:id"
                element={
                  <ProtectedRoute>
                    <EditClinic />
                  </ProtectedRoute>
                }
              />
              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewHotel />
                  </ProtectedRoute>
                }
              />
            </Route>

            <Route path="queue">
              <Route
                index
                element={
                  <ProtectedRoute>
                    <List columns={queueColumns} />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/queue/:id"
                element={
                  <ProtectedRoute>
                    <EditQueue />
                  </ProtectedRoute>
                }
              />

              <Route
                path="new"
                element={
                  <ProtectedRoute>
                    <NewQueue />
                  </ProtectedRoute>
                }
              />
            </Route>
            {/* <Route path="queue">
                <Route
                  index
                  element={
                    <ProtectedRoute>
                      <List columns={queueColumns} />
                    </ProtectedRoute>
                  }
                /> */}
            {/* </Route> */}
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;

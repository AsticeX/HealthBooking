import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import "./datatable.scss";

const Datatable = ({ columns }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`/${path}/auth/${user.username}`);

  useEffect(() => {
    if (data) {
      setList(data);
    }
  }, [data]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList((prevList) => prevList.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error deleting appointment:", err);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.put(`${process.env.REACT_APP_API}/appointment/${id}`, { status: "Complete" });
      // Update the status of the appointment locally without refreshing
      setList((prevList) => prevList.map((item) => (item._id === id ? { ...item, status: "Complete" } : item)));
    } catch (err) {
      console.error("Error approving appointment:", err);
    }
  };

  const handleReject = async (id) => {
    try {
      await axios.put(`${process.env.REACT_APP_API}/appointment/${id}`, { status: "Cancel" });
      // Update the status of the appointment locally without refreshing
      setList((prevList) => prevList.map((item) => (item._id === id ? { ...item, status: "Cancel" } : item)));
    } catch (err) {
      console.error("Error rejecting appointment:", err);
    }
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path === "clinics" ? "สถานบริการ" : path === "queue" ? "เวลาให้บริการ" : path === "appointment" ? "การจอง" : path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(
          path === "appointment"
            ? [
                {
                  field: "action",
                  headerName: "Action",
                  width: 300,
                  renderCell: (params) => (
                    <div className="cellAction">
                      <div className="approveButton" onClick={() => handleApprove(params.row._id)}>
                        Approve
                      </div>
                      <div className="rejectButton" onClick={() => handleReject(params.row._id)}>
                        Reject
                      </div>
                      <Link to={`/${path}/${params.row._id}`} style={{ textDecoration: "none" }}>
                        <div className="editButton">Edit</div>
                      </Link>
                      <div className="deleteButton" onClick={() => handleDelete(params.row._id)}>
                        Delete
                      </div>
                    </div>
                  ),
                },
              ]
            : [
                {
                  field: "action",
                  headerName: "Action",
                  width: 200,
                  renderCell: (params) => (
                    <div className="cellAction">
                      <Link to={`/${path}/${params.row._id}`} style={{ textDecoration: "none" }}>
                        <div className="editButton">Edit</div>
                      </Link>
                      <div className="deleteButton" onClick={() => handleDelete(params.row._id)}>
                        Delete
                      </div>
                    </div>
                  ),
                },
              ]
        )}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;

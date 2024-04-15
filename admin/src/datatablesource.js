export const userColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => {
      return (
        <div className="cellWithImg">
          <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
          {params.row.username}
        </div>
      );
    },
  },
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },

  {
    field: "country",
    headerName: "Country",
    width: 100,
  },
  {
    field: "city",
    headerName: "City",
    width: 100,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 100,
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 250 },
  {
    field: "name",
    headerName: "Name",
    width: 150,
  },
  {
    field: "type",
    headerName: "Type",
    width: 100,
  },
  {
    field: "title",
    headerName: "Title",
    width: 230,
  },
  {
    field: "address",
    headerName: "Address",
    width: 100,
  },
];

export const queueColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "hospital_id",
    headerName: "Hospital ID",
    width: 150,
  },
  {
    field: "department",
    headerName: "Department",
    width: 150,
  },
  {
    field: "start_time",
    headerName: "Start Time",
    width: 150,
  },
  {
    field: "stop_time",
    headerName: "Stop Time",
    width: 150,
  },
  {
    field: "max_queue",
    headerName: "Max Queue",
    width: 120,
  },
  // {
  //   field: "count",
  //   headerName: "Count",
  //   width: 100,
  // },
  // {
  //   field: "is_active",
  //   headerName: "Active",
  //   width: 100,
  // },
];

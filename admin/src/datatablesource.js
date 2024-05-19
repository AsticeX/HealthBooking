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

export const appointmentColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "ชื่อ",
    width: 150,
  },
  {
    field: "lastname",
    headerName: "นามสกุล",
    width: 150,
  },

  {
    field: "hospitalName",
    headerName: "สถานบริการ",
    width: 200,
  },
  {
    field: "start_time",
    headerName: "เวลาเริ้ม",
    width: 100,
  },
  {
    field: "stop_time",
    headerName: "เวลาสิ้นสุด",
    width: 100,
  },
  {
    field: "department",
    headerName: "แผนก",
    width: 150,
  },
  {
    field: "status",
    headerName: "สถานะ",
    width: 120,
  },
  {
    field: "description",
    headerName: "หมายเหตุ",
    width: 200,
  },
];

export const hotelColumns = [
  { field: "_id", headerName: "ID", width: 70 },
  {
    field: "name",
    headerName: "สถานบริการ",
    width: 150,
  },
  {
    field: "type",
    headerName: "ประเภท",
    width: 100,
  },
  {
    field: "address",
    headerName: "ที่ตั้ง",
    width: 100,
  },
  {
    field: "contract",
    headerName: "เบอร์",
    width: 100,
  },
];

export const queueColumns = [
  { field: "_id", headerName: "ID", width: 70 },

  {
    field: "department",
    headerName: "ชื่อแผนก",
    width: 150,
  },
  {
    field: "start_time",
    headerName: "เวลาเริ้ม",
    width: 150,
  },
  {
    field: "stop_time",
    headerName: "เวลาสิ้นสุด",
    width: 150,
  },
  {
    field: "max_queue",
    headerName: "ผู้ใช้บริการสูงสุด",
    width: 200,
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

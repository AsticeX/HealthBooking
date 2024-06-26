import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";
import axios from "axios";

const BlogHome = () => {
  const [age, setAge] = useState(""); // Set the default value here
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [description, setDescription] = useState("");
  const [description2, setDescription2] = useState("");
  const [description3, setDescription3] = useState("");
  const [description4, setDescription4] = useState("");
  const [description5, setDescription5] = useState("");

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    const selectedOption = data.find((item) => item._id === selectedValue);
    setDescription(selectedOption ? selectedOption.description : "");
    setDescription2(selectedOption ? selectedOption.description2 : "");
    setDescription3(selectedOption ? selectedOption.description3 : "");
    setDescription4(selectedOption ? selectedOption.description4 : "");
    setDescription5(selectedOption ? selectedOption.description5 : "");
    console.log(selectedValue);
    console.log(selectedOption);
    setAge(selectedValue || "");
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API}/vaccine`)
      .then((response) => {
        const options = response.data;
        setData(options);
        setLoading(false);
        if (options.length > 0) {
          setAge(options[0]._id);
          setDescription(options[0].description);
          setDescription2(options[0].description2);
          setDescription3(options[0].description3);
          setDescription4(options[0].description4);
          setDescription5(options[0].description5);
        }
      })
      .catch((error) => {
        console.error("Error fetching vaccine options:", error);
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
      <Card sx={{ width: "100%", backgroundColor: "#EEEEE6", p: 2 }}>
        <CardContent>
          <Typography sx={{ fontSize: 20, color: "#77B255" }} color="text.secondary" gutterBottom>
            ข้อมูลวัคซีน
          </Typography>
        </CardContent>
        <Card sx={{ width: "100%", backgroundColor: "#77B255", borderRadius: 4 }}>
          <CardContent>
            <Typography sx={{ fontSize: 18, color: "#EEEEE6" }} color="text.secondary" gutterBottom>
              เลือกวัคซีน
            </Typography>
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-simple-select-label">วัคซีน</InputLabel>
              <Select labelId="demo-simple-select-label" id="demo-simple-select" value={age} label="Age" onChange={handleChange} sx={{ backgroundColor: "white" }}>
                {loading
                  ? "Loading..."
                  : data.map((vaccineItem) => (
                      <MenuItem key={vaccineItem._id} value={vaccineItem._id}>
                        {vaccineItem.vaccine_name_th}
                      </MenuItem>
                    ))}
              </Select>
            </FormControl>
            <Typography variant="body1" mt={2} sx={{ fontSize: 18, color: "#EEEEE6" }}>
              ป้องกันโรค
            </Typography>
            <Typography variant="body1" mt={2} ml={2} sx={{ fontSize: { xs: 14, sm: 16 } }}>
              {description}
            </Typography>
            <Typography variant="body1" mt={2} sx={{ fontSize: 18, color: "#EEEEE6" }}>
              ความต่อเนื่อง
            </Typography>
            <Typography variant="body1" mt={2} ml={2} sx={{ fontSize: { xs: 14, sm: 16 } }}>
              {description2}
            </Typography>
            <Typography variant="body1" mt={2} sx={{ fontSize: 18, color: "#EEEEE6" }}>
              ผลข้างเคียง
            </Typography>
            <Typography variant="body1" mt={2} ml={2} sx={{ fontSize: { xs: 14, sm: 16 } }}>
              {description3}
            </Typography>
            <Typography variant="body1" mt={2} sx={{ fontSize: 18, color: "#EEEEE6" }}>
              ช่วงอายุ
            </Typography>
            <Typography variant="body1" mt={2} ml={2} sx={{ fontSize: { xs: 14, sm: 16 } }}>
              {description4}
            </Typography>
            <Typography variant="body1" mt={2} sx={{ fontSize: 18, color: "#EEEEE6" }}>
              ผู้ที่ควรหลีกเลี่ยง
            </Typography>
            <Typography variant="body1" mt={2} ml={2} sx={{ fontSize: { xs: 14, sm: 16 } }}>
              {description5}
            </Typography>
          </CardContent>
        </Card>
      </Card>
    </Box>
  );
};

export default BlogHome;

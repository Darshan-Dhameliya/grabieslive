import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import axios from "axios";

export default function AdminHomepage() {
  const [EmpData, setEmpData] = useState([
    { totalnum: 0, title: "Total Employee" },
    { totalnum: 0, title: "Verified Employee" },
    { totalnum: 0, title: "Unverified Employee" },
  ]);

  const [UserData, setUserData] = useState([
    { totalnum: 0, title: "Total User" },
  ]);

  const [AppointData, setAppointData] = useState([
    { totalnum: 0, title: "Booked Appoiments" },
    { totalnum: 0, title: "Completed Appoiments" },
    { totalnum: 0, title: "Uncompleted Appoiments" },
  ]);

  const GetCountData = async () => {
    await axios.get("http://localhost:8000/admin/totalcount").then((res) => {
      console.log(res.data);
      const countdata = res.data;

      UserData[0].totalnum = countdata.TotalUser;
      setAppointData([...UserData]);
      AppointData[0].totalnum = countdata.ToatalAppoiment;
      AppointData[1].totalnum = countdata.ToatalCompletedAppoiment;
      AppointData[2].totalnum = countdata.ToatalUnCompletedAppoiment;
      setAppointData([...AppointData]);
      EmpData[0].totalnum = countdata.ToatalEmp;
      EmpData[1].totalnum = countdata.ToatalVerifiedEmp;
      EmpData[2].totalnum = countdata.ToatalUnVerifiedEmp;
      setEmpData([...EmpData]);
    });
  };

  useEffect(() => {
    GetCountData();
  }, []);

  return (
    <div className="container mt-3">
      <Typography
        className="text-center"
        variant="h4"
        color="text.primary"
        gutterBottom
      >
        Employee
      </Typography>

      <div className="card-wraper d-flex flex-wrap">
        {EmpData.map((item) => (
          <Card className="cardWidth m-2">
            <CardContent>
              <Typography
                variant="h4"
                className="text-center"
                color="text.primary"
                gutterBottom
              >
                {item.totalnum}
                <br />
              </Typography>

              <Typography
                variant="h6"
                className="text-center"
                color="text.primary"
                gutterBottom
              >
                {item.title}
              </Typography>
            </CardContent>
            <CardActions className="text-center w-100">
              <Button variant="contained" className="m-auto" size="small">
                View
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>

      <Typography
        className="text-center"
        variant="h4"
        color="text.primary"
        gutterBottom
      >
        Appoiments
      </Typography>

      <div className=" d-flex flex-wrap">
        {AppointData.map((item) => (
          <Card className="cardWidth m-2">
            <CardContent>
              <Typography
                variant="h4"
                className="text-center"
                color="text.primary"
                gutterBottom
              >
                {item.totalnum}
              </Typography>
              <Typography
                variant="h6"
                className="text-center"
                color="text.primary"
                gutterBottom
              >
                {item.title}
              </Typography>
            </CardContent>
            <CardActions className="text-center w-100">
              <Button variant="contained" className="m-auto" size="small">
                View
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>

      <Typography
        className="text-center"
        variant="h4"
        color="text.primary"
        gutterBottom
      >
        User
      </Typography>

      <div className=" d-flex flex-wrap">
        {UserData.map((item) => (
          <Card className="cardWidth m-2">
            <CardContent>
              <Typography
                variant="h4"
                className="text-center"
                color="text.primary"
                gutterBottom
              >
                {item.totalnum}
              </Typography>
              <Typography
                variant="h6"
                className="text-center"
                color="text.primary"
                gutterBottom
              >
                {item.title}
              </Typography>
            </CardContent>
            <CardActions className="text-center w-100">
              <Button variant="contained" className="m-auto" size="small">
                View
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </div>
  );
}

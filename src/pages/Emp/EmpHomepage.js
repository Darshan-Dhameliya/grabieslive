import React, { useState, useEffect, useContext } from "react";
import EmpHomepageList from "./EmpHomepageList";
import axios from "axios";
import { UserContext } from "../../provider/UserContext";
import { CircularProgress, Typography } from "@mui/material";

export default function EmpHomepage() {
  const [TaskList, setTaskList] = useState([]);
  const [isLoading, setisLoading] = useState(false);

  const {
    AuthState: { userData },
  } = useContext(UserContext);

  const getDataService = async () => {
    setisLoading(true);
    const id = userData._id;
    await axios
      .post("http://localhost:8000/emp/bookedAppo", { id })
      .then((res) => {
        if (res.data.status) {
          const data = res.data.data.sort(function (a, b) {
            return (
              new Date(b.date + " " + b.time) - new Date(a.date + " " + a.time)
            );
          });
          setTaskList(data);
        }
      });
    setisLoading(false);
  };

  useEffect(() => {
    getDataService();
  }, []);

  return (
    <div className="h-100 container">
      <Typography
        variant="h5"
        className="mt-3"
        color="text.primary"
        gutterBottom
      >
        Hey, {userData?.empName}
      </Typography>
      {TaskList.length === 0 || isLoading ? (
        <div className="d-flex h-75 align-items-center justify-content-center">
          <Typography gutterBottom color="primary" variant="h3" component="div">
            {isLoading ? <CircularProgress color="primary" /> : "No data Found"}
          </Typography>
        </div>
      ) : (
        <div className="d-flex flex-wrap justify-content-between">
          {TaskList.map((item, index) => (
            <EmpHomepageList key={index} itemData={item} />
          ))}
        </div>
      )}
    </div>
  );
}

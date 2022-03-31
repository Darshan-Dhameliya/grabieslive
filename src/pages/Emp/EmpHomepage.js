import React, { useState, useEffect, useContext } from "react";
import EmpHomepageList from "./EmpHomepageList";
import axios from "axios";
import { UserContext } from "../../provider/UserContext";
import { Typography } from "@mui/material";

export default function EmpHomepage() {
  const [TaskList, setTaskList] = useState([]);

  const {
    AuthState: { userData },
  } = useContext(UserContext);

  const getDataService = async () => {
    const id = userData._id;
    await axios
      .post("https://grabieslive.herokuapp.com/emp/bookedAppo", { id })
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
  };

  useEffect(() => {
    getDataService();
  }, []);

  return (
    <div>
      <Typography
        variant="h5"
        className="mt-3"
        color="text.primary"
        gutterBottom
      >
        Hey, {userData?.empName}
      </Typography>

      <div className="d-flex flex-wrap justify-content-between">
        {TaskList.map((item, index) => (
          <EmpHomepageList key={index} itemData={item} />
        ))}
      </div>
    </div>
  );
}

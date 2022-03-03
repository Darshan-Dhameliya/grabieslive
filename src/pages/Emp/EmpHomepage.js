import React, { useState } from "react";
import { Card, CardActions, CardContent, Button } from "@mui/material";
import { Box } from "@mui/system";
import EmpHomepageList from "./EmpHomepageList";
export default function EmpHomepage() {
  const [TaskList, setTaskList] = useState([1, 2, 3, 4, 5]);

  const MArkAsDone = (index) => {
    const arr = TaskList.filter((item, i) => i !== index);
    setTaskList(arr);
  };

  return (
    <div className="d-flex flex-wrap justify-content-between">
      {TaskList.map((item, index) => (
        <EmpHomepageList key={index} />
      ))}
    </div>
  );
}

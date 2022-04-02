import React, { useState, useContext, useEffect } from "react";
import { CircularProgress, Typography } from "@mui/material";
import axios from "axios";
import { UserContext } from "../../provider/UserContext";
import BookedServiceCard from "./CompletesServiceListCard";

export default function CompletedServide() {
  const [TaskList, setTaskList] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const {
    AuthState: { userData },
  } = useContext(UserContext);

  const getDataService = async () => {
    setisLoading(true);
    const id = userData._id;
    console.log(id);
    await axios
      .post("http://localhost:8000/user/completeAppo", { id })
      .then((res) => {
        if (res.data.status) {
          const data = res.data.data;
          setTaskList(data);
        }
      });
    setisLoading(false);
  };

  useEffect(() => {
    getDataService();
  }, []);

  return (
    <>
      <Typography
        gutterBottom
        color="textPrimary"
        className="mt-3 text-center"
        variant="h3"
        component="div"
      >
        Completed services
      </Typography>

      {TaskList.length === 0 || isLoading ? (
        <div className="h-75 d-flex align-items-center justify-content-center">
          <Typography gutterBottom color="primary" variant="h3" component="div">
            {isLoading ? <CircularProgress color="primary" /> : "No data Found"}
          </Typography>
        </div>
      ) : (
        <div className="d-flex flex-wrap justify-content-between container">
          {TaskList.map((item, index) => (
            <BookedServiceCard key={index} itemData={item} />
          ))}
        </div>
      )}
    </>
  );
}

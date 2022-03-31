import React, { useState, useContext, useEffect } from "react";
import { Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import { UserContext } from "../../provider/UserContext";
import BookedServiceCard from "./BookedServiceCardList";

export default function BookedService({ itemData }) {
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
      .post("https://grabieslive.herokuapp.com/user/bookedAppo", { id })
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
        Booked services
      </Typography>
      {TaskList.length === 0 && isLoading ? (
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

// const BookedServiceCard = ({ itemData }) => {
//   return (
//     <Card
//       className="p-3 mt-3"
//       sx={{
//         width: {
//           md: "49%",
//           xs: "100%",
//         },
//       }}
//     >
//       <CardContent>
//         <div>Name : {itemData.username}</div>
//         <div>address : {itemData.userAddress}</div>
//         <div>Mobile no : {itemData.userphone}</div>
//         <div>area : {itemData.area}</div>
//         <div>charge : ₹{itemData.charge}</div>
//         <div>Time : {itemData.time}</div>
//         <div>
//           Work Description :
//           {itemData?.sub_spec.map((item) => (
//             <span>{item},</span>
//           ))}
//         </div>
//       </CardContent>
//       <CardActions className="d-flex">
//         <Box sx={{ flex: "1" }} />
//         <Button
//           variant="contained"
//           color="error"
//           onClick={() => alert("cancel")}
//         >
//           Cancel
//         </Button>
//       </CardActions>
//     </Card>
//   );
// };

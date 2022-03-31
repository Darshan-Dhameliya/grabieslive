import React, { useEffect, useState, useContext } from "react";
import { Paper, Grid, TableCell, TableRow, Table } from "@mui/material";
import { UserContext } from "../../../provider/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import CustomButton from "../../../component/CustomButton";

export default function ThirdStep({ appoimentData, handleNext }) {
  const [isLoading, setisLoading] = useState(false);

  const {
    AuthState: { userData, cartData },
  } = useContext(UserContext);

  const bookAppoiment = async () => {
    setisLoading(true);
    const ApppoiMentObJ = {
      // sub_spec,
      userid: userData._id,
      username: appoimentData.Name,
      useremail: userData.email,
      userphone: appoimentData.Number,
      userAddress: appoimentData.Address,
      service: appoimentData.service,
      sub_spec: cartData.serviceName,
      area: appoimentData.landmark,
      date: appoimentData.date,
      time: appoimentData.time,
      charge: cartData.price,
      dateAndTime: appoimentData.dateAndTime,
    };

    console.log(ApppoiMentObJ);
    await axios
      .post("https://grabieslive.herokuapp.com/user/appointment", ApppoiMentObJ)
      .then((res) => {
        if (res.data.status) {
          toast.success(res.data.message);
          //   handleNext();
        } else {
          toast.error(res.data.message);
        }
      });
    setisLoading(false);
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item lg={6} sm={10} md={10}>
        <Paper className="shadow glassy-container">
          <Table className="w-100">
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>{appoimentData.Name}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Address</TableCell>
              <TableCell>{appoimentData.Address}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Area</TableCell>
              <TableCell>{appoimentData.landmark}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Service </TableCell>
              <TableCell>{cartData.jobtitle}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>work description</TableCell>
              <TableCell>{cartData.serviceName}</TableCell>
            </TableRow>

            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>{appoimentData.date}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Time</TableCell>
              <TableCell>{appoimentData.time}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Mobile No</TableCell>
              <TableCell>{appoimentData.Number}</TableCell>
            </TableRow>
            <TableRow className="border-top border-bottom">
              <TableCell>Price</TableCell>
              <TableCell align="right">₹{cartData.price}</TableCell>
            </TableRow>
            {/* <TableRow>
              <TableCell>Charge</TableCell>
              <TableCell align="right">₹40</TableCell>
            </TableRow>
            <TableRow className="border-top">
              <TableCell>Total price</TableCell>
              <TableCell align="right">
                ₹{parseInt(cartData.price) + 40}
              </TableCell>
            </TableRow> */}
          </Table>
          <div className="text-center py-3">
            <CustomButton
              isLoading={isLoading}
              label="Book Appoiment"
              onClick={() => bookAppoiment()}
            />
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}

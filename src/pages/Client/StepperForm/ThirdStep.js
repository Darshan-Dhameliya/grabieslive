import React, { useEffect, useState, useContext } from "react";
import { Paper, Grid } from "@mui/material";
import { UserContext } from "../../../provider/UserContext";
import axios from "axios";
import { toast } from "react-toastify";
import CustomButton from "../../../component/CustomButton";

export default function ThirdStep({ appoimentData, handleNext }) {
  const [isLoading, setisLoading] = useState(false);

  const {
    AuthState: { userData, cartData },
  } = useContext(UserContext);
  const [cartPrice, setcartPrice] = useState(0);

  const bookAppoiment = async () => {
    setisLoading(true);
    const ApppoiMentObJ = {
      username: appoimentData.Name,
      userphone: appoimentData.Number,
      userAddress: appoimentData.Address,
      area: appoimentData.landmark,
      date: appoimentData.date,
      time: appoimentData.time,
      service: appoimentData.service,
      userid: userData._id,
      useremail: userData.email,
      charge: cartPrice,
    };

    await axios
      .post("http://localhost:8000/user/appointment", ApppoiMentObJ)
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

  useEffect(() => {
    const cartDataLocal = JSON.parse(localStorage.getItem("cartItemData"));
    console.log(cartDataLocal);
    var totalPrice = 0;
    cartDataLocal.map((item) => {
      totalPrice += parseInt(item.price);
    });
    setcartPrice(totalPrice);
  }, [cartData]);

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item lg={6} sm={10} md={8}>
        <Paper className="shadow glassy-container" sx={{ padding: "20px" }}>
          <table className="w-100 AppointTable">
            <tr>
              <td>Name</td>
              <td>Dhameliya Darshan</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>241,samra</td>
            </tr>
            <tr>
              <td>Area</td>
              <td>Punagam</td>
            </tr>

            <tr>
              <td>work</td>
              <td>A/c reparing</td>
            </tr>

            <tr>
              <td>Time</td>
              <td>6:00</td>
            </tr>
            <tr>
              <td>Mobile No</td>
              <td>9409321445</td>
            </tr>
            <tr>
              <td colSpan={2}>
                <hr />
              </td>
            </tr>
          </table>
          <table className="w-100 pricetable">
            <tr>
              <td>Total items</td>
              <td>{cartData.length}</td>
            </tr>
            <tr>
              <td>Price</td>
              <td>₹{cartPrice}</td>
            </tr>
            <tr>
              <td>Visit Charge</td>
              <td>₹40</td>
            </tr>
            <tr>
              <td colSpan={2}>
                <hr />
              </td>
            </tr>
            <tr>
              <td>Total price</td>
              <td>₹{parseInt(cartPrice) + 40}</td>
            </tr>
          </table>
          <div className="text-center">
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

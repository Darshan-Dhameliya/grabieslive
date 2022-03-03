import React, { useContext, useEffect, useState } from "react";
import {
  Paper,
  Button,
  Card,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import { UserContext } from "../../provider/UserContext";
import CustomButton from "../../component/CustomButton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CartPage() {
  const {
    AuthState: { cartData, isLoggedIn },
    AuthDispatch,
  } = useContext(UserContext);
  let Navigate = useNavigate();

  const [cartPrice, setcartPrice] = useState(0);

  const removetemFrommCart = (index) => {
    AuthDispatch({ type: "removeItemCart", id: index });
  };

  const ChekoutVefied = () => {
    localStorage.setItem("cartItemData", JSON.stringify(cartData));
    if (isLoggedIn) {
      Navigate("/client/homepage/cart/fillform");
    } else {
      toast.warn("First You Have To login");
      Navigate("/login");
    }
  };

  useEffect(() => {
    var totalPrice = 0;
    cartData.map((item) => (totalPrice += parseInt(item.price)));
    setcartPrice(totalPrice);
  }, [cartData]);

  return (
    <div className="container">
      {cartData.length === 0 ? (
        <div className="text-center mt-3">
          <Typography variant="h3" color="textPrimary">
            No Item in your cart Please add
          </Typography>

          <CustomButton
            label="Go Back To Homepage"
            className="mt-4"
            onClick={() => Navigate("/client/homepage")}
          />
        </div>
      ) : (
        <div className="row">
          <div className="col-lg-8 col-md-12 mb-5">
            {cartData.map((row, index) => (
              <Card className="m-2 ">
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {row.jobtitle}
                  </Typography>
                  <Typography gutterBottom variant="h6" component="div">
                    {row.serviceName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {row.serviceDesc}
                  </Typography>
                </CardContent>
                <CardActions className="justify-content-between">
                  <Button
                    size="small"
                    color="error"
                    onClick={() => removetemFrommCart(index)}
                  >
                    Remove From Cart
                  </Button>
                  <Typography>₹{row.price}</Typography>
                </CardActions>
              </Card>
            ))}
          </div>
          <Paper
            className="col-lg-4 mt-2 py-4 d-lg-block d-none"
            style={{ height: 250 }}
          >
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
                <td>₹ 40</td>
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
                label="Checkout"
                className="mt-3"
                onClick={() => ChekoutVefied()}
              />
            </div>
          </Paper>
          <Button
            variant="contained"
            className="d-lg-none"
            style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
            onClick={() => ChekoutVefied()}
          >
            <table className="w-100">
              <tr>
                <td className="text-start">Total items({cartData.length})</td>
                <td className="text-end">₹{cartPrice}</td>
              </tr>
            </table>
          </Button>
        </div>
      )}
    </div>
  );
}

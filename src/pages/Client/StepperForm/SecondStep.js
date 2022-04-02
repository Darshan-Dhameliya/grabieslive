import React, { useEffect, useState, useContext } from "react";
import { Button, Paper, Grid, CircularProgress } from "@mui/material";
import moment from "moment";
import { UserContext } from "../../../provider/UserContext";
import axios from "axios";
import { toast } from "react-toastify";

export default function SecondStep({
  appoimentData,
  handleNext,
  setappoimentData,
}) {
  const {
    AuthState: { userData, cartData },
  } = useContext(UserContext);
  const [TimeProvider, setTimeProvider] = useState([]);
  const [markTimeIndex, setmarkTimeIndex] = useState();
  const [markDateIndex, setmarkDateIndex] = useState(0);
  const [dateAndTime, setdateAndTime] = useState({});
  const [DateProvider, setDateProvider] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const [DisableButton, setDisableButton] = useState(true);

  const SubmitTime = async () => {
    setisLoading(true);
    setDisableButton(true);
    // const cartData = JSON.parse(localStorage.getItem("cartItemData"));
    // console.log(cartData);
    const ApppoiMentObJ = {
      userid: userData._id,
      service: cartData.jobtitle,
      date: dateAndTime.date,
      area: appoimentData.landmark,
      time: dateAndTime.time,
    };
    await axios
      .post("http://localhost:8000/user/chekempavilability", ApppoiMentObJ)
      .then((res) => {
        if (res.data.status) {
          setappoimentData({
            ...appoimentData,
            date: dateAndTime.date,
            service: cartData.jobtitle,
            time: dateAndTime.time,
            dateAndTime: dateAndTime.dateAndTime,
          });
          handleNext();
        } else {
          toast.error(res.data.message);
        }
      });
    setDisableButton(false);
    setisLoading(false);
  };

  function roundToNearest30(date = new Date()) {
    const minutes = 30;
    const ms = 1000 * 60 * minutes;
    return new Date(Math.round(date.getTime() / ms) * ms);
  }

  const timeProvider = (date) => {
    const timearr = [];
    const TimeStart = roundToNearest30(date);

    var TimeEnd = moment(TimeStart).add(30, "m").toObject();

    while (20 > TimeEnd.hours && TimeEnd.hours > 7) {
      timearr.push(TimeEnd);
      TimeEnd = moment(TimeEnd).add(30, "m").toObject();
    }
    setmarkTimeIndex(-1);
    setTimeProvider(timearr);
  };

  useEffect(() => {
    timeProvider(new Date());
    DateProviderFun();
  }, []);

  const DateProviderFun = () => {
    const datearr = [];
    var TodayDate = moment(new Date()).toObject();
    var ThreeDayafer = moment(TodayDate).add(2, "d").toObject();
    while (moment(TodayDate) < moment(ThreeDayafer)) {
      datearr.push(moment(TodayDate));
      TodayDate = moment(TodayDate)
        .set("hour", 7)
        .set("minute", 30)
        .add(1, "d")
        .toObject();
    }
    setDateProvider(datearr);
  };

  const changeDate = (index, item) => {
    setmarkDateIndex(index);
    timeProvider(new Date(moment(item).toString()));
  };

  const changeTime = (index, item) => {
    const dateLocal = {
      date: moment(item).format("DD MMM"),
      time: moment(item).format("hh:mm"),
      dateAndTime: moment(item).toString(),
    };
    setdateAndTime(dateLocal);
    setmarkTimeIndex(index);
    setDisableButton(false);
  };

  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item lg={5} sm={10} md={6}>
        <Paper className="shadow glassy-container" sx={{ padding: "20px" }}>
          <div className="text-center">
            <div>Choose Date : </div>
            {DateProvider.map((item, index) => (
              <Button
                key={index}
                variant={markDateIndex === index ? "contained" : "outlined"}
                className="m-2"
                onClick={() => changeDate(index, item)}
              >
                {moment(item).format("DD MMM")}
              </Button>
            ))}
          </div>
          <div className="d-flex justify-content-center">
            <div className="text-center">
              <div>Choose Time : </div>
              {TimeProvider.map((item, index) => (
                <Button
                  key={index}
                  variant={markTimeIndex === index ? "contained" : "outlined"}
                  className="m-2"
                  onClick={() => changeTime(index, item)}
                >
                  {moment(item).format("hh:mm")}
                </Button>
              ))}
            </div>
          </div>
          <div className="text-center mt-3">
            <Button
              variant="outlined"
              color="primary"
              disabled={DisableButton}
              style={{ border: "2px solid" }}
              className="rounded-pill px-5"
              onClick={() => SubmitTime()}
            >
              {isLoading ? <CircularProgress size={24} /> : "Submit"}
            </Button>
          </div>
        </Paper>
      </Grid>
    </Grid>
  );
}

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
      .post(
        "https://grabieslive.herokuapp.com/user/chekempavilability",
        ApppoiMentObJ
      )
      .then((res) => {
        if (res.data.status) {
          setappoimentData({
            ...appoimentData,
            date: dateAndTime.date,
            service: cartData.jobtitle,
            time: dateAndTime.time,
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

  const timeProvider = () => {
    const timearr = [];
    const TimeStart = roundToNearest30(new Date());
    var TimeEnd = moment(TimeStart).add(30, "m").toObject();
    console.log("called");
    while (22 > TimeEnd.hours && TimeEnd.hours > 8) {
      console.log("called");
      timearr.push(moment(TimeEnd).format("hh:mm"));
      TimeEnd = moment(TimeEnd).add(30, "m").toObject();
    }

    setTimeProvider(timearr);
  };

  useEffect(() => {
    timeProvider();
    DateProviderFun();
  }, []);

  const DateProviderFun = () => {
    const datearr = [];
    console.log(TimeProvider.length);
    var TodayDate = moment(new Date()).toObject();
    var ThreeDayafer = moment(TodayDate).add(3, "d").toObject();
    while (moment(TodayDate) < moment(ThreeDayafer)) {
      datearr.push(moment(TodayDate).format("DD MMM"));
      TodayDate = moment(TodayDate).add(1, "d").toObject();
    }
    setDateProvider(datearr);

    setdateAndTime({ date: datearr[0] });
  };

  const changeDate = (index, item) => {
    setmarkDateIndex(index);
    setdateAndTime({ date: item });
    if (index) {
      setmarkTimeIndex(-1);
      updateTimeProvider();
    } else {
      setmarkTimeIndex(-1);
      timeProvider();
    }
  };

  const changeTime = (index, item) => {
    setdateAndTime({ ...dateAndTime, time: item });
    setmarkTimeIndex(index);
    setDisableButton(false);
  };

  const updateTimeProvider = () => {
    const timearr = [];
    const TimeStart = moment(roundToNearest30(new Date()))
      .set("hour", 7)
      .set("minute", 30)
      .toObject();
    var TimeEnd = moment(TimeStart).add(30, "m").toObject();
    while (20 > TimeEnd.hours) {
      timearr.push(moment(TimeEnd).format("hh:mm"));
      TimeEnd = moment(TimeEnd).add(30, "m").toObject();
    }
    setTimeProvider(timearr);
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
                {item}
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
                  {item}
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

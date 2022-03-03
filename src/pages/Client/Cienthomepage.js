import React, { useState } from "react";
import {
  Typography,
  Collapse,
  Paper,
  Grid,
  Card,
  CardHeader,
  CardActions,
  Divider,
  CardContent,
} from "@mui/material";
import logo from "../../images/icons8-electrician-64.png";
import { useTheme } from "@mui/styles";
import AppRegistrationTwoToneIcon from "@mui/icons-material/AppRegistrationTwoTone";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import TaskAltOutlinedIcon from "@mui/icons-material/TaskAltOutlined";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineContent,
  TimelineDot,
  TimelineConnector,
} from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Cienthomepage() {
  const theme = useTheme();
  const Navigate = useNavigate();
  const [faqList, setfaqList] = useState([
    {
      q: "What about the new materials or fixtures that may be needed ?",
      a: "It totally lies at the client’s discretion. You can yourself get the material according to your choice or ask the professional to procure the same. The time taken by the professional to get the material will also be included in the working hours.",
      show: true,
    },
    {
      q: "Is there any guarantee on the service provided ?",
      a: "Yes, a 30-day guarantee is provided on all plumbing services.",
      show: false,
    },
    {
      q: "What if no services are availed, how much will I be entitled to pay ?",
      a: "If in case no services were availed, you just need to pay the professional a visiting charge.",
      show: false,
    },
  ]);
  const handleExpandClick = (item) => {
    item.show = !item.show;
    setfaqList([...faqList]);
  };
  const steps = [
    {
      text: "Choose the type of service",
      icon: <AppRegistrationTwoToneIcon size={24} />,
    },
    {
      text: "Choose your time-slot",
      subtext: "We service from 9am-9pm",
      icon: <AccessTimeOutlinedIcon size={24} />,
    },
    {
      text: "Hassle-free service",
      subtext:
        "Our professional will get in touch with you one hour before the service",
      icon: <TaskAltOutlinedIcon size={24} />,
    },
  ];

  const [ServiceList] = useState([
    { name: "Plumber" },
    { name: "Electrician" },
    { name: "Ro service & repair" },
    { name: "Ac service & repair" },
    { name: "Carpenter" },
  ]);

  return (
    <>
      <Paper
        className="text-center justify-content-center align-items-center d-flex h-50"
        style={{ backgroundColor: theme.palette.primary.main, opacity: 0.7 }}
      >
        <Typography variant="h3" color="#f7f7f7" style={{ fontWeight: "900" }}>
          Grab Home Services, On Demand
        </Typography>
      </Paper>
      <div className="container">
        <Paper
          className="py-4"
          style={{
            marginTop: "-30px",
            opacity: 0.9,
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-around",
          }}
        >
          {ServiceList.map((item, index) => (
            <div
              key={index}
              className="d-flex flex-column justify-content-center align-items-center p-3 hover-shadow"
              style={{ width: "150px" }}
              onClick={() => Navigate(`/client/homepage/${item.name}/list`)}
            >
              <img
                src={logo}
                alt="something went wrong"
                className="img-fluid"
                style={{ height: "64px", width: "64px" }}
              />
              <div className="text-center m-auto">{item.name}</div>
            </div>
          ))}
        </Paper>
        <Grid container className="pb-3">
          <Grid item lg={6} md={12} className="mt-3">
            <Card>
              <CardHeader title="How It works" className="text-center" />
              <Divider />
              <CardContent>
                <Timeline position="alternate">
                  {steps.map((item, index) => (
                    <TimelineItem key={index}>
                      <TimelineSeparator>
                        <TimelineDot color="primary">{item.icon}</TimelineDot>
                        {2 > index && <TimelineConnector />}
                      </TimelineSeparator>
                      <TimelineContent>
                        <Typography variant="h6" component="span">
                          {item.text}
                        </Typography>
                        <Typography>{item.subtext}</Typography>
                      </TimelineContent>
                    </TimelineItem>
                  ))}
                </Timeline>
              </CardContent>
            </Card>
          </Grid>
          <Grid item lg={6} md={12} sx={{ pl: { lg: 2 } }} className="mt-3">
            <Card>
              <CardHeader title="FAQ" className="text-center" />
              <Divider />
              {faqList.map((item, index) => (
                <React.Fragment key={index}>
                  <CardActions>
                    {item.q}
                    <ExpandMore
                      expand={item.show}
                      onClick={() => handleExpandClick(item)}
                      aria-expanded={item.show}
                      aria-label="show more"
                    >
                      <ExpandMoreIcon />
                    </ExpandMore>
                  </CardActions>
                  <Collapse in={item.show} timeout="auto" unmountOnExit>
                    <CardContent>
                      <Typography paragraph>{item.a}</Typography>
                    </CardContent>
                  </Collapse>
                </React.Fragment>
              ))}
            </Card>
          </Grid>
        </Grid>
      </div>
    </>
  );
}

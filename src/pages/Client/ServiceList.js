import React, { useContext, useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import ServiceListData from "./ServiceList.json";
import { UserContext } from "../../provider/UserContext";
import { useParams, useNavigate } from "react-router-dom";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === "dark"
      ? "rgba(255, 255, 255, .05)"
      : "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function ServiceList() {
  const [expanded, setExpanded] = React.useState(-1);
  const { AuthDispatch } = useContext(UserContext);
  const [serviceData, setserviceData] = useState([]);
  const { servicename } = useParams();
  const Navigate = useNavigate();
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const AddItemInCart = (item) => {
    const itemWithTitle = { ...item, jobtitle: servicename };
    AuthDispatch({ type: "addItemCart", item: itemWithTitle });
  };

  useEffect(() => {
    const localServiceName = servicename.toUpperCase();
    if (ServiceListData[localServiceName]) {
      setserviceData(ServiceListData[localServiceName]);
    } else {
      Navigate("/client/homepage");
    }
  }, []);

  return (
    <div className="container my-2">
      <Typography
        gutterBottom
        color="textPrimary"
        className="text-center"
        variant="h3"
        component="div"
      >
        {servicename}
      </Typography>
      {serviceData.map((item, index) => (
        <Accordion
          key={index}
          expanded={expanded === index}
          onChange={handleChange(index)}
        >
          <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
            <Typography>{item.heading}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className="d-flex flex-wrap ">
              {item.description?.map((subitem, subindex) => (
                <Card className="m-2 cardWidth " key={subindex}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {subitem.serviceName}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      style={{ whiteSpace: "pre-line" }}
                    >
                      {subitem.serviceDesc}
                    </Typography>
                  </CardContent>
                  <CardActions className="justify-content-between">
                    <Typography>₹{subitem.price}</Typography>
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => AddItemInCart(subitem)}
                    >
                      Add To cart
                    </Button>
                  </CardActions>
                </Card>
              ))}
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
}

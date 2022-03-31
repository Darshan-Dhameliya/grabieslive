import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import PersonInfo from "./StepperForm/FirstStep";
import BillPage from "./StepperForm/SecondStep";
import ThirdStep from "./StepperForm/ThirdStep";
import { useNavigate } from "react-router-dom";

const steps = ["title 1", "title 2", "title 3"];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [appoimentData, setappoimentData] = useState({});
  const Navigate = useNavigate();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cartItemData"));
    if (cartData.length === 0) {
      Navigate("/client/homepage");
    }
  }, []);

  return (
    <div className="mt-3">
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel className="d-flex flex-column">{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {activeStep === 0 && (
        <PersonInfo
          handleNext={handleNext}
          setappoimentData={setappoimentData}
          appoimentData={appoimentData}
        />
      )}
      {activeStep === 1 && (
        <BillPage
          handleNext={handleNext}
          setappoimentData={setappoimentData}
          appoimentData={appoimentData}
        />
      )}
      {activeStep === 2 && (
        <ThirdStep handleNext={handleNext} appoimentData={appoimentData} />
      )}
      <>
        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Button
            variant="contained"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          <Box sx={{ flex: "1" }} />
          <Button
            onClick={handleNext}
            variant="contained"
            disabled={activeStep === 2}
          >
            Next
          </Button>
        </Box>
      </>
    </div>
  );
}

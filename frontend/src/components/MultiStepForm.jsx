import { useState } from "react";
import Step1Name from "./formSteps/Step1Name";
import Step2Wheels from "./formSteps/Step2Wheels";
import Step3VehicleType from "./formSteps/Step3VehicleType";
import Step4Model from "./formSteps/Step4Model";
import Step5Dates from "./formSteps/Step5Dates";
import { Box, Button, Typography } from "@mui/material";

const MultiStepForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    wheels: "",
    vehicleType: "",
    vehicleModel: "",
    dateRange: [null, null],
  });

  const steps = [
    <Step1Name data={formData} setData={setFormData} />,
    <Step2Wheels data={formData} setData={setFormData} />,
    <Step3VehicleType data={formData} setData={setFormData} />,
    <Step4Model data={formData} setData={setFormData} />,
    <Step5Dates data={formData} setData={setFormData} />,
  ];

  const validateCurrentStep = () => {
    switch (step) {
      case 0:
        return formData.firstName && formData.lastName;
      case 1:
        return formData.wheels;
      case 2:
        return formData.vehicleType;
      case 3:
        return formData.vehicleModel;
      case 4:
        return formData.dateRange[0] && formData.dateRange[1];
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateCurrentStep()) {
      if (step < steps.length - 1) {
        setStep(step + 1);
      } else {
        console.log("Submit data to backend", formData);
        // Call submit API here later
      }
    } else {
      alert("Please fill required field(s).");
    }
  };

  return (
    <Box className="p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto">
      {steps[step]}
      <Box mt={4} textAlign="right">
        <Button variant="contained" onClick={handleNext}>
          {step === steps.length - 1 ? "Submit" : "Next"}
        </Button>
      </Box>
    </Box>
  );
};

export default MultiStepForm;

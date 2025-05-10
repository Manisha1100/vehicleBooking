import { useState } from "react";
import Step1Name from "./formSteps/Step1Name";
import Step2Wheels from "./formSteps/Step2Wheels";
import Step3VehicleType from "./formSteps/Step3VehicleType";
import Step4Model from "./formSteps/Step4Model";
import Step5Dates from "./formSteps/Step5Dates";
import { Box, Button, Typography } from "@mui/material";
import axios from "axios";

const MultiStepForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    wheels: "",
    vehicleTypeId: "", 
    vehicleModel: "",
    startDate: null,
    endDate: null
  });
  
  const steps = [
    <Step1Name data={formData} setData={setFormData} />,
    <Step2Wheels data={formData} setData={setFormData} />,
    <Step3VehicleType data={formData} setData={setFormData} />,
    <Step4Model data={formData} setData={setFormData} />,
    <Step5Dates formData={formData} setFormData={setFormData} />,
  ];

  const validateCurrentStep = () => {
    switch (step) {
      case 0:
        return formData.firstName && formData.lastName;
      case 1:
        return formData.wheels;
      case 2:
        return formData.vehicleTypeId; // This must be filled out
      case 3:
        return formData.vehicleId;
      case 4:
        return formData.startDate && formData.endDate;
      default:
        return false;
    }
  };
  

  const handleNext = async () => {
    if (validateCurrentStep()) {
      if (step < steps.length - 1) {
        setStep(step + 1);
      } else {
        try {
          const response = await axios.post("http://localhost:5000/api/book", {
            firstName: formData.firstName,
            lastName: formData.lastName,
            vehicleId: formData.vehicleId,
            startDate: formData.startDate,
            endDate: formData.endDate,
          });
  
          alert("Booking successful!");
          console.log("Booking response:", response.data);
        } catch (error) {
          if (error.response && error.response.data?.error) {
            alert(`Booking failed: ${error.response.data.error}`);
          } else {
            alert("Something went wrong while booking.");
          }
          console.error("Booking error:", error);
        }
      }
    } else {
      alert("Please fill required field(s).");
    }
  };
  
  

  const handlePrevious = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  return (
    <Box className="p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto">
      {steps[step]}
      <Box mt={4} textAlign="right">
        {step > 0 && (
          <Button variant="outlined" onClick={handlePrevious} style={{ marginRight: "10px" }}>
            Previous
          </Button>
        )}
        <Button variant="contained" onClick={handleNext}>
          {step === steps.length - 1 ? "Submit" : "Next"}
        </Button>
      </Box>
    </Box>
  );
};

export default MultiStepForm;

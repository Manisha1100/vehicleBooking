import { useState, useRef } from "react";
import Step1Name from "./formSteps/Step1Name";
import Step2Wheels from "./formSteps/Step2Wheels";
import Step3VehicleType from "./formSteps/Step3VehicleType";
import Step4Model from "./formSteps/Step4Model";
import Step5Dates from "./formSteps/Step5Dates";
import { Box, Button } from "@mui/material";
import axios from "axios";

const MultiStepForm = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    wheels: "",
    vehicleTypeId: "",
    vehicleModel: "",
    vehicleId: "",
    startDate: null,
    endDate: null,
  });

  const formikRef = useRef();

  const steps = [
    {
      component: Step1Name,
      key: "step1",
    },
    {
      component: Step2Wheels,
      key: "step2",
    },
    {
      component: Step3VehicleType,
      key: "step3",
    },
    {
      component: Step4Model,
      key: "step4",
    },
    {
      component: Step5Dates,
      key: "step5",
    },
  ];

  const handleNext = async () => {
    if (formikRef.current) {
      await formikRef.current.submitForm();
      
      const errors = formikRef.current.errors;
      if (Object.keys(errors).length > 0) return;
    }

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
        const errMsg = error.response?.data?.error || "Something went wrong";
        alert(`Booking failed: ${errMsg}`);
      }
    }
  };

  const handlePrevious = () => {
    if (step > 0) setStep(step - 1);
  };

  const StepComponent = steps[step].component;

  return (
    <Box className="p-6 bg-white rounded-lg shadow-md max-w-xl mx-auto">
      <StepComponent data={formData} setData={setFormData} formikRef={formikRef} />

      <Box mt={4} textAlign="right">
        {step > 0 && (
          <Button
            variant="outlined"
            onClick={handlePrevious}
            style={{ marginRight: "10px" }}
          >
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

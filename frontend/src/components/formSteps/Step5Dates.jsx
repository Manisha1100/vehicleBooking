import { useState, useEffect } from "react";
import { DatePicker } from "@mui/x-date-pickers";
import { TextField, Box, Typography } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import dayjs from "dayjs";  

const Step5Dates = ({ formData = {}, formikRef }) => {
  const [minDate, setMinDate] = useState(null);

  useEffect(() => {
    setMinDate(dayjs()); 
  }, []);

  const validationSchema = Yup.object({
    startDate: Yup.date()
      .nullable()
      .required("Start date is required")
      .typeError("Invalid start date"),
    endDate: Yup.date()
      .nullable()
      .required("End date is required")
      .min(Yup.ref("startDate"), "End date cannot be before start date")
      .typeError("Invalid end date"),
  });

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        startDate: formData.startDate ? dayjs(formData.startDate) : null, 
        endDate: formData.endDate ? dayjs(formData.endDate) : null, 
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log("Submitted values", values);
      }}
      enableReinitialize
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form>
          <Box display="flex" flexDirection="column" gap={2}>
            <DatePicker
              label="Start Date"
              value={values.startDate}  
              onChange={(newValue) => setFieldValue("startDate", newValue)}
              minDate={minDate} 
              renderInput={(params) => <TextField {...params} />}
            />
            {errors.startDate && touched.startDate && (
              <Typography color="error" variant="body2">
                {errors.startDate}
              </Typography>
            )}

            <DatePicker
              label="End Date"
              value={values.endDate}
              onChange={(newValue) => setFieldValue("endDate", newValue)}
              minDate={minDate} 
              renderInput={(params) => <TextField {...params} />}
            />
            {errors.endDate && touched.endDate && (
              <Typography color="error" variant="body2">
                {errors.endDate}
              </Typography>
            )}
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default Step5Dates;

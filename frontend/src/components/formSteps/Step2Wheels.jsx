import { Typography, RadioGroup, FormControlLabel, Radio, Box } from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const Step2Wheels = ({ data, setData, formikRef }) => {
  const validationSchema = Yup.object({
    wheels: Yup.string().required("Please select number of wheels"),
  });

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{ wheels: data.wheels }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setData((prev) => ({ ...prev, wheels: values.wheels }));
      }}
      enableReinitialize
    >
      {({ values, handleChange, errors, touched }) => (
        <Form>
          <Box>
            <Typography variant="h6" gutterBottom>
              Number of wheels?
            </Typography>

            <RadioGroup
              name="wheels"
              value={values.wheels}
              onChange={handleChange}
              row
            >
              <FormControlLabel value="2" control={<Radio />} label="2 Wheeler" />
              <FormControlLabel value="4" control={<Radio />} label="4 Wheeler" />
            </RadioGroup>

            {errors.wheels && touched.wheels && (
              <Typography color="error" variant="body2">
                {errors.wheels}
              </Typography>
            )}
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default Step2Wheels;

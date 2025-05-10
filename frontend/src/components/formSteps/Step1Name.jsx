import { TextField, Typography, Box } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const nameSchema = Yup.object().shape({
  firstName: Yup.string().required("First name is required"),
  lastName: Yup.string().required("Last name is required"),
});

const Step1Name = ({ data, setData, formikRef }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        What is your name?
      </Typography>

      <Formik
        innerRef={formikRef}
        initialValues={{
          firstName: data.firstName || "",
          lastName: data.lastName || "",
        }}
        validationSchema={nameSchema}
        onSubmit={(values) => {
          setData((prev) => ({ ...prev, ...values }));
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <Box display="flex" gap={2} mt={2}>
              <Field
                as={TextField}
                name="firstName"
                label="First Name"
                variant="outlined"
                fullWidth
                error={touched.firstName && Boolean(errors.firstName)}
                helperText={<ErrorMessage name="firstName" />}
              />

              <Field
                as={TextField}
                name="lastName"
                label="Last Name"
                variant="outlined"
                fullWidth
                error={touched.lastName && Boolean(errors.lastName)}
                helperText={<ErrorMessage name="lastName" />}
              />
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default Step1Name;

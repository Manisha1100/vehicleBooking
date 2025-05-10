import { useEffect, useState } from "react";
import {
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  Box,
} from "@mui/material";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Step3VehicleType = ({ data, setData, formikRef }) => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const wheels = data.wheels;

  useEffect(() => {
    const fetchTypes = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/vehicle-types?wheels=${wheels}`
        );
        setTypes(res.data);
      } catch (err) {
        console.error("Error fetching vehicle types:", err);
      } finally {
        setLoading(false);
      }
    };

    if (wheels) {
      fetchTypes();
    }
  }, [wheels]);

  if (loading) return <CircularProgress />;

  const validationSchema = Yup.object({
    vehicleTypeId: Yup.string().required("Please select a vehicle type"),
  });

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{ vehicleTypeId: data.vehicleTypeId || "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setData((prev) => ({ ...prev, vehicleTypeId: values.vehicleTypeId }));
      }}
      enableReinitialize
    >
      {({ values, handleChange, errors, touched }) => (
        <Form>
          <Box>
            <Typography variant="h6" gutterBottom>
              Type of vehicle?
            </Typography>

            <RadioGroup
              name="vehicleTypeId"
              value={values.vehicleTypeId}
              onChange={handleChange}
            >
              {types.map((type) => (
                <FormControlLabel
                  key={type.id}
                  value={String(type.id)}
                  control={<Radio />}
                  label={type.name}
                />
              ))}
            </RadioGroup>

            {errors.vehicleTypeId && touched.vehicleTypeId && (
              <Typography color="error" variant="body2">
                {errors.vehicleTypeId}
              </Typography>
            )}
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default Step3VehicleType;

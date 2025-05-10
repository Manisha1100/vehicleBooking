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

const Step4Model = ({ data, setData, formikRef }) => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchModels = async () => {
      setLoading(true);
      try {
        console.log("Fetching models with typeId:", data.vehicleTypeId);
        const res = await axios.get(
          `http://localhost:5000/api/vehicles?typeId=${data.vehicleTypeId}`
        );
        console.log("Response data:", res.data);
        setModels(res.data);
      } catch (err) {
        console.error("Error fetching vehicle models:", err);
      } finally {
        setLoading(false);
      }
    };

    if (data.vehicleTypeId) {
      fetchModels();
    }
  }, [data.vehicleTypeId]);

  if (loading) return <CircularProgress />;

  const validationSchema = Yup.object({
    vehicleId: Yup.string().required("Please select a vehicle model"),
  });

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{ vehicleId: data.vehicleId || "" }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        setData((prev) => ({ ...prev, vehicleId: values.vehicleId }));
      }}
      enableReinitialize
    >
      {({ values, handleChange, errors, touched }) => (
        <Form>
          <Box>
            <Typography variant="h6" gutterBottom>
              Choose specific model
            </Typography>

            <RadioGroup
              name="vehicleId"
              value={values.vehicleId}
              onChange={handleChange}
            >
              {models.map((model) => (
                <FormControlLabel
                  key={model.id}
                  value={String(model.id)}
                  control={<Radio />}
                  label={model.name}
                />
              ))}
            </RadioGroup>

            {errors.vehicleId && touched.vehicleId && (
              <Typography color="error" variant="body2">
                {errors.vehicleId}
              </Typography>
            )}
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default Step4Model;

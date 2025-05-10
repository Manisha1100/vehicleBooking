import { useEffect, useState } from "react";
import {
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  CircularProgress,
  Box,
} from "@mui/material";
import axios from "axios";

const Step4Model = ({ data, setData }) => {
  const [models, setModels] = useState([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const fetchModels = async () => {
      setLoading(true);
      try {
        console.log('Fetching models with typeId:', data.vehicleTypeId);  // Log typeId before making request
        const res = await axios.get(`http://localhost:5000/api/vehicles?typeId=${data.vehicleTypeId}`);
        console.log('Response data:', res.data);  
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

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Choose specific model
      </Typography>

      <RadioGroup
        value={data.vehicleId}
        onChange={(e) =>
          setData((prev) => ({ ...prev, vehicleId: e.target.value }))
        }
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
    </Box>
  );
};

export default Step4Model;

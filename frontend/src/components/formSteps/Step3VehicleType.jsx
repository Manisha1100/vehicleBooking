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

const Step3VehicleType = ({ data, setData }) => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);

  const wheels = data.wheels;

  useEffect(() => {
    const fetchTypes = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/vehicle-types?wheels=${wheels}`
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

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Type of vehicle?
      </Typography>

      <RadioGroup
        value={data.vehicleTypeId}
        onChange={(e) =>
          setData((prev) => ({ ...prev, vehicleTypeId: e.target.value }))
        }
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
    </Box>
  );
};

export default Step3VehicleType;

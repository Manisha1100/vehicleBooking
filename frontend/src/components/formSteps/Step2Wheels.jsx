import { Typography, RadioGroup, FormControlLabel, Radio, Box } from "@mui/material";

const Step2Wheels = ({ data, setData }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Number of wheels?
      </Typography>

      <RadioGroup
        value={data.wheels}
        onChange={(e) =>
          setData((prev) => ({ ...prev, wheels: e.target.value }))
        }
        row
      >
        <FormControlLabel value="2" control={<Radio />} label="2 Wheeler" />
        <FormControlLabel value="4" control={<Radio />} label="4 Wheeler" />
      </RadioGroup>
    </Box>
  );
};

export default Step2Wheels;

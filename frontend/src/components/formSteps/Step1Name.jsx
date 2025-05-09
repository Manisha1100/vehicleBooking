import { TextField, Typography, Box } from "@mui/material";

const Step1Name = ({ data, setData }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        What is your name?
      </Typography>

      <Box display="flex" gap={2} mt={2}>
        <TextField
          label="First Name"
          variant="outlined"
          fullWidth
          value={data.firstName}
          onChange={(e) =>
            setData((prev) => ({ ...prev, firstName: e.target.value }))
          }
        />
        <TextField
          label="Last Name"
          variant="outlined"
          fullWidth
          value={data.lastName}
          onChange={(e) =>
            setData((prev) => ({ ...prev, lastName: e.target.value }))
          }
        />
      </Box>
    </Box>
  );
};

export default Step1Name;

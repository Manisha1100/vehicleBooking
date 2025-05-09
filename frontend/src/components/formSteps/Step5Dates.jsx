import { DatePicker } from "@mui/x-date-pickers";
import { TextField, Box } from "@mui/material";
import dayjs from "dayjs";

const Step5Dates = ({ formData, setFormData }) => {
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      <DatePicker
        label="Start Date"
        value={formData.startDate || null}
        onChange={(newValue) =>
          setFormData({ ...formData, startDate: newValue })
        }
        renderInput={(params) => <TextField {...params} />}
      />

      <DatePicker
        label="End Date"
        value={formData.endDate || null}
        onChange={(newValue) =>
          setFormData({ ...formData, endDate: newValue })
        }
        renderInput={(params) => <TextField {...params} />}
      />
    </Box>
  );
};

export default Step5Dates;

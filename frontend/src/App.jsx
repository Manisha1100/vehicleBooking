import './App.css';
import MultiStepForm from './components/MultiStepForm';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MultiStepForm />
      </LocalizationProvider>
    </div>
  );
}

export default App;

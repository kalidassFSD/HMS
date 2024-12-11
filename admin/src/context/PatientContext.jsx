import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const PatientContext = createContext();

const PatientContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [patients, setPatients] = useState([]); // Store patients data
  const [loading, setLoading] = useState(true); // Track loading state

  // Fetching patient details from the database
  const getPatients = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/in-patient`);
      console.log("API Response:", data); // Log the response to confirm its structure

      // Check if the response is an array
      if (Array.isArray(data) && data.length > 0) {
        setPatients(data); // Set patients if the data is an array and not empty
        console.log("Patients Data:", data); // Log the patients
      } else {
        console.log("No patients found or invalid response format");
        toast.error("No patients found or invalid response format");
      }
    } catch (error) {
      console.error("Error fetching patient data:", error); // Log the error
      toast.error("Failed to fetch patient details.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const value = {
    patients,
    getPatients,
    loading, // Provide the loading state
  };

  return (
    <PatientContext.Provider value={value}>
      {props.children}
    </PatientContext.Provider>
  );
};

export default PatientContextProvider;

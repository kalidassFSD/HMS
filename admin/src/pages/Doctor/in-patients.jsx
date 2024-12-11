import React, { useState, useEffect, useContext } from 'react';
import { PatientContext } from '../../context/PatientContext';
import { AppContext } from '../../context/AppContext';

const PatientDetails = () => {
  const { getPatients, patients, loading } = useContext(PatientContext);
  const { calculateAge, slotDateFormat } = useContext(AppContext);
 
  const [admissionType, setAdmissionType] = useState('all');
  
  useEffect(() => {
    getPatients(); // Fetch patients on component mount
  }, [getPatients]);

  // Filter patients by admission type
  const filteredPatients =
    admissionType === 'all'
      ? patients
      : patients.filter(
          (patient) =>
            patient.admissionType &&
            patient.admissionType.toLowerCase() === admissionType.toLowerCase()
        );
       


  const now = new Date().toLocaleDateString();

    



  // Check if loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // Check if no patients are available
  if (!patients || patients.length === 0) {
    return <div>No patients found.</div>;
  }

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">Patient Details</p>

      <div className="flex gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded ${
            admissionType === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setAdmissionType('all')}
        >
          All
        </button>
        <button
          className={`px-4 py-2 rounded ${
            admissionType === 'general' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setAdmissionType('outpatient')}
        >
          Outpatient
        </button>
        <button
          className={`px-4 py-2 rounded ${
            admissionType === 'emergency' ? 'bg-blue-500 text-white' : 'bg-gray-200'
          }`}
          onClick={() => setAdmissionType('emergency')}
        >
          Emergency
        </button>
      </div>

      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll">
        <div className="grid grid-cols-[0.5fr_2fr_1fr_2fr_1fr] gap-1 py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Admission Type</p>
          <p>Admitted On</p>
        </div>
        {filteredPatients.length > 0 ? (
          filteredPatients.map((patient, index) => (
            <div
              key={index}
              className="grid grid-cols-[0.5fr_2fr_1fr_2fr_1fr] gap-1 items-center py-3 px-6 border-b hover:bg-gray-50"
            >
              <p>{index + 1}</p>
              <p>{patient.name || 'N/A'}</p>
              <p>{patient.dob ? calculateAge(patient.age) : patient.age}</p>
              <p>{patient.admissionType || 'N/A'}</p>
              <p>{patient.admissionDate ? slotDateFormat(patient.admissionDate) : now}</p>

            </div>
          ))  
        ) : (
          <div className="p-4 text-center">No patients found for this filter.</div>
        )}
      </div>
    </div>
  );
};

export default PatientDetails;

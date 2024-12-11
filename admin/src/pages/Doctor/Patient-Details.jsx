import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const PatientUpdate = () => {
  const navigate = useNavigate();

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bp: '',
    temperature: '',
    height: '',
    weight: '',
    smoke: '',
    alcoholic: '',
    predictedDisease: '',
    patientIssue: '',
    admissionType: '', // Added admissionType
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(`Changed: ${name} ${value}`);
  };

  const validateForm = () => {
    const newErrors = {};
    console.log('Validating formData:', formData);
    
    // Validation for each field
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.age) newErrors.age = 'Age is required';
    if (!formData.bp) newErrors.bp = 'Blood Pressure (BP) is required';
    if (!formData.temperature) newErrors.temperature = 'Temperature (degree) is required';
    if (!formData.height) newErrors.height = 'Height is required';
    if (!formData.weight) newErrors.weight = 'Weight is required';
    if (formData.smoke === '') newErrors.smoke = 'Please specify smoking habit';
    if (formData.alcoholic === '') newErrors.alcoholic = 'Please specify alcohol consumption habit';
    if (!formData.predictedDisease) newErrors.predictedDisease = 'Predicted Disease is required';
    if (!formData.patientIssue) newErrors.patientIssue = 'Patient Issue is required';
    if (!formData.admissionType) newErrors.admissionType = 'Admission type is required'; // Validate admissionType

    // Log the errors to debug
    console.log('Generated Errors:', newErrors);
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    setErrors(newErrors);

    console.log('Form Data:', formData);
    console.log('Validation Errors:', newErrors);

    if (Object.keys(newErrors).length > 0) {
      toast.error("Please fix the errors before submitting.");
      return; // Don't submit if there are errors
    }

    console.log(`${backendUrl}/api/add-patient`);
    try {
      const { data } = await axios.post(`${backendUrl}/api/add-patient`, formData, {
        headers: { 'Content-Type': 'application/json' },
      });

      console.log('Response from backend:', data);
      
      if (data.success) {
        toast.success(data.message || "Patient updated successfully!");
      } else {
        toast.error(data.message || "Failed to update patient.");
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      if (error.response) {
        console.log("Error response data:", error.response.data);
        toast.error(error.response?.data?.message || "Something went wrong!");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    console.log('Admit in General button clicked');

    const newErrors = validateForm();
    setErrors(newErrors);

    console.log('Form Data:', formData);
    console.log('Validation Errors:', newErrors);

    if (Object.keys(newErrors).length === 0) {
      navigate('/in-patient', { state: { formData } });
    } else {
      console.log('Form is invalid, not navigating.');
    }
  };

  return (
    <div className="w-[100%] mx-auto p-6 bg-white shadow-lg rounded-lg text-m">
      <h2 className="text-2xl font-semibold text-center mb-6">Patient Information Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-row w-[100%]">
          {/* Name Field */}
          <div className="mb-4 w-[60%]">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          {/* Age Field */}
          <div className="mb-4 mx-5 w-[40%]">
            <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            />
            {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
          </div>
        </div>

        <div className="flex flex-row w-[100%]">
          {/* Blood Pressure (BP) Field */}
          <div className="mb-4 w-[50%]">
            <label htmlFor="bp" className="block text-sm font-medium text-gray-700">Blood Pressure (BP)</label>
            <input
              type="text"
              id="bp"
              name="bp"
              value={formData.bp}
              onChange={handleChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            />
            {errors.bp && <p className="text-red-500 text-xs mt-1">{errors.bp}</p>}
          </div>

          {/* Temperature Field */}
          <div className="mb-4 mx-5 w-[50%]">
            <label htmlFor="temperature" className="block text-sm font-medium text-gray-700">Temperature (Degree)</label>
            <input
              type="text"
              id="temperature"
              name="temperature"
              value={formData.temperature}
              onChange={handleChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            />
            {errors.temperature && <p className="text-red-500 text-xs mt-1">{errors.temperature}</p>}
          </div>
        </div>

        <div className="flex flex-row w-[100%]">
          {/* Height Field */}
          <div className="mb-4 w-[50%]">
            <label htmlFor="height" className="block text-sm font-medium text-gray-700">Height</label>
            <input
              type="text"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            />
            {errors.height && <p className="text-red-500 text-xs mt-1">{errors.height}</p>}
          </div>

          {/* Weight Field */}
          <div className="mb-4 w-[50%] mx-5">
            <label htmlFor="weight" className="block text-sm font-medium text-gray-700">Weight</label>
            <input
              type="text"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="mt-2 p-2 w-full border border-gray-300 rounded-md"
            />
            {errors.weight && <p className="text-red-500 text-xs mt-1">{errors.weight}</p>}
          </div>
        </div>

        <div className="flex flex-row w-[100%]">
          {/* Smoke Field */}
          <div className="mb-4 flex flex-row w-[50%]">
            <label className="block text-sm font-medium text-gray-700">Do you smoke?</label>
            <div className="flex space-x-4 mx-5">
              <label>
                <input
                  type="radio"
                  name="smoke"
                  value="Yes"
                  checked={formData.smoke === 'Yes'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="smoke"
                  value="No"
                  checked={formData.smoke === 'No'}
                  onChange={handleChange}
                  className="mr-2"
                />
                No
              </label>
            </div>
            {errors.smoke && <p className="text-red-500 text-xs mt-1">{errors.smoke}</p>}
          </div>

          {/* Alcoholic Field */}
          <div className="mb-4 flex flex-row w-[50%]">
            <label className="block text-sm font-medium text-gray-700">Do you consume alcohol?</label>
            <div className="flex space-x-4 mx-5">
              <label>
                <input
                  type="radio"
                  name="alcoholic"
                  value="Yes"
                  checked={formData.alcoholic === 'Yes'}
                  onChange={handleChange}
                  className="mr-2"
                />
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="alcoholic"
                  value="No"
                  checked={formData.alcoholic === 'No'}
                  onChange={handleChange}
                  className="mr-2"
                />
                No
              </label>
            </div>
            {errors.alcoholic && <p className="text-red-500 text-xs mt-1">{errors.alcoholic}</p>}
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="predictedDisease" className="block text-sm font-medium text-gray-700">Predicted Disease</label>
          <input
            type="text"
            id="predictedDisease"
            name="predictedDisease"
            value={formData.predictedDisease}
            onChange={handleChange}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
          />
          {errors.predictedDisease && <p className="text-red-500 text-xs mt-1">{errors.predictedDisease}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="patientIssue" className="block text-sm font-medium text-gray-700">Patient Issue</label>
          <input
            type="text"
            id="patientIssue"
            name="patientIssue"
            value={formData.patientIssue}
            onChange={handleChange}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
          />
          {errors.patientIssue && <p className="text-red-500 text-xs mt-1">{errors.patientIssue}</p>}
        </div>

        <div className="mb-4">
          <label htmlFor="admissionType" className="block text-sm font-medium text-gray-700">Admission Type</label>
          <input
            type="text"
            id="admissionType"
            name="admissionType"
            value={formData.admissionType}
            onChange={handleChange}
            className="mt-2 p-2 w-full border border-gray-300 rounded-md"
          />
          {errors.admissionType && <p className="text-red-500 text-xs mt-1">{errors.admissionType}</p>}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
        >
          Update Patient
        </button>
      </form>

      <button
        onClick={handleClick}
        className="mt-4 w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-700"
      >
        Admit in General
      </button>
    </div>
  );
};

export default PatientUpdate;

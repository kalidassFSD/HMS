import React, { useState, useEffect } from "react";
import axios from "axios";

const PrescriptionForm = ({ id }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [rows, setRows] = useState([
    { sNo: 1, medicineName: "", dosage: "", timing: [] },
  ]);
  const [doctorId, setDoctorId] = useState('6753e915a20b4b38d5980b27');
  const [patientId, setPatientId] = useState('6753e915a20b4b38d5980b27');
  const [query, setQuery] = useState("");
  const [filteredMedicines, setFilteredMedicines] = useState([]);
  const [activeRow, setActiveRow] = useState(null); // Track active row for medicine field

  const predefinedMedicines = [
    "Paracetamol",
    "Amoxicillin",
    "Ibuprofen",
    "Ciprofloxacin",
    "Aspirin",
    "Metformin",
    "Prednisone",
    "Cetirizine",
    "Ibuprofen",
    "Lorazepam",
    "Paracetamol",
    "Aspirin",
    "Naproxen",
    "Paradaz-IV",
    "Phenylephrine",
    "Cetirizine",
    "dolo650",
    "p250",
    "citriz",
    "endolopar",
    "cipmox",
    "glycomet",
    "Aten AM",
    "Aten 25",
    "Atarax",
    // Add more medicines here as needed
  ];

  // Filter medicines based on query
  useEffect(() => {
    if (query) {
      const filtered = predefinedMedicines.filter((medicine) =>
        medicine.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredMedicines(filtered);
    } else {
      setFilteredMedicines([]);
    }
  }, [query]);

  // Add a new row
  const handleAddRow = () => {
    setRows([
      ...rows,
      { sNo: rows.length + 1, medicineName: "", dosage: "", timing: [] },
    ]);
  };

  // Remove a specific row
  const handleRemoveRow = (index) => {
    setRows(rows.filter((_, rowIndex) => rowIndex !== index));
  };

  // Handle input change for medicine, dosage, and timing
  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  // Handle timing checkbox change
  const handleTimingChange = (index, timing) => {
    const newRows = [...rows];
    if (newRows[index].timing.includes(timing)) {
      newRows[index].timing = newRows[index].timing.filter((t) => t !== timing);
    } else {
      newRows[index].timing.push(timing);
    }
    setRows(newRows);
  };

  // Submit the form
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!patientId) {
      alert("Doctor ID or Patient ID is not available!");
      return;
    }

    const data = {
      doctorId,
      patientId,
      rows,
    };

    try {
      const response = await axios.post(backendUrl+'/api/prescription', data);
      console.log(response);
      if (response.status === 200) {
        alert("Prescription submitted successfully!");
      } else {
        console.error("Error submitting the prescription:", response);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Prescription Form</h2>
      <form onSubmit={handleSubmit}>
        {rows.map((row, index) => (
          <div
            key={index}
            className="flex items-center gap-4 mb-4 border-b pb-2"
          >
            <div className="w-16">
              <input
                type="text"
                value={row.sNo}
                readOnly
                className="p-2 border rounded-md"
              />
            </div>

            {/* Medicine Name with Search */}
            <div className="relative w-1/4">
              <input
                type="search"
                value={row.medicineName}
                onChange={(e) => {
                  handleInputChange(index, "medicineName", e.target.value);
                  if (activeRow === index) {
                    setQuery(e.target.value); // Update query only for active row
                  }
                }}
                placeholder="Search Medicine"
                className="w-full p-2 border rounded-md"
                onFocus={() => setActiveRow(index)} // Set active row when focused
              />
              {activeRow === index && query && filteredMedicines.length > 0 && (
                <ul className="absolute left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md max-h-40 overflow-y-auto shadow-lg">
                  {filteredMedicines.map((medicine, medicineIndex) => (
                    <li
                      key={medicineIndex}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                      onClick={() => {
                        handleInputChange(index, "medicineName", medicine);
                        setQuery(""); // Clear query after selection
                        setFilteredMedicines([]); // Clear suggestions after selection
                        setActiveRow(null); // Deactivate row after selection
                      }}
                    >
                      {medicine}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Dosage */}
            <input
              type="text"
              value={row.dosage}
              onChange={(e) => handleInputChange(index, "dosage", e.target.value)}
              placeholder="Dosage"
              className="w-1/4 p-2 border rounded-md"
            />

            {/* Timing Checkboxes */}
            <div className="flex items-center gap-2">
              {["day", "afternoon", "night", "Before Food"].map((timing) => (
                <label key={timing} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    checked={row.timing.includes(timing)}
                    onChange={() => handleTimingChange(index, timing)}
                  />
                  {timing}
                </label>
              ))}
            </div>

            {/* Remove Row Button */}
            <button
              type="button"
              onClick={() => handleRemoveRow(index)}
              className="text-red-500 hover:text-red-700"
            >
              Remove
            </button>
          </div>
        ))}

        <div className="flex justify-between items-center mt-4">
          <button
            type="button"
            onClick={handleAddRow}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Add Row
          </button>
          <button
            type="submit"
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PrescriptionForm;

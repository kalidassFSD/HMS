import React, { createContext, useContext, useState } from "react";

// Create context
const PrescriptionContext = createContext();

// Provide context
export const PrescriptionProvider = ({ children }) => {
  
  const [rows, setRows] = useState([]);
  const [query, setQuery] = useState("");
  const [filteredMedicines, setFilteredMedicines] = useState(medicines);
  const medicines = [
    "Paracetamol",
    "Ibuprofen",
    "Aspirin",
    "Amoxicillin",
    "Ciprofloxacin",
    "Metformin",
    "Omeprazole",
    "Losartan",
    "Azithromycin",
    "Diclofenac",
    "Hydrochlorothiazide",
    "Simvastatin",
    "Lisinopril",
    "Clopidogrel",
    "Ranitidine",
    "Gabapentin",
    "Atorvastatin",
    "Montelukast",
    "Levofloxacin",
    "Alprazolam",
    "Paradaz-IV",
    "Phenylephrine",
    "Cetirizine",
    "dolo650",
    "p250",
    "citrizen",
    "dolopar",
    "cipmox",
    "glycomet",
    "Aten AM",
    "Aten 25",
    "Atarax",
  ];

  const handleInputChange = (index, key, value) => {
    const newRows = [...rows];
    newRows[index] = { ...newRows[index], [key]: value };
    setRows(newRows);
  };

  const handleAddRow = () => {
    setRows([...rows, { medicineName: "" }]);
  };

  const handleRemoveRow = (index) => {
    setRows(rows.filter((_, i) => i !== index));
  };

  return (
    <PrescriptionContext.Provider
      value={{
        rows,
        query,
        filteredMedicines,
        medicines,
        setQuery,
        setFilteredMedicines,
        handleInputChange,
        handleAddRow,
        handleRemoveRow,
      }}
    >
      {children}
    </PrescriptionContext.Provider>
  );
};

// Hook to use context
export const usePrescriptionContext = () => useContext(PrescriptionContext);

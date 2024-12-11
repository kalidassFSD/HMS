import Patient from '../models/admitPatientModel.js';

// @desc    Save patient information to the database
// @route   POST /patientUpdate
// @access  Public
export const savePatient = async (req, res) => {
  try {
    const { name, age, bp, temperature, height, weight, smoke, alcoholic, predictedDisease, patientIssue, admissionType } = req.body;

    if (!name || !age || !bp || !temperature || !height || !weight || !predictedDisease || !patientIssue || !admissionType) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const newPatient = new Patient({
      name,
      age,
      bp,
      temperature,
      height,
      weight,
      smoke,
      alcoholic,
      predictedDisease,
      patientIssue,
      admissionType,
    });

    await newPatient.save();

    res.status(201).json({ success: true, message: 'Successfully updated in database', data: newPatient });
  } catch (error) {
    console.error('Error saving patient data:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

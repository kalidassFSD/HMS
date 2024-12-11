import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  bp: { type: String, required: true },
  temperature: { type: String, required: true },
  height: { type: String, required: true },
  weight: { type: String, required: true },
  smoke: { type: String, required: true },
  alcoholic: { type: String, required: true },
  predictedDisease: { type: String, required: true },
  patientIssue: { type: String, required: true },
  admissionType: { type: String, enum: ['emergency', 'general','outpatient'], required: true },

});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;

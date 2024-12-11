import express from 'express';
import { savePatient } from '../controllers/admitPatientController.js';
import Patient from '../models/admitPatientModel.js';

const router = express.Router();

// Define the route to update patient info
router.post('/add-patient', savePatient, (req, res) => {
    console.log('POST /patientUpdate hit');
    res.json({ success: true })}); // Use only the controller here
    router.get('/in-patient', async (req, res) => {
        const { type } = req.query;
        // let day = currentDate.getDate()
        // let month = currentDate.getMonth() + 1
        // let year = currentDate.getFullYear()
        // console.log(`${day}/${maonth}/${year}`)
        
        // Set up a default query to fetch all patients if no type is provided or type is not valid
        let query = {};
      
        // Filter based on admission type if valid
        if (type && (type === 'Emergency' || type === 'Outpatient')) {
          query.admissionType = type;
        }
      
        try {
          const patients = await Patient.find(query); // Find patients matching the query
          res.json(patients); // Return filtered patients as JSON
        } catch (error) {
          res.status(500).json({ error: 'Failed to fetch patients' });
        }
      });
    
// Export the router as default
export default router;

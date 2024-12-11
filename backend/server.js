import express from "express"
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from "./config/cloudinary.js"
import userRouter from "./routes/userRoute.js"
import doctorRouter from "./routes/doctorRoute.js"
import adminRouter from "./routes/adminRoute.js"
import patientRouter from "./routes/admitPatientRoute.js"

// app config
const app = express() 
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// middlewares
app.use(express.json())
app.use(cors())

// api endpoints
app.use("/api/user", userRouter)
app.use("/api/admin", adminRouter)
app.use("/api/doctor", doctorRouter)
app.use("/api", patientRouter);

app.get("/", (req, res) => {
  res.send("API Working")
});
app.all('*', (req, res) => {
  console.log(`Unhandled request method: ${req.method} for route: ${req.originalUrl}`);
  res.status(404).send('Route not found');
});
app.listen(port, () => console.log(`Server started on PORT:${port}`))
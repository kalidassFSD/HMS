import React, { useState } from 'react'
import {  useNavigate,NavLink } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {

  const navigate = useNavigate();

  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext)
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext)
  const [patientDetails ,setPatientDetails] = useState(true);
  
  useEffect(() => {
    if (dToken) {
      getAppointments()
    }
  }, [dToken])
  const handleClick = (item) => {
    // Ensure item is defined
    if (!item || !item._id) {
      console.error("Item or item._id is undefined");
      return; // Exit early if item or item._id is undefined
    }
    setPatientDetails(false); // Update state
    completeAppointment(item._id); // Complete the appointment
    navigate('/gen-patient'); // Navigate to PatientUpdate page
  };
  const calAge=(birthDate)=> {
    // Ensure birthDate is a Date object
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    
    // Adjust if the birth date hasn't occurred yet this year
    const monthDiff = today.getMonth() - birth.getMonth();
    const dayDiff = today.getDate() - birth.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }
    
    return age;
}
  
  return (
    <div className='w-full max-w-6xl m-5 '>

      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          
          <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
            <p className='max-sm:hidden'>{index}</p>
            <div className='flex items-center gap-2'>
              <img src={item.userData.image} className='w-8 rounded-full' alt="" /> <p>{item.userData.name}</p>
            </div>
            <div>
              <p className='text-xs inline border border-primary px-2 rounded-full'>
                {item.payment?'Online':'CASH'}
              </p>
            </div>
            <p className='max-sm:hidden'>{calAge(item.userData.dob)}</p>
            <p>{item.slotDate}, {item.slotTime}</p>
            <p>{currency}{item.amount}</p>
            {item.cancelled
              ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              : item.isCompleted
                ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                : <div className='flex'>
                  <img onClick={() => { setPatientDetails(false);return (cancelAppointment(item._id))}} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                  {patientDetails ? (
                  <NavLink to="/gen-patient">
                        <img onClick={() =>handleClick(item) }className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                  </NavLink>) : null}
                </div>
            }
              </div>
        ))}
      </div>

    </div>
  )
}

export default DoctorAppointments

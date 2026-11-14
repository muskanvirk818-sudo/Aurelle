import Appointment from '../models/Appointment.js';

let inMemoryAppointments = [];

// @desc    Book private salon appointment or made to measure fitting
// @route   POST /api/appointments
export const bookAppointment = async (req, res) => {
  try {
    const { fullName, email, phone, salon, service, date, time, notes } = req.body;

    if (!fullName || !email || !phone || !salon || !service || !date || !time) {
      return res.status(400).json({ success: false, message: 'Please provide all appointment details.' });
    }

    const appointmentData = {
      fullName,
      email,
      phone,
      salon,
      service,
      date,
      time,
      notes: notes || '',
      status: 'Confirmed',
    };

    try {
      const appointment = await Appointment.create(appointmentData);
      return res.status(201).json({
        success: true,
        message: 'Your private salon appointment has been confirmed. Our client concierge will contact you.',
        appointment,
      });
    } catch (err) {
      const mockAppointment = { _id: `apt_${Date.now()}`, ...appointmentData };
      inMemoryAppointments.push(mockAppointment);
      return res.status(201).json({
        success: true,
        message: 'Your private salon appointment has been confirmed. Our client concierge will contact you.',
        appointment: mockAppointment,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

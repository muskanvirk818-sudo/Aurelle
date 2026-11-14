import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    salon: {
      type: String,
      required: true,
      enum: [
        'Paris Atelier - Rue du Faubourg Saint-Honoré',
        'Milan Salon - Via Montenapoleone',
        'New York Private Suite - Madison Avenue',
        'Virtual Haute Couture Consultation',
      ],
    },
    service: {
      type: String,
      required: true,
      enum: [
        'Made to Measure Private Fitting',
        'Seasonal Lookbook Trunk Consultation',
        'Eveningwear & Bridal Commission',
        'Archive Piece Sourcing & Restoration',
      ],
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    notes: {
      type: String,
      default: '',
    },
    status: {
      type: String,
      enum: ['Confirmed', 'Pending Stylist Allocation', 'Completed'],
      default: 'Confirmed',
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema);
export default Appointment;

import moongose from "mongoose";

const appointmentSchema = moongose.Schema({
  services: [
    {
      type: moongose.Schema.Types.ObjectId,
      ref: "Services",
    },
  ],
  date: { type: Date },
  time: { type: String },
  totalAmount: { type: Number },
  user: {
    type: moongose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Appointment = moongose.model("Appointment", appointmentSchema);

export default Appointment;

import { parse, formatISO, startOfDay, endOfDay, isValid } from "date-fns";
import Appointment from "../models/Appointment.js";

const createAppointment = async (req, res) => {
  const appointment = req.body;
  appointment.user = req.user._id.toString();
  try {
    const newAppointment = new Appointment(appointment);
    await newAppointment.save();
    return res.json({ message: "Tu reservación se guardó correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const getAppointmentsByDate = async (req, res) => {
  const { date } = req.query;
  const dateParsed = parse(date, "dd/MM/yyyy", new Date());
  if (!isValid(dateParsed)) {
    const error = new Error("Fecha no válida");
    return res.status(400).json({ message: error.message });
  }
  const dateISO = formatISO(dateParsed);
  const appointments = await Appointment.find({
    date: { $gte: startOfDay(new Date(dateISO)), $lte: endOfDay(dateISO) },
  }).select("time");
  return res.json(appointments);
};

export { createAppointment, getAppointmentsByDate };

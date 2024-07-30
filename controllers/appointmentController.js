import { parse, formatISO, startOfDay, endOfDay, isValid } from "date-fns";
import Appointment from "../models/Appointment.js";
import { validateObjectId, handleNotFoundError } from "../utils/index.js";

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

const getAppointmentById = async (req, res) => {
  const { id } = req.params;
  // validate object id
  if (validateObjectId(id, res)) return;
  // validate exists
  const appointment = await Appointment.findById(id).populate("services");
  if (!appointment) return handleNotFoundError("La cita no existe", res);
  if (appointment.user.toString() !== req.user._id.toString()) {
    const error = new Error("No tienes los permisos");
    return res.status(403).json({ message: error.message });
  }
  return res.json(appointment);
};

const updateAppointment = async (req, res) => {
  const { id } = req.params;
  // validate object id
  if (validateObjectId(id, res)) return;
  // validate exists
  const appointment = await Appointment.findById(id).populate("services");
  if (!appointment) return handleNotFoundError("La cita no existe", res);
  // validate permissions
  if (appointment.user.toString() !== req.user._id.toString()) {
    const error = new Error("No tienes los permisos");
    return res.status(403).json({ message: error.message });
  }
  // update
  const { date, time, totalAmount, services } = req.body;
  appointment.date = date;
  appointment.time = time;
  appointment.totalAmount = totalAmount;
  appointment.services = services;
  try {
    const result = await appointment.save();
    return res.json({ message: "Cita actualizada correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const deleteAppointment = async (req, res) => {
  const { id } = req.params;
  // validate object id
  if (validateObjectId(id, res)) return;
  // validate exists
  const appointment = await Appointment.findById(id).populate("services");
  if (!appointment) return handleNotFoundError("La cita no existe", res);
  // validate permissions
  if (appointment.user.toString() !== req.user._id.toString()) {
    const error = new Error("No tienes los permisos");
    return res.status(403).json({ message: error.message });
  }
  try {
    await appointment.deleteOne();
    return res.json({ message: "Cita cancelada exitosamente" });
  } catch (error) {
    console.log(error);
  }
};

export {
  createAppointment,
  getAppointmentsByDate,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
};

import mongoose from "mongoose";
import Services from "../models/Services.js";
import { services } from "../data/beautyServices.js";
import { validateObjectId, handleNotFoundError } from "../utils/index.js";

const createService = async (req, res) => {
  if (Object.values(req.body).includes("")) {
    const error = new Error("Todos los campos son obligatorios");
    return res.status(400).json({ message: error.message });
  }
  try {
    const service = new Services(req.body);
    await service.save();
    res.json({ message: "El servicio se creó correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const getServiceById = async (req, res) => {
  const { id } = req.params;
  if (validateObjectId(id, res)) return;
  const service = await Services.findById(id);
  if (!service) return handleNotFoundError("El servicio no existe", res);
  res.json(service);
};

const getServices = (req, res) => {
  res.json(services);
};

const updateService = async (req, res) => {
  const { id } = req.params;
  if (validateObjectId(id, res)) return;
  const service = await Services.findById(id);
  if (!service) return handleNotFoundError("El servicio no existe", res);
  service.name = req.body.name || service.name;
  service.price = req.body.price || service.price;
  try {
    await service.save();
    res.json({ message: "El servicio se actualizó correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const deleteService = async (req, res) => {
  const { id } = req.params;
  if (validateObjectId(id, res)) return;
  const service = await Services.findById(id);
  if (!service) return handleNotFoundError("El servicio no existe", res);
  try {
    await service.deleteOne();
    res.json({ message: "El servicio se eliminó correctamente" });
  } catch (error) {
    console.log(error);
  }
};

export {
  createService,
  getServiceById,
  getServices,
  updateService,
  deleteService,
};

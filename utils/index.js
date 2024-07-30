import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { format } from "date-fns";
import es from "date-fns/locale/es";

const validateObjectId = (id, res) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("El id no es válido");
    return res.status(400).json({ message: error.message });
  }
};

const handleNotFoundError = (message, res) => {
  const error = new Error(message);
  return res.status(404).json({ message: error.message });
};

const uniqueId = () =>
  Date.now().toString(32) + Math.random().toString(32).substring(2);

const generateJWT = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
  return token;
};

const formatDate = (date) => format(date, "PPPP", { locale: es });

export {
  validateObjectId,
  handleNotFoundError,
  uniqueId,
  generateJWT,
  formatDate,
};

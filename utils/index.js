import mongoose from "mongoose";

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

export { validateObjectId, handleNotFoundError };

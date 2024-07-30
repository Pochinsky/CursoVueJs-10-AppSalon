import User from "../models/User.js";
import {
  sendEmailVerification,
  sendEmailPasswordReset,
} from "../emails/authEmailService.js";
import { generateJWT, uniqueId } from "../utils/index.js";

const register = async (req, res) => {
  // all fields validate
  if (Object.values(req.body).includes("")) {
    const error = new Error("Todos los campos son obligatorios");
    return res.status(400).json({ message: error.message });
  }
  const { name, email, password } = req.body;
  // prevent registers duplicated
  const userExists = await User.findOne({ email });
  if (userExists) {
    const error = new Error("Cuenta ya registrada");
    return res.status(400).json({ message: error.message });
  }
  // validate password extension
  const MIN_PASSWORD_LENGTH = 8;
  if (password.trim().length < MIN_PASSWORD_LENGTH) {
    const error = new Error(
      "La contraseña debe contener, al menos, " +
        MIN_PASSWORD_LENGTH +
        " caracteres"
    );
    return res.status(400).json({ message: error.message });
  }
  try {
    const user = new User(req.body);
    const result = await user.save();
    const { name, email, token } = result;
    sendEmailVerification({ name, email, token });
    return res.json({
      message: "Tu cuenta se creó correctamente, revisa tu email",
    });
  } catch (error) {
    console.log(error);
  }
};

const verifyAccount = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ token });
  if (!user) {
    const error = new Error("Ocurrió un error, token no válido");
    return res.status(401).json({ message: error.message });
  }
  try {
    user.verified = true;
    user.token = "";
    await user.save();
    return res.json({ message: "Cuenta confirmada correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  // check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("La cuenta no existe");
    return res.status(401).json({ message: error.message });
  }
  // user confirmed his account
  if (!user.verified) {
    const error = new Error("Tu cuenta no ha sido confirmada aún");
    return res.status(401).json({ message: error.message });
  }
  // check password
  if (await user.checkPassword(password)) {
    const token = generateJWT(user._id);
    return res.json({ token });
  } else {
    const error = new Error("La contraseña es incorrecta");
    return res.status(401).json({ message: error.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  // check if user exists
  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("El usuario no existe");
    return res.status(404).json({ message: error.message });
  }
  // generate token
  try {
    user.token = uniqueId();
    const result = await user.save();
    await sendEmailPasswordReset({
      name: result.name,
      email: result.email,
      token: result.token,
    });
    return res.json({
      message: "Te hemos enviado un email con las instrucciones",
    });
  } catch (error) {
    console.log(error);
  }
};

const verifyPasswordResetToken = async (req, res) => {
  const { token } = req.params;
  const isValidToken = await User.findOne({ token });
  if (!isValidToken) {
    const error = new Error("Hubo un error, token no válido");
    return res.status(400).json({ message: error.message });
  }
  return res.json({ message: "Token válido" });
};

const updatePassword = async (req, res) => {
  const { token } = req.params;
  const user = await User.findOne({ token });
  if (!user) {
    const error = new Error("Hubo un error, token no válido");
    return res.status(400).json({ message: error.message });
  }
  const { password } = req.body;
  try {
    user.token = "";
    user.password = password;
    await user.save();
    return res.json({ message: "Contraseña modificada correctamente" });
  } catch (error) {
    console.log(error);
  }
};

const user = async (req, res) => {
  const { user } = req;
  return res.json(user);
};

export {
  register,
  verifyAccount,
  login,
  forgotPassword,
  verifyPasswordResetToken,
  updatePassword,
  user,
};

import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import { db } from "./config/db.js";
import servicesRoutes from "./routes/servicesRoutes.js";
import authRoutes from "./routes/authRoutes.js";

// enviroment varaibles
dotenv.config();

// config app
const app = express();
app.use(express.json());

// db conect
db();

// config CORS
const whitelist = [process.env.FRONTEND_URL];
if (process.argv[2] === "--postman") whitelist.push(undefined);
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.includes(origin)) callback(null, true);
    else callback(new Error("Error de CORS"));
  },
};
app.use(cors(corsOptions));

// define routes
app.use("/api/services", servicesRoutes);
app.use("/api/auth", authRoutes);

// define port
const PORT = process.env.PORT || 4000;

// start app
app.listen(PORT, () => {
  console.log(
    colors.blue("El servidor se está ejecutando en el puerto:", PORT)
  );
});

import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import { db } from "./config/db.js";
import servicesRoutes from "./routes/servicesRoutes.js";

// enviroment varaibles
dotenv.config();

// config app
const app = express();

// db conect
db();

// define routes
app.use("/api/services", servicesRoutes);

// define port
const PORT = process.env.PORT || 4000;

// start app
app.listen(PORT, () => {
  console.log(
    colors.blue("El servidor se está ejecutando en el puerto:", PORT)
  );
});

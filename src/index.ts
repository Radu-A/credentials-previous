import express from "express";
import router from "./routes";

const app = express();
app.use(express.json());

// Enganchamos el router a la ruta base '/sync'
app.use("/sync", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 MVP modularizado listo y escuchando en el puerto ${PORT}`);
});

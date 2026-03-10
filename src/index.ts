import express from "express";
import router from "./routes";

const app = express();
app.use(express.json());

app.use("/sync", router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`App ready and listening in "http://localhost:${PORT}"`);
});

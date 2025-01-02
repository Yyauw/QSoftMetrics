import express from "express";
import usuarioRouter from "./src/routes/usuario.js";
import softwareRouter from "./src/routes/software.js";
import evaluacionRouter from "./src/routes/evaluacion.js";
import resultadoRouter from "./src/routes/resultados.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use("/api", usuarioRouter);
app.use("/api", softwareRouter);
app.use("/api", evaluacionRouter);
app.use("/api", resultadoRouter);

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Bienvenido al api de QSoftMetrics!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

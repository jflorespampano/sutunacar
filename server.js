import express from 'express';
import {join} from 'node:path'
import empledosRouter from './src/routes/empleados.router.js'
import tabuladorRouter from './src/routes/tabulador.router.js'
import dotenv from 'dotenv'
import {centroTrabajo} from './datos.js'

// Define un puerto para el servidor
dotenv.config()
const PORT = process.env.PORT || 3000

//configuraciones del servidor
const pathViews=join(process.cwd(),'views')
const app = express();

// Configura una carpeta estática ('public')
app.use(express.static('public'));
// Establece EJS como el motor de plantillas y la carpeta donde estan las vistas
app.set("view engine", "ejs");
//ruta de las vistas
app.set("views", pathViews);
// Middleware JSON
app.use(express.json());
// Middleware urlencode
app.use(express.urlencoded({ extended: true }));

//rutas para los socios y tabulador
app.use("/socios", empledosRouter);
app.use("/tabulador", tabuladorRouter);

//devuelve la intefaz del cliente
app.get("/", (_, res) => {
    res.render("index");
});

//iterfaz beneficiarios
app.get("/beneficiarios", (_, res) => {
    res.render("beneficiarios");
});

//iterfaz aguinaldo
app.get("/aguinaldo", (_, res) => {
    res.render("aguinaldo");
});

//iterfaz salario regulador
app.get("/salario_regulador", (_, res) => {
    res.render("salarioRegulador");
});

//iterfaz pdf del contrato colectivo
app.get("/cct", (_, res) => {
    res.render("cct");
});

//iterfaz gráficas
app.get("/graficas", (_, res) => {
    res.render("graficas");
});

//devuelve el catalogo de centro de trabajo
app.get("/ct/all", (_, res) => {
    res.status(200).json({success:true, data:centroTrabajo, error:null});
});

//devuelve la intefaz del cliente para movimientos al tabulador
app.get("/admin", (_, res) => {
  res.render("movTabulador");
});

// para igonorar la solicitud del favicon si no tenemos favicon.ico
// app.get('/favicon.ico', (req, res) => res.status(204).end());
// si existe ponerlo en la carpeta public

// Middlewares
app.use((_, res, next) => {
  res.status(404).send("404 página no encontrada");
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log("Servidor escuchando en: \x1b[33m%s\x1b[0m", `http://localhost:${PORT}`);
});
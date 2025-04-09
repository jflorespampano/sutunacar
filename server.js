import express from 'express';
import {join} from 'node:path'
import sociosRouter from './src/routes/socios.router.js'
import tabuladorRouter from './src/routes/tabulador.router.js'
import dotenv from 'dotenv'

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
app.use("/socios", sociosRouter);
app.use("/tabulador", tabuladorRouter);

//devuelve la intefaz del cliente
app.get("/", (req, res) => {
    res.render("index");
});

//devuelve la intefaz del cliente para tabulador
app.get("/admin", (req, res) => {
  res.render("movTabulador");
});

//para igonorar la solicitud del favicon
app.get('/favicon.ico', (req, res) => res.status(204).end());

// Middlewares
app.use((req, res, next) => {
  res.status(404).send("404 página no encontrada");
});

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`App escuchando en:`);
    console.log("\x1b[33m%s\x1b[0m", `http://localhost:${PORT}`);
});
const express = require("express");
// const router = express.Router()
const routerTipoPartes = require('./src/routes/partes.router.js')
const path = require("path");

const PORT = process.env.PORT || 3001;
const app = express();

// Static files
/**Cuando se realiza una solicitud a su servidor Express, Express comprobará si la URL solicitada coincide con un archivo en el directorio estático especificado (public en este caso).
Si se encuentra una coincidencia, Express servirá el archivo directamente sin procesarlo como una ruta.
Si no se encuentra ninguna coincidencia, Express continuará procesando la solicitud como de costumbre, buscando una ruta coincidente. */
// app.use(express.static(path.join(__dirname, 'public')));
app.use('static',express.static(path.join(__dirname, 'public')));
// Establece EJS como el motor de plantillas y la carpeta donde estan las vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// Middleware JSON
app.use(express.json());
// Middleware urlencode
app.use(express.urlencoded({ extended: true }));
//rutas
// app.use('/tipoPartes', routerTipoPartes);

app.get("/", (req, res) => {
  res.render("index", {
    rutaActual: "/",
  });
});

// Middlewares
app.use((req, res, next) => {
  res.status(404).render("pagina no encontrada");
});

// const infoUsuario = {
//   nombre: "urian",
//   apellido: "Viera",
//   profesion: "Developer",
//   admin: true,
// };

// app.get("/informacion", (req, res) => {
//   res.render("pages/informacion", {
//     infoUsuario,
//     rutaActual: "/informacion",
//   });
// });

// let variable_lenguaje = "NodeJS";
// app.get("/perfil", (req, res) => {
//   res.render("pages/perfil", {
//     rutaActual: "/perfil",
//     variable_lenguaje,
//   });
// });

/**
 * Arrancando nuestro servidor con Express
 */
app.listen(PORT, () => {
  console.log(`App listening at `);
  console.log("\x1b[33m%s\x1b[0m", `http://localhost:${PORT}`);

});
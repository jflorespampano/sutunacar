// const express = require('express');
import express from 'express';
// const path = require("path"); 
// import path from 'path';
import {join} from 'node:path'

const pathViews=join(process.cwd(),'views')

//////////////////
// import { fileURLToPath } from 'url';
// // Obtener la ruta del archivo actual
// const __filename = fileURLToPath(import.meta.url);
// // Obtener el directorio actual
// const __dirname = path.dirname(__filename);
//////////////////

const app = express();
// Configura una carpeta estática (por ejemplo, 'public')
app.use(express.static('public'));
// Establece EJS como el motor de plantillas y la carpeta donde estan las vistas
app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
app.set("views", pathViews);

app.get("/", (req, res) => {
    res.render("index");
  });

// Define un puerto para el servidor
const PORT = 3000;

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`App listening at `);
    console.log("\x1b[33m%s\x1b[0m", `http://localhost:${PORT}`);
});
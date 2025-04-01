// Importa Express
const express = require('express');
const path = require("path"); 
const app = express();

// Configura una carpeta estática (por ejemplo, 'public')
app.use(express.static('public'));
// Establece EJS como el motor de plantillas y la carpeta donde estan las vistas
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

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
import express from 'express';
import {join} from 'node:path'
//usar Dao
import AppDaoBetterSQLite from './src/controllers/DaoBetterSqlite3.js'
import ModelSocio from "./src/models/model.empleados.js";
const controllerDB=new AppDaoBetterSQLite('socios.sqlite')
const mc=new ModelSocio(controllerDB)


// Define un puerto para el servidor
const PORT = 3000;
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

//devuelve la intefaz del cliente
app.get("/", (req, res) => {
    res.render("index");
});

//rutas
app.post('/add', (req,res)=>{
  const datos=req.body
  // console.log("insertar:",datos)
  // console.log("numEmp:",datos.numEmp)
  // mandar los datos a la base de datos
  //verificar si ya existe el numero de empleado
  let message=""
  let success=false
  let resp= mc.getNe(datos.numEmp)
  //si el dato no fue encontrado
  if(resp === undefined){
    console.log("No existe  el dato")
    // obtener un arreglo con las llaves del objeto js
    // const claves = Object.keys(datos);
    // obtener un arreglo con los valores del objeto js
    const values = Object.values(datos);
    console.log("claves:",values)
    resp=mc.insert(values)
    message="Datos insertados"
    success=true
  }else{
    success=true
    resp=null
    message="registro repetido"
  }
  // res.send(JSON.stringify({
  //   success, 
  //   message,
  //   resp
  // }))
  res.status(200).json({success:true, message, resp});
})

app.get('/get/:id', (req, res) => {
  const id = req.params.id; // Obtiene el parámetro "id"
  const resp= mc.getNe(id)
  if(resp === undefined){
      // console.log("No existe  el dato")
      // res.send({success:false, data: null, message:'no esta :'+id})
      res.status(200).json({success:false, data: null, message:'no esta :'+id});

  }else{
      // console.log("Dato encontrado:",resp)
      // res.send({success:true, data: resp, message:'ahi va :'+id})
      res.status(200).json({success:true, data: resp, message:'ahi va :'+id});
  }
})

app.get('/all', (req,res)=>{
  // res.send(JSON.stringify({success:true, message:' ahi van todos'}))
  res.status(200).json({success:true, data: [], message:'ahi van los datos'});
})

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`App escuchando en:`);
    console.log("\x1b[33m%s\x1b[0m", `http://localhost:${PORT}`);
});
import express from 'express'
import {join} from 'node:path'
import AppDaoBetterSQLite from '../controllers/DaoBetterSqlite3.js'
import ModelSocio from "../models/model.empleados.js";

//controlador de la base de datos
const pathDb=join(process.cwd(),'socios.sqlite')
const controllerDB=new AppDaoBetterSQLite(pathDb)

const mc=new ModelSocio(controllerDB)
const router = express.Router();

// Home page route.
router.get("/", function (req, res) {
  res.send("mensaje socio");
});

// espera llamado post así: http://localhost:3000/socios/add
router.post('/add', (req,res)=>{
    const datos=req.body
    // mandar los datos a la base de datos
    //verificar si ya existe el numero de empleado
    let message=""
    let resp= mc.getNe(datos.numEmp)
    //si el dato no fue encontrado
    if(resp.data.length === 0){
      // console.log("No existe  el dato")
      // obtener un arreglo con las llaves del objeto js
      // const claves = Object.keys(datos);
      // obtener un arreglo con los valores del objeto js
      const values = Object.values(datos);
      // console.log("claves:",values)
      // console.log("(52)resp:",resp)
      resp=mc.insert(values)
      message=resp.message
    }else{
      resp=null
      message="registro repetido"
    }
    res.status(200).json({success:true, message, resp});
})

//espera llamado get así: http://localhost:3000/socios/one/${numEmp}
router.get('/one/:id', (req, res) => {
    const id = req.params.id; // Obtiene el parámetro "id"
    const resp= mc.getNe(id)
    // console.log("al buscar:",resp)
    res.status(200).send(JSON.stringify(resp))
})

router.get('/all', (req,res)=>{
    //fata esta parte
    res.status(200).json({success:true, data: [], message:'ahi van los datos'});
})
  
export default router
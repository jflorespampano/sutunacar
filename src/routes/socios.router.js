import express from 'express'
import {join} from 'node:path'
import validator from 'validator'
import AppDaoBetterSQLite from '../controllers/DaoBetterSqlite3.js'
import ModelSocio from "../models/model.empleados.js";

//controlador de la base de datos
const pathDb=join(process.cwd(),'socios.sqlite')
const controllerDB=new AppDaoBetterSQLite(pathDb)

const mc=new ModelSocio(controllerDB)
const router = express.Router();

// Home page route.
router.get("/", function (req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.send("mensaje socio");
});

// espera llamado post así: http://localhost:3000/socios/add
router.post('/add', (req,res)=>{
    let datos=req.body
    //verificar si ya existe el numero de empleado
    let message=""
    let resp= mc.getNe(datos.numEmp)
    const data=resp.data
    if(resp.error){
      res.setHeader('Content-Type', 'application/json');
      res.status(500).send({success:true, message, error:resp.error})
      return
    }
    //si el dato no fue encontrado
    if(data.length === 0){
      // console.log("No existe  el dato")
      //sanitizar los campos críticos
      datos.nombre=validator.escape(datos.nombre)
      datos.correo=validator.normalizeEmail(datos.correo)
      datos.nss=datos.nss.replace(/[^0-9]/g, '');
      // console.log("socios.router(25) datos:",datos)
      // mandar los datos a la base de datos
      // obtener un arreglo con las llaves del objeto js
      // const claves = Object.keys(datos);
      // obtener un arreglo con los valores del objeto js
      const values = Object.values(datos);
      resp=mc.insert(values)
      message=resp.message
    }else{
      //si el dato fue encontrado
      resp=null
      message="registro repetido"
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({success:true, message, resp});
})

//espera llamado get así: http://localhost:3000/socios/one/${numEmp}
router.get('/one/:id', (req, res) => {
    const id = req.params.id; // Obtiene el parámetro "id"
    const resp= mc.getNe(id)
    if(resp.error){
      res.setHeader('Content-Type', 'application/json');
      res.status(500).send({success:false, message:resp.message, error:resp.error})
      return
    }
    // console.log("al buscar:",resp)
    res.setHeader('Content-Type', 'application/json');
    res.status(200).send(JSON.stringify(resp))
})

router.get('/all', (req,res)=>{
    //fata esta parte
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({success:true, data: [], message:'ahi van los datos'});
})
  
export default router
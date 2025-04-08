import express from 'express'
import {join} from 'node:path'
import AppDaoBetterSQLite from '../controllers/DaoBetterSqlite3.js'
import ModelTabulador from "../models/model.tabulador.js";

//controlador de la base de datos
const pathDb=join(process.cwd(),'socios.sqlite')
const controllerDB=new AppDaoBetterSQLite(pathDb)

const mc=new ModelTabulador(controllerDB)
const router = express.Router();

// Home page route.
router.get("/", function (req, res) {
  res.send("mensaje tabulador");
});

// espera llamado get http://localhost:3000/tabulador/one/d33
router.get('/one/:id', (req, res) => {
    const id = req.params.id; // Obtiene el parámetro "id"
    console.log("(20) router tabulador id:",id)
    const resp= mc.getClave(id)
    // console.log("al buscar:",resp)
    res.status(200).send(JSON.stringify(resp))
})

//espera llamado get: http://localhost:3000/tabulador/all
router.get('/all', (req,res)=>{
    //fata esta parte
    const resp=mc.getAll()
    res.status(200).json({success:true, data: resp , message:'ahi van los datos'});
})

//espera llamado put: http://localhost:3000/tabulador
//con datos json {"clave":"d33", "sm":45} 
router.put('/', (req,res)=>{
    const datos=req.body
    console.log("actualizar:",datos)
    res.send(JSON.stringify({success:true, data:datos, message:'actualizado'}))
})
  
export default router
import express from 'express'
import {join} from 'node:path'
import AppDaoBetterSQLite from '../controllers/DaoBetterSqlite3.js'
import ModelTabulador from "../models/model.tabulador.js";
import dotenv from 'dotenv'

dotenv.config()
const mydb=process.env.SQLITE_DB || 'socios.sqlite'
//controlador de la base de datos
// const pathDb=join(process.cwd(),'socios.sqlite')
const pathDb=join(process.cwd(),mydb)
const controllerDB=new AppDaoBetterSQLite(pathDb)

const mc=new ModelTabulador(controllerDB)
const router = express.Router();

// Home page route.
router.get("/", function (_, res) {
    res.setHeader('Content-Type', 'text/html');
    res.send("mensaje tabulador");
});

// espera llamado get http://localhost:3000/tabulador/one/d33
router.get('/one/:id', (req, res) => {
    const id = req.params.id; // Obtiene el parámetro "id"
    // console.log("(20) router tabulador id:",id)
    const resp= mc.get(id)
    // console.log("al buscar:",resp)
    res.setHeader('Content-Type', 'application/json')
    res.status(200).send(JSON.stringify(resp))
})

router.get('/clave/:clave', (req, res) => {
    const clave = req.params.clave; // Obtiene el parámetro "clave"
    const resp= mc.getClave(clave)
    // console.log("(31) tabulador.rotute al buscar:",resp)
    res.setHeader('Content-Type', 'application/json')
    res.status(200).send(JSON.stringify(resp))
})

//espera llamado get: http://localhost:3000/tabulador/all
router.get('/all', (_,res)=>{
    //fata esta parte
    const resp=mc.getAll()
    res.status(200).json(resp);
})

//espera llamado put: http://localhost:3000/tabulador
//con datos json {"clave":"d33", "sm":45} 
router.put('/update/:id/:nv', (req,res)=>{
    // console.log("entro a put")
    // const datos=req.body
    // console.log("actualizar:",datos)
    const id = req.params.id
    const nv = req.params.nv
    res.send(JSON.stringify({success:true, data:{id,nv}, message:`sm con id=${id} actualizado a ${nv}`}))
})
  
export default router
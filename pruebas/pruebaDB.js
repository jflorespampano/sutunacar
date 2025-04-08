//usar Dao
import AppDaoBetterSQLite from '../src/controllers/DaoBetterSqlite3.js'
import ModelSocio from "../src/models/model.empleados.js";

const controllerDB=new AppDaoBetterSQLite('socios.sqlite')
const mc=new ModelSocio(controllerDB)

// const resp=mc.insert([
//     "779","jose luis cuevas",40,"luis@mail.com","938-00-00-00",
//     "62876429101","d32","1998-02-01","01","25"
// ])
// const resp=mc.getAll()
// const resp= mc.get(3)
const resp= mc.getNe('779')
if(resp === undefined){
    console.log("No existe  el dato")
    
}else{
    console.log("Dato encontrado:",resp)

}


import AppDaoBetterSQLite from './src/controllers/DaoBetterSqlite3.js'
import Tabulador from "./src/models/model.tabulador.js";


//controlador de la base de datos
const controllerDB=new AppDaoBetterSQLite('socios.sqlite')
const mc=new Tabulador(controllerDB)

console.log("🚀 ~ :9 ~ mc:", mc)
console.log("🚀 ~ mc:", mc)

console.log("🚀 ~ mc:", mc)
// const resp=mc.getAll()
// console.log(resp.data)

const resp=mc.update([313.45,'d47']) //[$,clave]
console.log("🚀 ~ resp:", resp)
console.log(resp.data)

// const resp2=mc.getClave('d47')
// console.log(resp2.data)

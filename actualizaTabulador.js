import Database from "better-sqlite3";
// import fs from 'fs'
import { tabuladorVigente } from './datos.js'

const db = new Database('./socios.sqlite')
// const data=JSON.parse(fs.readFileSync('./src/json/tabuladorVigente.json','utf8'))
// console.log(data)
const data=tabuladorVigente

const update = db.prepare(`update tabulador set sm = ? where clave= ?`)

data.forEach(item => {
    update.run(item.sm, item.clave)
})

db.close()
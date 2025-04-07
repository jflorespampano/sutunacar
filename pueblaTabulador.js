import Database from "better-sqlite3";
import fs from 'fs'

const db = new Database('./socios.sqlite')
const data=JSON.parse(fs.readFileSync('./src/json/tabuladorVigente.json','utf8'))
console.log(data)

const insert = db.prepare(`insert into tabulador(clave,descripcion,sm) values(?, ?, ?)`)

data.forEach(item => {
    insert.run(item.clave, item.descripcion, item.sm)
})

db.close()
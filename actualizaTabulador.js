import Database from "better-sqlite3";
import fs from 'fs'

const db = new Database('./socios.sqlite')
const data=JSON.parse(fs.readFileSync('./src/json/tabuladorVigente.json','utf8'))
console.log(data)

const insert = db.prepare(`update tabulador set sm = ? where clave= ?`)

data.forEach(item => {
    insert.run(item.sm, item.clave)
})

db.close()
/**
 * (Crea/crea y puebla) la base de datos
 */
import Database from "better-sqlite3"
import dotenv from 'dotenv'
import fs from 'fs'
import { empleados, tabulador } from './datos.js'
import readline from 'readline'

dotenv.config()
const mydb=process.env.SQLITE_DB || 'socios.sqlite'

function crearDB(){
    const db = new Database(mydb)

    //tabla empleados
    const query=`CREATE TABLE IF NOT EXISTS empleados 
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        numemp TEXT (5) UNIQUE, 
        nombre TEXT (50), 
        edad INTEGER NOT NULL,
        sexo TEXT CHECK(sexo IN ('M', 'F')) NOT NULL,
        ct TEXT (4), 
        correo TEXT (70), 
        telefono TEXT (20), 
        nss TEXT (15) NOT NULL, 
        puesto TEXT (50), 
        fecha_ingreso_unacar TEXT (10), 
        mes_ingreso_imss TEXT (2), 
        dia_ingreso_imss TEXT (2)
    );
    `
    db.exec(query)
    
    //puebla empleados
    if(poblar){
        const stmt = db.prepare(`INSERT INTO empleados
            (
                numemp, nombre, edad, sexo, ct,
                correo, telefono,nss,
                puesto,fecha_ingreso_unacar, mes_ingreso_imss, 
                dia_ingreso_imss
            ) 
            VALUES (
                ?,?,?,?,?,
                ?,?,?,
                ?,?,?,
                ?
            );`
        );
        empleados.forEach(e => {
            stmt.run([
                e.numemp, e.nombre, e.edad, e.sexo, e.ct,
                e.correo, e.telefono, e.nss, 
                e.puesto, e.fecha_ingreso_unacar, e.mes_ingreso_imss, 
                e.dia_ingreso_imss
            ]);
        });
    }
    
    //tabla tabulador
    const query2=`CREATE TABLE IF NOT EXISTS tabulador 
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            clave TEXT (4) NOT NULL, 
            descripcion TEXT (50) NOT NULL, 
            sm NUMERIC (10, 2) DEFAULT (0)
        );
    `
    db.exec(query2)
    
    //puebla tabulador
    if(poblar){
        const stmt2 = db.prepare(`INSERT INTO tabulador
            (
                clave,
                descripcion,
                sm
            ) 
            VALUES (
                ?,?,?
            );`
        );
        tabulador.forEach(e => {
            stmt2.run([
                e.clave, e.descripcion, e.sm
            ]);
        });
    
    }
    //cerrar db
    db.close()
}

var poblar=false
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
if (fs.existsSync(mydb)) {
    console.log('La base de datos:', mydb, ' Existe, NO se realizo NINGUNA acción');
    process.exit(0)
}else{
    rl.question('¿Desa también poblar la BD con datos de prueba? si/no/cancelar:(s/n/x) ', (respuesta) => {
        if (respuesta.toLowerCase() === 's') {
          console.log('¡Será poblada!');
          poblar=true
        } else if (respuesta.toLowerCase() === 'n') {
          console.log('No será poblada');
          poblar=false
        } else {
          console.log('Respuesta no válida. Por favor, responde con "s" o "n".');
          process.exit(0)
        }
        rl.close();
        crearDB()
        if(poblar){
            console.log('La base de datos:', mydb, 'Fue creada y poblada con datos de prueba');
        }else{
            console.log('La base de datos:', mydb, 'Fue creada vacia');
        }
    });
}




import Database from "better-sqlite3"
import fs from 'fs'

class AppDaoBetterSQLite{
    constructor(dbFilePath){
        this.dbName=dbFilePath
        this.db=null
        this.dbOpen=false
    }
    /**
     * Abre la base de datos
     * @returns {boolean,text} exito/fracaso, mensaje
     */
    open(){
        if (!fs.existsSync(this.dbName)) {
            console.log('La base de datos no existe:',this.dbName);
            this.db=null
            this.dbOpen=false
            return {dbOpen:false, message:"La base de datos no existe."}
        }
        // this.db = new Database(this.dbName)
        this.db = new Database(this.dbName, { verbose: console.log });
        //en aplicaciones con alta concurrencia agregar:
        //db.pragma('journal_mode = WAL');
        this.dbOpen=true
        return {dbOpen:true, message:"Base de datos abierta"}
    }
    run(sql, params = []) {
        // const insertData = this.db.prepare(sql)
        // const r=insertData.run(params)
        //
        try {
            const insertData = this.db.prepare(sql)
            const r=insertData.run(params)
            // console.log('Operación realizada con éxito:', r);
            return {
                success:true,
                data:r,
                message:"Operación exitosa",
                error:null
            }
        } catch (error) {
            // console.error('Ocurrió un error al ejecutar la sentencia:', error.message);
            return {
                success:false,
                data:null,
                message:"Sin exito",
                error:error.message
            }
        }
    }
    get(sql, params = []) {
        try {
            //si la consulta fue satisfactoria pero no hay datos  devuelve undefined 
            const res = this.db.prepare(sql).get(params)
            console.log("sql:",sql,params)
            // console.log("Dao(56)res:",res)
            return {
                success:true,
                data:res===undefined ? [] : [res],
                message:"Operación exitosa",
                error:null
            }
        } catch (error) {
            // 
            return {
                success:false,
                data:[],
                message:"Sin exito",
                error:error.message
            }
        }
        // const res = this.db.prepare(sql).get(params)
        // return res
    }

    all(sql, params = []) {
        try {
            const res = this.db.prepare(sql).all()
            return {
                success:true,
                data:res===undefined ? [] : res,
                message:"Operación exitosa",
                error:null
            }
            
        } catch (error) {
            return {
                success:false,
                data:[],
                message:"Sin exito",
                error:error.message
            }
        }
    }
    close(){
        // console.log("base de datos cerrada")
        if(this.dbOpen) this.db.close()
    }
}


export default AppDaoBetterSQLite
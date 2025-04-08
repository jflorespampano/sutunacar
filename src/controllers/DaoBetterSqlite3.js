import Database from "better-sqlite3";

class AppDaoBetterSQLite{
    constructor(dbFilePath){
        this.dbName=dbFilePath
        this.db=null
        this.dbOpen=false
    }
    open(){        
        // this.db = new Database(this.dbName)
        this.db = new Database(this.dbName, { verbose: console.log });
        //en aplicaciones con alta concurrencia agregar:
        //db.pragma('journal_mode = WAL');
        this.dbOpen=true
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
            // console.log("try")
            return {
                success:true,
                data:res===undefined ? [] : [res],
                message:"Operación exitosa",
                error:null
            }
        } catch (error) {
            // console.log("catch()")
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
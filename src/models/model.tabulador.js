class ModelTabulador{
    constructor(controller){
        this.dbController=controller
    }
    /**
     * 
     * @param {*} id entero que representa el id
     * @returns 
     */
    get(id){
        const sql=`select * from tabulador where id=?;`
        const resp=this.dbController.open()
        if(!resp.dbOpen){
            return({
                "success":false,
                "data":[],
                "error":resp.message
            })
        }
        const data = this.dbController.get(sql,[id])
        this.dbController.close()
        return(data)
    }
    /**
     * 
     * @param {*} id entero que representa el 
     * @returns 
     */
    getClave(ne){
        const sql=`select * from tabulador where clave=?;`
        const resp=this.dbController.open()
        if(!resp.dbOpen){
            return({
                "success":false,
                "data":[],
                "message":"",
                "error":resp.message
            })
        }
        const data = this.dbController.get(sql,[ne])
        this.dbController.close()
        return(data)
    }
    /**
     * Devuelve la lista de todos los renglones
     * @returns objeto con la lista de datos
     */
    getAll(){
        const sql=`select * from tabulador;`
        const resp=this.dbController.open()
        if(!resp.dbOpen){
            return({
                "success":false,
                "data":[],
                "error":resp.message
            })
        }
        const data = this.dbController.all(sql,[])
        this.dbController.close()
        return(data)
    }
    update(datos){
        const sql=`
            update tabulador
            set sm = ?
            where clave = ?;
        `
        const resp=this.dbController.open()
        if(!resp.dbOpen){
            return({
                "success":false,
                "data":[],
                "error":resp.message
            })
        }
        const data = this.dbController.run(sql,datos)
        this.dbController.close()
        return(data)
    }
}
export default ModelTabulador
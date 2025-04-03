class ModelEmpleados{
    constructor(controller){
        this.dbController=controller
    }
    /**
     * 
     * @param {*} id entero que representa el id
     * @returns 
     */
    get(id){
        const sql=`select * from empleados where id=?;`
        this.dbController.open()
        const data = this.dbController.get(sql,[id])
        this.dbController.close()
        return data
    }
    /**
     * 
     * @param {*} id entero que representa el id
     * @returns 
     */
    getNe(ne){
        const sql=`select * from empleados where numemp=?;`
        this.dbController.open()
        const data = this.dbController.get(sql,[ne])
        this.dbController.close()
        return data
    }
    /**
     * Devuelve la lista de todos los usuarios
     * @returns objeto con la lista de datos
     */
    getAll(){
        const sql=`select * from empleados;`
        this.dbController.open()
        const data = this.dbController.all(sql,[])
        this.dbController.close()
        return data
    }
    /**
     * Inserta un registro en users
     * @param {*} datos arreglo de parametros [name,username]
     * @returns 
     */
    insert(datos){
        const sql=`
            insert into empleados
            (numemp,nombre,edad,correo,telefono,
            nss,puesto,fecha_ingreso_unacar,mes_ingreso_imss,dia_ingreso_imss) 
            values(?,?,?,?,?,
            ?,?,?,?,?)
        `
        this.dbController.open()
        const data = this.dbController.run(sql,datos)
        this.dbController.close()
        return data
    }

    //agregue el método put para actualizar todos los campos de un registro
    //agregue patch para actualizar un campo específico
    //agregue delete para borrar un registro
}
export default ModelEmpleados
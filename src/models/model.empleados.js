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
        return({
            "success":true,
            "data":data,
            "error":null
        })
    }
    /**
     * 
     * @param {*} id entero que representa el id
     * @returns 
     */
    getNe(ne){
        const sql=`select * from empleados where numemp=?;`
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
     * Devuelve la lista de todos los usuarios
     * @returns objeto con la lista de datos
     */
    getAll(){
        const sql=`select * from empleados;`
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
    /**
     * Inserta un registro en users
     * @param {*} datos arreglo de parametros [name,username]
     * @returns 
     */
    insert(datos){
        const sql=`
        insert into empleados(
            numemp,nombre,edad,sexo,
            ct,correo,telefono,
            nss,puesto,fecha_ingreso_unacar,
            mes_ingreso_imss,dia_ingreso_imss
        ) 
        values(
            ?,?,?,?,
            ?,?,?,
            ?,?,?,
            ?,?
        )
        `
        // console.log("model.empleados(79) sql:",sql)
        // console.log("model.empleados(79) datos:",datos)
        const resp=this.dbController.open()
        if(!resp.dbOpen){
            // console.log("(83) model empleaods error:", resp.message)
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

    //agregue el método put para actualizar todos los campos de un registro
    /**
     * 
     * @param {*} datos [nombre,edad,correo,telefono,nss,puesto,
     * fecha_ingreso_unacar,mes_ingreso_imss,dia_ingreso_imss,numemp]
     * @returns data con la respuesta de la solicitud sql
     */
    put(datos){
        const sql=`
            update empleados set
            numemp=?,
            nombre=?,
            edad=?,
            ct=,
            correo=?,
            telefono=?,
            nss=?,
            puesto=?,
            fecha_ingreso_unacar=?,
            mes_ingreso_imss=?,
            dia_ingreso_imss=? 
            where numemp=? ;
        `
        // console.log("model.empleados(114) sql:",sql, "datos: ",datos)
        let resp=this.dbController.open()
        if(!resp.dbOpen){
            return({
                "success":false,
                "data":[],
                "error":resp.message
            })
        }
        resp = this.dbController.run(sql,datos)
        this.dbController.close()
        return(resp)
    }
    //agregue patch para actualizar un campo específico
    //agregue delete para borrar un registro
    //funciones para estadisticas
    getCount(sql){
        const resp=this.dbController.open()
        if(!resp.dbOpen){
            return({
                "success":false,
                "data":[],
                "error":resp.message
            })
        }
        const data = this.dbController.get(sql,[])
        this.dbController.close()
        return(data)

    }
    getEstadisticas(){
        const sqlG1=`SELECT count(*) as count
            FROM empleados
            WHERE fecha_ingreso_unacar <= '2003-09-18' ;
        `
        const sqlG2=`SELECT count(*) as count
            FROM empleados
            WHERE '2003-09-18' < fecha_ingreso_unacar;
        `
        const sqlM=`SELECT COUNT(*) as count
            FROM empleados 
            WHERE sexo = 'M';
        `
        const sqlF=`SELECT COUNT(*) as count
            FROM empleados 
            WHERE sexo = 'F';
        `
        const sqlTodos=`SELECT COUNT(*) as count
            FROM empleados;
        `
        const sqlDocentes=`SELECT count(*) as count
            FROM empleados 
            WHERE puesto like 'd%';
        `
        const sqlAdministrativos=`SELECT count(*) as count
            FROM empleados 
            WHERE puesto IN ('AAA', 'AA2', 'AAB', 'AAC','AAD','A01');
        `
        const sqlManuales=`SELECT count(*) as count
            FROM empleados 
            WHERE puesto IN ('AMB', 'AMC', 'ATA', 'ATB','ATC','ATD','A79');
        `
        try {
            // traer datos de la bd
            //sexo:[M,F]
            //generacion:[g1,g2]
            //segmento:[manuales,docetes,administrativos]
            const g1=this.getCount(sqlG1)
            const g2=this.getCount(sqlG2)
            const M=this.getCount(sqlM)
            const F=this.getCount(sqlF)
            const doc=this.getCount(sqlDocentes)
            const admin=this.getCount(sqlAdministrativos)
            const manu=this.getCount(sqlManuales)
            const dsexo=[M.data[0].count,F.data[0].count]
            const dgen=[g1.data[0].count,g2.data[0].count]
            const dseg=[manu.data[0].count,doc.data[0].count,admin.data[0].count]
            const data={
                sexo:dsexo,//[40,60],
                generacion:dgen,//[30,70],
                segmento:dseg//[30,30,40]
            }
            return({
                "success":true,
                "data":data,
                "message":"Ok",
                "error":""
            })
        } catch (error) {
            console.log("🚀 ~ :222 ~ ModelEmpleados ~ getEstadisticas ~ error:", error)
            return({
                "success":false,
                "data":null,
                "message":"No se pudieron obtener las estdísticas",
                "error":error
            })
        }
        
    }
}
export default ModelEmpleados
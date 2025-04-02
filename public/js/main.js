//pagina 35 cct
var tabuladorVigente=[
    {"clave":"d32","descripcion":"TC medio superior","sm":16807.18},
    {"clave":"d08","descripcion":"TC asociado","sm":16122.02},
    {"clave":"d09","descripcion":"TC asociado B","sm":18080.27},
    {"clave":"d33","descripcion":"TC asociado C","sm":21122.96},
    {"clave":"d34","descripcion":"TC titular A","sm":24411.88},
    {"clave":"d35","descripcion":"TC titular B","sm":28896.31},
    {"clave":"d36","descripcion":"TC titular C","sm":33878.04},
    {"clave":"d37","descripcion":"HSM NMSA","sm":249.03},
    {"clave":"d38","descripcion":"HSM NMSB","sm":285.99},
    {"clave":"d39","descripcion":"HSM NMSC","sm":329.36},
    {"clave":"d40","descripcion":"HSM NSA","sm":412.02},
    {"clave":"d41","descripcion":"HSM NSB","sm":468.56},
    {"clave":"d42","descripcion":"HSM NSC","sm":498.47},
    {"clave":"d43","descripcion":"INSTRUCTOR NA-D01","sm":235.84},
    {"clave":"d44","descripcion":"INSTRUCTOR NA-D02","sm":251.33},
    {"clave":"d45","descripcion":"INSTRUCTOR NA-D03","sm":258.89},
    {"clave":"d46","descripcion":"INSTRUCTOR NA-D04","sm":275.4},
    {"clave":"d47","descripcion":"INSTRUCTOR NA-D05","sm":313.45},
    {"clave":"d48","descripcion":"INSTRUCTOR NA-D06","sm":317.13},
    {"clave":"d49","descripcion":"INSTRUCTOR NA-D07","sm":333.01},
    {"clave":"d451","descripcion":"INSTRUCTOR NA-D09","sm":378.09},
    {"clave":"d453","descripcion":"INSTRUCTOR NA-D11","sm":427.05},
    {"clave":"AMB","descripcion":"MANUAL B","sm":4428.64},
    {"clave":"AMC","descripcion":"MANUAL C","sm":5133.23},
    {"clave":"ATA","descripcion":"TECNICO A","sm":5441.22},
    {"clave":"ATB","descripcion":"TECNICO B","sm":6469.88},
    {"clave":"ATC","descripcion":"TECNICO C","sm":7498.54},
    {"clave":"ATD","descripcion":"TECNICO D","sm":7598.96},
    {"clave":"A79","descripcion":"CABO DE OBRA","sm":11766.11},
    {"clave":"AAA","descripcion":"ADMINISTRATIVO F","sm":8247.37},
    {"clave":"AA2","descripcion":"ADMINISTRATIVO E","sm":8254.17},
    {"clave":"AAB","descripcion":"ADMINISTRATIVO D","sm":9805.44},
    {"clave":"AAC","descripcion":"ADMINISTRATIVO C","sm":11363.53},
    {"clave":"AAD","descripcion":"ADMINISTRATIVO B","sm":13268.71},
    {"clave":"A01","descripcion":"ADMINISTRATIVO A","sm":15586.48}
]

let datosEmpleado={
    numEmp:0,
    nombre:"",
    nss:0,
    plaza:"",
    fechaIngreso:"",
    fechaAltaImss:"",
    edadLaboral:0,
    generacion:0,
    modalidad:0,
    sm:0
}

let datosCalculo={
    "sb":0,
    "quinquenio":0,
    "arteydespensa":1088.00,
    "arte":288.84,
    "primavacacional":0,
    "estimulocalidad":0,
    "ajustecalendario":0,
    "porcentajegratxjubilacion":0,
    "totalsc":0,
    "edad":0,
    "antiguedad":0,
    "ley":73,
    "puesto":"sn",
    "edadLaboralObligatoria":25,
    "diferencia":0

}

/**
* Calcula una edad con base en una fecha dada
* @param {string} fecha
* @returns {number} edad
*/
function calcularEdad(inputFecha) {
    //
    const fechaNacimiento = new Date(inputFecha);
    const fechaActual = new Date();

    let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
    const mes = fechaActual.getMonth() - fechaNacimiento.getMonth();

    if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }
    
    return edad
}

/**
* Calculo del quinquenio.
* @param {string} tipoEmpleado
* @returns {object} {porcebtaje, monto}
*/
function calcularQuinquenio(tipoEmpleado){
    // 
    let porcentaje=0
    const primera_letra = tipoEmpleado.tipo[0]
    const tipo = primera_letra == 'A' ? "ADM" : "ACA"
    if(tipoEmpleado.antiguedad >= 5 ) {porcentaje = tipo == "ACA" ? 0.08 : 0.07}
    if(tipoEmpleado.antiguedad >= 10) {porcentaje = tipo == "ACA" ? 0.10 : 0.09}
    if(tipoEmpleado.antiguedad >= 15) {porcentaje = tipo == "ACA" ? 0.12 : 0.1}
    if(tipoEmpleado.antiguedad >= 20) {porcentaje = tipo == "ACA" ? 0.15 : 0.14}
    if(tipoEmpleado.antiguedad >= 25) {porcentaje = tipo == "ACA" ? 0.18 : 0.17}
    //
    const montoQuinquenio=tipoEmpleado.sb * porcentaje
    console.log("(95)sb",tipoEmpleado.sb)
    console.log("(96)% quinquenio",porcentaje)
    return {porcentaje,montoQuinquenio}
}

/**
* Prepara datos para el calculo del quinquenio.
* @param {object} datosEmpleado
* @returns {object} {porcebtaje, monto}
*/
function quinquenio(datosEmpleado){
    const tipo=datosEmpleado.plaza
    const antiguedad=datosEmpleado.edadLaboral
    const sb=datosEmpleado.sm
    const {porcentaje,montoQuinquenio}=calcularQuinquenio({tipo,antiguedad,sb})
    return {porcentaje,montoQuinquenio}
}

/**
* llena la tabla html con los datos del cálculo
* @param {datosCalculo} datosCalculo
* @returns {boolean} 
*/
function llenarDatosTabla(datosCalculo){
    document.querySelector("#tbl_puesto").innerHTML=datosCalculo.puesto
    const registro=tabuladorVigente.find(r => r.clave == datosCalculo.puesto)
    document.querySelector("#tbl_puesto").innerHTML=registro.descripcion
    const primera_letra = registro.clave[0]
    const categoria = primera_letra == 'A' ? "ADMINISTRATIVO" : "ACADEMICO"
    document.querySelector("#tbl_categoria").innerHTML=categoria
    // document.querySelector("#tbl_sb").innerHTML=datosCalculo.sb
    document.querySelector("#tbl_sb").innerHTML=datosCalculo.sb.toLocaleString('en-US')
    let redondeado=datosCalculo.quinquenio.toFixed(2)
    document.querySelector("#tbl_quinquenio").innerHTML=
        parseFloat(redondeado).toLocaleString("en-US")
    redondeado=datosCalculo.arteydespensa.toFixed(2)
    document.querySelector("#tbl_arteydespensa").innerHTML=
        parseFloat(redondeado).toFixed(2).toLocaleString("en-US")
    redondeado=datosCalculo.arte.toFixed(2)
    document.querySelector("#tbl_arte").innerHTML=
        parseFloat(redondeado).toFixed(2).toLocaleString("en-US")
    redondeado=datosCalculo.primavacacional.toFixed(2)
    document.querySelector("#tbl_primaVacacional").innerHTML=
        parseFloat(redondeado).toFixed(2).toLocaleString("en-US")
    redondeado=datosCalculo.estimulocalidad.toFixed(2)
    document.querySelector("#tbl_estimulocalidad").innerHTML=
        parseFloat(redondeado).toFixed(2).toLocaleString("en-US")
    redondeado=datosCalculo.ajustecalendario.toFixed(2)
    document.querySelector("#tbl_ajustecalendario").innerHTML=
        parseFloat(redondeado).toFixed(2).toLocaleString("en-US")
    redondeado=datosCalculo.totalsc.toFixed(2)
    document.querySelector("#tbl_totalsc").innerHTML=
        parseFloat(redondeado).toLocaleString("en-US")
    
    document.querySelector("#tbl_antiguedad").innerHTML=datosCalculo.antiguedad
    document.querySelector("#tbl_edad").innerHTML=datosCalculo.edad
    document.querySelector("#tbl_diferencia").innerHTML=datosCalculo.diferencia
    //
    document.querySelector("#tbl_edad_obligatoria").innerHTML=datosCalculo.edadLaboralObligatoria
    //

    return true
}

/**
* Calcula el total de ingresos quinquenio+ salario + arte
* Generación 2 contratados despues de 18/09/2003
* @param {object} datosEmpleado
* @returns {object} calculos de simulación
*/
function calcularTotalIngresos(datosEmpleado){
    //calcular quinquenio
    const {porcentaje,montoQuinquenio}=quinquenio(datosEmpleado)
    datosCalculo.sb=datosEmpleado.sm
    datosCalculo.quinquenio=montoQuinquenio
    datosCalculo.primavacacional=(datosCalculo.sb/30)*15
    datosCalculo.estimulocalidad=(datosCalculo.sb/30)*10
    datosCalculo.ajustecalendario=(datosCalculo.sb/30)*5
    datosCalculo.totalsc=datosCalculo.sb+datosCalculo.quinquenio+datosCalculo.arteydespensa
    datosCalculo.totalsc+=
        (datosCalculo.primavacacional+datosCalculo.estimulocalidad+datosCalculo.ajustecalendario/12)
    datosCalculo.antiguedad=datosEmpleado.edadLaboral
    
    llenarDatosTabla(datosCalculo)
    return datosCalculo
}

function limpiaTablas(){
    document.getElementById("leyimss").innerHTML=""
    document.getElementById("leyimss2").innerHTML=""
    document.getElementById("tbl_edad_retiro").innerHTML=""
    document.getElementById("tbl_edad_obligatoria").innerHTML=""
    document.getElementById("tbl2_edad_obligatoria").innerHTML=""
    document.getElementById("tbl2_edad_retiro").innerHTML=""
}

function calculoPrestaciones(datosCalculo){
    
    
    return datosCalculo
}

/**
* Calcula los datos de simulaacion de la generación 1.
* Generación 1 contratados antes de 18/09/2013
* @param {object} datosEmpleado
* @returns {object} calculos de simulación
*/
const calculoG1=(datosEmpleado)=>{
    if(datosEmpleado.edadLaboral>=25 && datosEmpleado.edad>=50){
        Swal.fire({
            title: "Generación 1!",
            text: "Usted cumple con la edad tendra jubilación al 100%!",
            icon: "success"
        });
        limpiaTablas()
        return null
    }
    let datosCalculo=calcularTotalIngresos(datosEmpleado)
    console.log("(230) datoscalculo:",datosCalculo)
    datosCalculo=calculoPrestaciones(datosCalculo)
    //edad laboral indistinta
    document.getElementById("leyimss").innerHTML="Ley 73"
    document.getElementById("leyimss2").innerHTML="Ley 73"
    document.getElementById("tbl_edad_retiro").innerHTML="Indistinta"
    document.getElementById("tbl_edad_obligatoria").innerHTML="25"
    document.getElementById("tbl2_edad_obligatoria").innerHTML="15"
    document.getElementById("tbl2_edad_retiro").innerHTML="50"
    return datosCalculo
}

/**
* Calcula los datos de simulaacion de la generación 2.
* Generación 2 contratados despues de 18/09/2003
* @param {object} datosEmpleado
* @returns {object} calculos de simulación
*/
const calculoG2=(datosEmpleado)=>{
    //
    let msg=""
    if(datosEmpleado.edad>=65 && datosEmpleado.edadLaboral>=15){
        msg="Jubilacion 100% retiro forzoso"
        Swal.fire({
                title: "Generación 2!",
                text: msg,
                icon: "question"
            });
    }else{
        Swal.fire({
                title: "Generación 2!",
                text: "No cumple la edad, Calcular pensión?",
                icon: "question"
            });
    }
    //calcular ingresos
    datosCalculo=calcularTotalIngresos(datosEmpleado)
    document.getElementById("leyimss").innerHTML="Ley 97"
    document.getElementById("leyimss2").innerHTML="Ley 97"
    return datosCalculo
}

/**
* Obtener generación (1/2 si fecha ingreso > "2003-09-18").
* @returns {number} generación (1/2)
*/
function calcularGeneracion(fechaIngreso){
    return (new Date(fechaIngreso) > new Date("2003-09-18")) ? 2 : 1
} 

/**
* Obtener modalidad (97/73).
* @returns {number} modalidad
*/
function calcularModalidad(fechaAltaImss){
    const fechaLimite=new Date("1997-06-30") //>30/06/97 es genaracion 2
    return (fechaAltaImss>fechaLimite) ? 97 : 73
}

function verificaCampos(){
    //verifica el NSS
    const ssn = document.getElementById("nss").value;
    const ssnRegex = /^[0-9]{11}$/;
    const test=ssnRegex.test(ssn)
    // console.log("Test:",test)
    if (!test) {
        //document.getElementById("mensaje-error").style.display = "none"; // Ocultar mensaje de error
        Swal.fire("Número de Seguro Social inválido!");
        return false
    }
    //document.getElementById("mensaje-error").style.display = "block"; // Mostrar mensaje de error

    return true
}
/**
* Obtener datos del formulario.
* @returns {object} datosEmpleado/null si datos incorrectos
*/
function obtenerDatosDeFormulario(){

    if(!verificaCampos()) return null
    const ssn = document.getElementById("nss").value;
    //filtrar el año de afiliación del trabajador
    const tmp = ssn.substring(2, 4);
    const anioAltaImss = tmp>50? "19" + tmp: "20" + tmp
    //cargar datos del empleado
    datosEmpleado.numEmp=document.getElementById("numEmp").value
    datosEmpleado.nombre=document.getElementById("nombre").value
    datosEmpleado.nss=document.getElementById("nss").value
    datosEmpleado.plaza=document.getElementById("tabulador").value
    datosEmpleado.fechaIngreso=document.getElementById("ingreso").value
    const mes=document.getElementById("mesIngresoIMSS").value
    const dia=document.getElementById("diaIngresoIMSS").value
    const cadfecha=anioAltaImss+"-"+mes+"-"+dia
    datosEmpleado.fechaAltaImss=new Date(cadfecha)
    datosEmpleado.modalidad = calcularModalidad(datosEmpleado.fechaAltaImss)
    datosEmpleado.generacion = calcularGeneracion(datosEmpleado.fechaIngreso)
    datosEmpleado.edad=document.getElementById("edad").value
    const edadLaboral = calcularEdad(datosEmpleado.fechaIngreso)
    datosEmpleado.edadLaboral=edadLaboral
    return datosEmpleado
}


/**
* Obtener el salario mensual.
* @param {string} puesto - El puesto del empleado
* @returns {number} salario mensual base
*/
function obtenerSm(puesto){
    const datoBuscado = tabuladorVigente.find(elemento => elemento.clave === puesto);
    return datoBuscado.sm
}

document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault()
    let datosEmpleado=obtenerDatosDeFormulario()
    if(datosEmpleado == null) return false
    console.log("(356) datos empleado:",datosEmpleado)
    const plaza=datosEmpleado.plaza
    datosEmpleado.sm=obtenerSm(plaza) //obtener el salario mensual base
    //preparar datos para el calculo
    datosCalculo.edad=datosEmpleado.edad
    datosCalculo.antiguedad=datosEmpleado.edadLaboral
    datosCalculo.ley=datosEmpleado.modalidad
    datosCalculo.puesto=datosEmpleado.plaza
    datosCalculo.edadLaboralObligatoria=(datosEmpleado.modalidad == "73") ? 25 : 30
    datosCalculo.diferencia =  datosCalculo.edadLaboralObligatoria - datosCalculo.antiguedad

    let resp
    if(datosEmpleado.generacion==1){
        resp=calculoG1(datosEmpleado)
        if(resp==null) return
        // console.log("Datos del calculo:", JSON.stringify(resp))
    }else{
        resp=calculoG2(datosEmpleado)
        if(resp==null) return
        // console.log("Datos del calculo:", JSON.stringify(resp))
    }
    return true
})

/**
 * LLena el combo box "tabulador" CCT pag 35
 */
function cargarDatosDeTabulador(){
    const combo=document.getElementById("tabulador")
    tabuladorVigente.forEach(item=>{
        const opcion=document.createElement("option");
        opcion.value=item.clave
        opcion.textContent=item.descripcion
        combo.appendChild(opcion)
    })
}

window.onload=function(){
    cargarDatosDeTabulador()
}
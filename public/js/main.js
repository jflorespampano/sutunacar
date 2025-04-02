var tabuladorVigente=[
    {"clave":"d32","descripcion":"TC medio superior","sm":16807.18},
    {"clave":"d08","descripcion":"TC asociado","sm":16122.02},
    {"clave":"d09","descripcion":"TC asociado B","sm":18080.27},
    {"clave":"d33","descripcion":"TC asociado C","sm":21122.96},
    {"clave":"d34","descripcion":"TC titular A","sm":24411.88},
    {"clave":"d35","descripcion":"TC titular B","sm":28896.31},
    {"clave":"d36","descripcion":"TC titular C","sm":33878.04},
    {"clave":"D37","descripcion":"HSM NMSA","sm":249.03},
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

/**
* Calcula una edad con base en una fecha dada
* @param {string} fecha
* @returns {number} edad
*/
function calcularEdad(inputFecha) {
// const inputFecha = document.getElementById("fechaNacimiento").value;
const fechaNacimiento = new Date(inputFecha);
const fechaActual = new Date();

let edad = fechaActual.getFullYear() - fechaNacimiento.getFullYear();
const mes = fechaActual.getMonth() - fechaNacimiento.getMonth();

if (mes < 0 || (mes === 0 && fechaActual.getDate() < fechaNacimiento.getDate())) {
    edad--;
}
console.log(`(56)Tu edad laboral es: ${edad}`)
return edad
}

/**
* Calculo del quinquenio.
* @param {string} tipoEmpleado
* @returns {object} {porcebtaje, monto}
*/
function calcularQuinquenio(tipoEmpleado){
console.log("(66) calcular quinquenio", tipoEmpleado)
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
console.log("sb",tipoEmpleado.sb)
console.log("%",porcentaje)
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
console.log("(90) sal mens:", datosEmpleado.sm)
const sb=datosEmpleado.sm
const {porcentaje,montoQuinquenio}=calcularQuinquenio({tipo,antiguedad,sb})
console.log("(93) monto quinquenio",montoQuinquenio)
return {porcentaje,montoQuinquenio}
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
}else{
    Swal.fire({
        title: "Generación 1!",
        text: "No cumple con la edad, Calculando jubilación?",
        icon: "question"
    });

}
//calcular quinquenio
const {porcentaje,montoQuinquenio}=quinquenio(datosEmpleado)
return 0
}


/**
* Calcula los datos de simulaacion de la generación 2.
* Generación 2 contratados despues de 18/09/2013
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
//calcular quinquenio
const {porcentaje,montoQuinquenio}=quinquenio(datosEmpleado)
return 0
}

/**
* Obtener generación (1/2).
* @returns {number} generación
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
console.log("Test:",test)
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

if(!verificaCampos()) return null
const ssn = document.getElementById("nss").value;
//filtrar el año de afiliación del trabajador
const tmp = ssn.substring(2, 4);
const anioAltaImss = tmp>50? "19" + tmp: "20" + tmp
// console.log("alta imss:",anioAltaImss)
//cargar datos del empleado
datosEmpleado.numEmp=document.getElementById("numEmp").value
datosEmpleado.nombre=document.getElementById("nombre").value
datosEmpleado.nss=document.getElementById("nss").value
datosEmpleado.plaza=document.getElementById("tabulador").value
// console.log("fecha de ingreso en html:",document.getElementById("ingreso").value)
datosEmpleado.fechaIngreso=document.getElementById("ingreso").value
const mes=document.getElementById("mesIngresoIMSS").value
const dia=document.getElementById("diaIngresoIMSS").value
const cadfecha=anioAltaImss+"-"+mes+"-"+dia
datosEmpleado.fechaAltaImss=new Date(cadfecha)

// const fechaLimite=new Date("1997-06-30") //>30/06/97 es genaracion 2
// datosEmpleado.modalidad = (datosEmpleado.fechaAltaImss>fechaLimite) ? 97 : 73

datosEmpleado.modalidad = calcularModalidad(datosEmpleado.fechaAltaImss)
// datosEmpleado.generacion = 
//     (new Date(datosEmpleado.fechaIngreso) > new Date("2003-09-18")) ? 2 : 1
datosEmpleado.generacion = calcularGeneracion(datosEmpleado.fechaIngreso)
datosEmpleado.edad=document.getElementById("edad").value
const edadLaboral = calcularEdad(datosEmpleado.fechaIngreso)
datosEmpleado.edadLaboral=edadLaboral
console.log("(223) Datos json:",JSON.stringify(datosEmpleado))
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
datosEmpleado.sm=obtenerSm("d36") //obtener el salario mensual base

if(datosEmpleado.generacion==1){
    calculoG1(datosEmpleado)
}else{
    calculoG2(datosEmpleado)
}
return true
})

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
//pagina 35 cct
var fijos={
    "despensa":1088.00,
    "arte":233.84
}

var tabuladorVigente=[
    {"clave":"d32","descripcion":"PTC medio superior","sm":16807.18},
    {"clave":"d08","descripcion":"PTC asociado","sm":16122.02},
    {"clave":"d09","descripcion":"PTC asociado B","sm":18080.27},
    {"clave":"d33","descripcion":"PTC asociado C","sm":21122.96},
    {"clave":"d34","descripcion":"PTC titular A","sm":29217.92},
    {"clave":"d35","descripcion":"PTC titular B","sm":28896.31},
    {"clave":"d36","descripcion":"PTC titular C","sm":33878.04},
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
    "despensa":1088.00,
    "arte":288.84,
    "primavacacional":0,
    "estimulocalidad":0,
    "ajustecalendario":0,
    "porcentajegratxjubilacion":0,
    "totalsc":0,
    "edad":0,
    "antiguedad":0,
    "ley":0,
    "puesto":"sn",
    "edadLaboralObligatoria":25,
    "diferencia":0,
    prepararDatosCalculo(datosEmpleado){
        this.edad=datosEmpleado.edad
        this.antiguedad=datosEmpleado.edadLaboral
        this.ley=datosEmpleado.modalidad
        this.puesto=datosEmpleado.plaza
        this.edadLaboralObligatoria=(datosEmpleado.modalidad == "73") ? 25 : 30
        this.diferencia =  datosCalculo.edadLaboralObligatoria - datosCalculo.antiguedad
        this.antiguedad=datosEmpleado.edadLaboral
    },
    gratificacionJubilacion:function(){
        //=(sb+quinquenio)*0.06
        // console.log("(84){sb,quinquenio}",this.sb,this.quinquenio)
        return (this.sb+this.quinquenio)*0.06
    },
    aguinaldo:function(){
        return this.sb
    },
    sbNosotros:function(sm){
        //SUMA(sb+quinquenio+despensa+arte)+(primaV+estimuloCalidad+ajusteCal)/12+gratXjuvilacion
        this.sb=sm
        const {montoQuinquenio}=quinquenio(datosEmpleado)
        this.quinquenio=montoQuinquenio
        this.despensa=fijos.despensa
        this.arte=fijos.arte
        this.primavacacional=0
        this.estimulocalidad=0
        this.ajustecalendario=0
        this.totalsc=
            (this.sb+this.quinquenio+this.despensa+this.arte)
            +
            (this.primavacacional+this.estimulocalidad+this.ajustecalendario)/12
            +this.gratificacionJubilacion()
        return this.totalsc

    },
    sbActual:function(sm){
        //SUMA(sb+quinquenio+despensa+arte)+(primaV+estimuloCalidad+ajusteCal)/12+gratXjuvilacion
        this.sb=sm
        const {montoQuinquenio}=quinquenio(datosEmpleado)
        this.quinquenio=montoQuinquenio
        this.despensa=fijos.despensa
        this.arte=fijos.arte
        this.primavacacional=(datosCalculo.sb/30)*15
        this.estimulocalidad=(datosCalculo.sb/30)*10
        this.ajustecalendario=(datosCalculo.sb/30)*5
        this.totalsc=
        (this.sb+this.quinquenio+this.despensa+this.arte)
        +
        (this.primavacacional+this.estimulocalidad+this.ajustecalendario)/12
        + 0
        return this.totalsc
    },
    sbG1:function(sm){
        //SUMA(sb+quinquenio+despensa+arte)+(primaV+estimuloCalidad+ajusteCal+aguinaldo)/12
        this.sb=sm
        const {montoQuinquenio}=quinquenio(datosEmpleado)
        this.quinquenio=montoQuinquenio
        this.despensa=fijos.despensa
        this.arte=fijos.arte
        this.primavacacional=(datosCalculo.sb/30)*15
        this.estimulocalidad=(datosCalculo.sb/30)*10
        this.ajustecalendario=(datosCalculo.sb/30)*5
        this.totalsc=
            (this.sb+this.quinquenio+this.despensa+this.arte)
            +
            (this.primavacacional+this.estimulocalidad+this.ajustecalendario+this.aguinaldo())/12
        //
        return this.totalsc
    },
    sbG2:function(sm){
        //SUMA(sb+quinquenio+despensa+arte)+(primaV+estimuloCalidad+ajusteCal+aguinaldo)/12
        this.sb=sm
        const {montoQuinquenio}=quinquenio(datosEmpleado)
        this.quinquenio=montoQuinquenio
        this.despensa=fijos.despensa
        this.arte=fijos.arte
        this.primavacacional=(datosCalculo.sb/30)*15
        this.estimulocalidad=(datosCalculo.sb/30)*10
        this.ajustecalendario=(datosCalculo.sb/30)*5
        this.totalsc=
            (this.sb+this.quinquenio+this.despensa+this.arte)
            +
            (this.primavacacional+this.estimulocalidad+this.ajustecalendario+this.aguinaldo())/12
        //
        return this.totalsc
    },
    aguinaldoJubilado:function(dias){
        return (this.sbNosotros(datosEmpleado.sm)/30)*dias
    }

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
    // console.log("(95)sb",tipoEmpleado.sb)
    // console.log("(96)% quinquenio",porcentaje)
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

function formateaNumero(numero){
    let tmp=numero.toFixed(2)
    return parseFloat(tmp).toLocaleString('en-US')
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
    document.querySelector("#tbl_antiguedad").innerHTML=datosCalculo.antiguedad
    document.querySelector("#tbl_edad").innerHTML=datosCalculo.edad
    document.querySelector("#tbl_diferencia").innerHTML=datosCalculo.diferencia
    document.querySelector("#tbl_edad_obligatoria").innerHTML=datosCalculo.edadLaboralObligatoria
    return true
}

function llenarTablaSBActual(datosCalculo,totalsc){
    document.querySelector("#tbl_sbA").innerHTML=datosCalculo.sb.toLocaleString('en-US')
    document.querySelector("#tbl_quinquenioA").innerHTML=formateaNumero(datosCalculo.quinquenio)
    document.querySelector("#tbl_despensaA").innerHTML=formateaNumero(datosCalculo.despensa)
    document.querySelector("#tbl_arteA").innerHTML=formateaNumero(datosCalculo.arte)
    document.querySelector("#tbl_primaVacacionalA").innerHTML=formateaNumero(datosCalculo.primavacacional)
    document.querySelector("#tbl_estimulocalidadA").innerHTML=formateaNumero(datosCalculo.estimulocalidad)
    document.querySelector("#tbl_ajustecalendarioA").innerHTML=formateaNumero(datosCalculo.ajustecalendario)
    document.querySelector("#tbl_totalscA").innerHTML=formateaNumero(totalsc)
}

function llenarTablaSBNosotros(datosCalculo,totalsc){
    document.querySelector("#tbl_sbN").innerHTML=datosCalculo.sb.toLocaleString('en-US')
    document.querySelector("#tbl_quinquenioN").innerHTML=formateaNumero(datosCalculo.quinquenio)
    document.querySelector("#tbl_despensaN").innerHTML=formateaNumero(datosCalculo.despensa)
    document.querySelector("#tbl_arteN").innerHTML=formateaNumero(datosCalculo.arte)
    document.querySelector("#tbl_primaVacacionalN").innerHTML=formateaNumero(datosCalculo.primavacacional)
    document.querySelector("#tbl_estimulocalidadN").innerHTML=formateaNumero(datosCalculo.estimulocalidad)
    document.querySelector("#tbl_ajustecalendarioN").innerHTML=formateaNumero(datosCalculo.ajustecalendario)
    document.querySelector("#tbl_gratificacionJubilacionN").innerHTML=formateaNumero(datosCalculo.gratificacionJubilacion())
    document.querySelector("#tbl_totalscN").innerHTML=formateaNumero(totalsc)
}

function llenarTablaSBG1(datosCalculo,totalsc){
    document.querySelector("#tbl_sbG").innerHTML=datosCalculo.sb.toLocaleString('en-US')
    document.querySelector("#tbl_quinquenioG").innerHTML=formateaNumero(datosCalculo.quinquenio)
    document.querySelector("#tbl_despensaG").innerHTML=formateaNumero(datosCalculo.despensa)
    document.querySelector("#tbl_arteG").innerHTML=formateaNumero(datosCalculo.arte)
    document.querySelector("#tbl_primaVacacionalG").innerHTML=formateaNumero(datosCalculo.primavacacional)
    document.querySelector("#tbl_estimulocalidadG").innerHTML=formateaNumero(datosCalculo.estimulocalidad)
    document.querySelector("#tbl_ajustecalendarioG").innerHTML=formateaNumero(datosCalculo.ajustecalendario)
    document.querySelector("#tbl_aguinaldoG").innerHTML=formateaNumero(datosCalculo.aguinaldo())
    document.querySelector("#tbl_totalscG").innerHTML=formateaNumero(totalsc)
    document.getElementById("generacion").innerHTML="G("+datosEmpleado.generacion+")"
}


/**
* Mostrar datos en las tablas de interfaz 
* 
* @param {number} sm salario mensual
* @returns {object} calculos de simulación
*/
function mostrarDatosEnTablas(sm){
    llenarDatosTabla(datosCalculo)
    let totalsc=datosCalculo.sbNosotros(sm)
    llenarTablaSBNosotros(datosCalculo,totalsc)
    totalsc=datosCalculo.sbActual(sm)
    llenarTablaSBActual(datosCalculo,totalsc)
    totalsc=datosCalculo.sbG1(sm)
    llenarTablaSBG1(datosCalculo,totalsc)

    //llenar datos aguinaldo de jubilacion
    let x=formateaNumero(datosCalculo.aguinaldoJubilado(40))
    document.getElementById("Aguinaldo_jubilado_actual").innerHTML=x
    x=formateaNumero(datosCalculo.aguinaldoJubilado(30))
    document.getElementById("Aguinaldo_jubilado_reforma").innerHTML=x
    return true
}

function limpiaTablas(){
    document.getElementById("tbl_puesto").innerHTML=""
    document.getElementById("tbl_categoria").innerHTML=""
    document.getElementById("tbl_antiguedad").innerHTML=""
    document.getElementById("tbl_edad").innerHTML=""
    document.getElementById("tbl_diferencia").innerHTML=""
    document.getElementById("leyimss").innerHTML=""
    document.getElementById("leyimss2").innerHTML=""
    document.getElementById("tbl_edad_retiro").innerHTML=""
    document.getElementById("tbl_edad_obligatoria").innerHTML=""
    document.getElementById("tbl2_edad_obligatoria").innerHTML=""
    document.getElementById("tbl2_edad_retiro").innerHTML=""

    document.querySelector("#tbl_sbA").innerHTML=""
    document.querySelector("#tbl_quinquenioA").innerHTML=""
    document.querySelector("#tbl_despensaA").innerHTML=""
    document.querySelector("#tbl_arteA").innerHTML=""
    document.querySelector("#tbl_primaVacacionalA").innerHTML=""
    document.querySelector("#tbl_estimulocalidadA").innerHTML=""
    document.querySelector("#tbl_ajustecalendarioA").innerHTML=""
    document.querySelector("#tbl_gratificacionJubilacionA").innerHTML=""
    document.querySelector("#tbl_aguinaldoA").innerHTML=""
    document.querySelector("#tbl_totalscA").innerHTML=""

    document.querySelector("#tbl_sbN").innerHTML=""
    document.querySelector("#tbl_quinquenioN").innerHTML=""
    document.querySelector("#tbl_despensaN").innerHTML=""
    document.querySelector("#tbl_arteN").innerHTML=""
    document.querySelector("#tbl_primaVacacionalN").innerHTML=""
    document.querySelector("#tbl_estimulocalidadN").innerHTML=""
    document.querySelector("#tbl_ajustecalendarioN").innerHTML=""
    document.querySelector("#tbl_gratificacionJubilacionN").innerHTML=""
    document.querySelector("#tbl_aguinaldoN").innerHTML=""
    document.querySelector("#tbl_totalscN").innerHTML=""

    document.querySelector("#tbl_sbG").innerHTML=""
    document.querySelector("#tbl_quinquenioG").innerHTML=""
    document.querySelector("#tbl_despensaG").innerHTML=""
    document.querySelector("#tbl_arteG").innerHTML=""
    document.querySelector("#tbl_primaVacacionalG").innerHTML=""
    document.querySelector("#tbl_estimulocalidadG").innerHTML=""
    document.querySelector("#tbl_ajustecalendarioG").innerHTML=""
    document.querySelector("#tbl_gratificacionJubilacionG").innerHTML=""
    document.querySelector("#tbl_aguinaldoG").innerHTML=""
    document.querySelector("#tbl_totalscG").innerHTML=""
}

function mostrarDatosGenerales(){
    //mostrar datos generales
    document.getElementById("leyimss").innerHTML="Ley 73 G("+datosEmpleado.generacion+")"
    document.getElementById("leyimss2").innerHTML="Ley 73 G("+datosEmpleado.generacion+")"
    document.getElementById("tbl_edad_retiro").innerHTML="Indistinta"
    document.getElementById("tbl_edad_obligatoria").innerHTML="25"
    document.getElementById("tbl2_edad_obligatoria").innerHTML="15"
    document.getElementById("tbl2_edad_retiro").innerHTML="50"
    const axts=15-datosCalculo.antiguedad
    const axtc=25-datosCalculo.edad
    document.getElementById("tbl2_diferencia").innerHTML=axts > axtc ? axts:axtc
}

/**
* Calcula los datos de simulacion
* Generación 1 contratados antes de 18/09/2013
* Generacion 2 despues de 18/09/2013
* @param {object} datosEmpleado
* @returns {object} calculos de simulación
*/
const calculoSimulacion=(datosEmpleado)=>{
    if(datosEmpleado.edadLaboral>=25 && datosEmpleado.edad>=50){
        Swal.fire({
            title: "Generación 1!",
            text: "Usted cumple con la edad tendra jubilación al 100%!",
            icon: "success"
        });
        limpiaTablas()
        return false
    }
    mostrarDatosEnTablas(datosEmpleado.sm)
    console.log("(383) datoscalculo:",datosCalculo)

    mostrarDatosGenerales()
    return true 
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
    let dato=document.querySelector("#correo").value.trim()
    if(dato==="") document.querySelector("#correo").value="sd"
    dato=document.querySelector("#telefono").value.trim()
    if(dato==="") document.querySelector("#telefono").value="sd"
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

/**
 * Busca empleado en la base, si lo encuentra carga sus datos en el formulario
 */
document.getElementById("btnBuscaEmpleado").addEventListener("click", function(event) {
    event.preventDefault()
    const numEmp=document.querySelector("#numEmp").value.trim()
    
    if (numEmp === "") {
        console.log("El campo de texto está vacío.");
        return false
    }
    //buscar dato en la bd
    fetch(`socios/one/${numEmp}`)
    .then(data=>{
        // console.log("resp==>",data)
        if(!data.ok) return Promise.reject("Respuesta falliad del servidor")
        return data.json()
    })
    .then(data=>{
        // console.log("**respuesta json:",data.data)
        if(data.success && data.data.length>0){
            // console.log("recibi al buscar:",data)
            const datos=data.data[0]
            //cargar datos en formulario
            document.querySelector("#nombre").value=datos.nombre
            document.querySelector("#edad").value=datos.edad
            document.querySelector("#correo").value=datos.correo
            document.querySelector("#telefono").value=datos.telefono
            document.querySelector("#nss").value=datos.nss
            
            let option=datos.puesto
            let select = document.getElementById("tabulador");
            for (let i = 0; i < select.options.length; i++) {
                if (select.options[i].value === option) {
                    select.options[i].selected = true;
                    break;
                }
            }
            document.querySelector("#ingreso").value=datos.fecha_ingreso_unacar
            option=datos.mes_ingreso_imss
            select = document.getElementById("mesIngresoIMSS");
            for (let i = 0; i < select.options.length; i++) {
                if (select.options[i].value === option) {
                    select.options[i].selected = true;
                    break;
                }
            }
            document.querySelector("#diaIngresoIMSS").value=datos.dia_ingreso_imss
            const input = document.getElementById('numEmp');
            input.style.backgroundColor = 'lightgreen';
            // Swal.fire("Datos cargados");
        }else{
            Swal.fire("No esta, favor de cargar datos");
            const input = document.getElementById('numEmp');
            input.style.backgroundColor = '#FFC0CB';
        }
    })
    .catch(resp=>{
        Swal.fire(resp);
    })
})

/**
 * Guarda datos del empleado en la base
 */
document.getElementById("btnGuardarDatos").addEventListener("click", function(event) {
    event.preventDefault()
    if(!verificaCampos()){
        Swal.fire(data.message)
        return false
    }
    const f=document.querySelector("#formulario")
    const df=new FormData(f)
    const fjson=Object.fromEntries(df)
    // console.log("(397) formulario:",fjson)
    fetch('socios/add',{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(fjson)
    })
    .then(data=>{
        if(!data.ok) return Promise.reject("Respuesta falliad del servidor")
        return data.json()
    })
    .then(data=>{
        // console.log("respuesta serv:",data)
        if(data.success){
            Swal.fire(data.message);
        }else{
            Swal.fire("no success");
        }
    })
    .catch(resp=>{
        Swal.fire(resp);
    })
})

document.getElementById("menu_ayuda").addEventListener("click", function(event) {
    event.preventDefault()
    Swal.fire({
        imageUrl: "images/imagenSindicato1.jpg",
        imageHeight: 300,
        imageWidth: 350,
        imageAlt: "Ayuda"
    });
})

/**
 * Prepara datos y calcula simulación
 */
document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault()
    let datosEmpleado=obtenerDatosDeFormulario()
    if(datosEmpleado == null) return false
    console.log("(581) datos empleado:",datosEmpleado)
    datosEmpleado.sm=obtenerSm(datosEmpleado.plaza) //obtener el salario mensual base
    //preparar datos para el calculo
    datosCalculo.prepararDatosCalculo(datosEmpleado)
    const resp=calculoSimulacion(datosEmpleado)
    return resp
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
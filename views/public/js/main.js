// const URLsocios="http://localhost:3000/socios"
const URLsocios = "socios"
const URLgetTabulador = "/tabulador/all"
const URLgetCt = "/ct/all"

var fijos={
    "despensa":1088.00,
    "arte":233.84
}

//pagina 35 cct
var tabuladorVigente=[]
var centroDeTrabajo=[]

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
    "arte":233.84,
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

//-----------------> para biblioteca ------------------------->
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
 * Pone comas de miles
 * @param {*} numero 
 * @returns 
 */
function formateaNumero(numero){
    let tmp=numero.toFixed(2)
    return parseFloat(tmp).toLocaleString('en-US')
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
 * 
 * @param {*} URLgetTabulador 
 * @returns 
 */
function cargadDatosDelServer(URLgetTabulador){
    return fetch(`${URLgetTabulador}`)
    .then(resp=>{
        if(!resp.success){
            throw new Error(`Error ${resp.status}: ${resp.statusText}`)
        }
        return resp.json()
    })
    .then(data=>{
        return data
    })
    .catch(error=>{
        console.log(error)
        return new Promise((_,reject)=>{
            reject("Error al leer la bd ")
        })
    })
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
    const fechaLimite=new Date("1997-06-01") //>30/06/97 es genaracion 2
    return (fechaAltaImss>fechaLimite) ? 97 : 73
}

function verificaCampoNumerico(valor){
    // Verificar si el campo está vacío
    if (edad === "") {
        return false
      }
      // Verificar si es un número válido y mayor que 0
      else if (isNaN(valor) || Number(valor) <= 0) {
        return false
      }
      // Si cumple las validaciones
      else {
        return true
      }
}
function verificaCampoFecha(fecha){
    // Verificar si el campo está vacío
    if (fecha === "") {
        return false
    } 
    // Verificar si la fecha es válida y opcionalmente dentro de un rango
    //   else {
    //     const fechaSeleccionada = new Date(fecha);
    //     const fechaMinima = new Date("2025-01-01");
    //     const fechaMaxima = new Date("2025-12-31");
  
    //     if (fechaSeleccionada < fechaMinima || fechaSeleccionada > fechaMaxima) {
    //       document.getElementById("mensaje").innerText = "La fecha debe estar entre el 1 de enero y el 31 de diciembre de 2025.";
    //     } else {
    //       document.getElementById("mensaje").innerText = `Has seleccionado: ${fecha}`;
    //     }
    //   }
    return true
}
//-----------------> fin de para biblioteca ------------------------->

// Función para establecer el género seleccionado
/**
 * Establece el genero en el rsio button
 * @param {*} name name del control
 * @param {*} value valor
 */
function establecerGenero(name,value) {
    const s=`input[name="${name}"][value="${value}"]`
    const radio = document.querySelector(s);
    // console.log("🚀 ~ establecerGenero ~ s:", s)
    if (radio) {
        radio.checked = true;
        // console.log(`Género establecido a: ${value}`);
    } else {
        console.error(`Opción de género no encontrada: ${value}`);
    }
}

function activaOpcionEnSelect(combo,option){
    let select = document.getElementById(combo);
    for (let i = 0; i < select.options.length; i++) {
        if (select.options[i].value === option) {
            select.options[i].selected = true;
            break;
        }
    }
}

/**
 * 
 * @param {*} nombreDelCombo combo a poblar
 * @param {*} arreglo arreglo json con campos clave y descripcion
 */
function pueblaSelect(nombreDelCombo,arreglo){
    const combo=document.getElementById(nombreDelCombo)
    arreglo.forEach(item=>{
        const opcion=document.createElement("option");
        opcion.value=item.clave
        opcion.textContent=item.descripcion
        combo.appendChild(opcion)
    })
}

function limpiaControles(){
    document.getElementById("nombre").value=""
    document.getElementById("edad").value=0
    document.getElementById("nss").value=""
    document.querySelector("#correo").value=""
    document.querySelector("#telefono").value=""
}

function verificaCampos(){
    const numEmp = document.getElementById("numEmp").value.trim();
    if(!verificaCampoNumerico(numEmp)){
        Swal.fire("Número de empleado incorrecto!");
        return false
    }
    const nombre = document.getElementById("nombre").value.trim();
    if (nombre === "") {
        Swal.fire("Nombre incorrecto.")
        return false
    }
    const edad = document.getElementById("edad").value.trim();
    if(!verificaCampoNumerico(edad)){
        Swal.fire("Edad incorrecta!");
        return false
    }
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
    
    fechaIngreso=document.querySelector("#ingreso")
    if(!verificaCampoFecha(fechaIngreso)){
        Swal.fire("Fecha de ingreso incorrecta!");
        return false
    }
    let dato=document.querySelector("#correo").value.trim()
    if(dato==="") document.querySelector("#correo").value="sd"
    dato=document.querySelector("#telefono").value.trim()
    if(dato==="") document.querySelector("#telefono").value="sd"
    return true
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

/**
 * LLena la columna Actual
 * @param {*} datosCalculo 
 * @param {*} totalsc salario de cotizacion para el cálculo actual
 */
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

/**
 * LLena la columna como pensmos debe ser el cálculo
 * @param {*} datosCalculo 
 * @param {*} totalsc salario de cotizacion para la columna como debe hacerse el cálulo
 */
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

/**
 * LLena la columna G1
 * @param {*} datosCalculo 
 * @param {*} totalsc salario de cotizacion para G1
 */
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

/**
 * mostrar datos generales en la tabla datos generales
 */
function mostrarDatosGenerales(){
    let axts, axtc, edadCronologicaRetiro, edadLaboralObligatoria, diferencia
    const leyImss=calcularModalidad(new Date(datosEmpleado.fechaAltaImss))
    if(leyImss===97){
        axts=30-datosCalculo.antiguedad
        axtc=65-datosCalculo.edad
        edadCronologicaRetiro=65
        edadLaboralObligatoria=30
        if(axtc===0){
            diferencia=0
        }else{
            diferencia=axts > axtc ? axts:axtc
        }
    }else{
        axts=15-datosCalculo.antiguedad
        axtc=25-datosCalculo.edad
        edadCronologicaRetiro="Indistinta"
        edadLaboralObligatoria=25
    }
    document.getElementById("leyimss").innerHTML="Ley "+leyImss+" G("+datosEmpleado.generacion+")"
    document.getElementById("leyimss2").innerHTML="Ley "+leyImss+" G("+datosEmpleado.generacion+")"
    document.getElementById("tbl_edad_retiro").innerHTML=edadCronologicaRetiro
    document.getElementById("tbl_edad_obligatoria").innerHTML=edadLaboralObligatoria
    document.getElementById("tbl2_edad_obligatoria").innerHTML=edadLaboralObligatoria
    document.getElementById("tbl2_edad_retiro").innerHTML="50"
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
    mostrarDatosGenerales()
    console.log("(359) datoscalculo:",datosCalculo)
    if(datosEmpleado.generacion===2){
        if(datosEmpleado.edad>=60){
            if(datosEmpleado.edad>=65 && datosEmpleado.edadLaboral>=15){
                Swal.fire({
                    title: `Generación ${datosEmpleado.generacion} modalidad ${datosEmpleado.modalidad}!`,
                    text: "jubilación retiro forzoso !",
                    icon: "success"
                });
                // limpiaTablas()
                mostrarDatosEnTablas(datosEmpleado.sm)
            }else{
                //calcular pension
                mostrarDatosEnTablas(datosEmpleado.sm)
            }
        }else{
            Swal.fire({
                title: `Generación ${datosEmpleado.generacion} modalidad ${datosEmpleado.modalidad}!`,
                text: "De acuerdo al CCT aun no es posible jubilarse !",
                icon: "success"
            });
            limpiaTablas()
        }
    }else if(datosEmpleado.generacion===1){
        if(datosEmpleado.edad>=50 && datosEmpleado.edadLaboral>=25){
            Swal.fire({
                title: `Generación ${datosEmpleado.generacion} modalidad ${datosEmpleado.modalidad}!`,
                text: "jubilación al 100% !",
                icon: "success"
            });
            // limpiaTablas()
            mostrarDatosEnTablas(datosEmpleado.sm)
        }else{
            if(datosEmpleado.edad>=50 && datosEmpleado.edadLaboral>=15){
                //calcular jubilacion
                mostrarDatosEnTablas(datosEmpleado.sm)
            }else{
                // caso especial
                Swal.fire({
                    title: `Generación ${datosEmpleado.generacion} modalidad ${datosEmpleado.modalidad}!`,
                    text: "Caso especial !",
                    icon: "success"
                });
                limpiaTablas()
            }
        }
    }
    return  
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
    const datoBuscado = tabuladorVigente.find(elemento => elemento.clave === puesto)
    return datoBuscado.sm
}

/**
 * Busca empleado en la base, si lo encuentra carga sus datos en el formulario
 */
document.getElementById("btnBuscaEmpleado").addEventListener("click", function(event) {
    event.preventDefault()
    const numEmp=document.querySelector("#numEmp").value.trim()
    
    if (numEmp === "") {
        Swal.fire("El campo número de empleado no debe  estar vacío.");
        return false
    }
    //buscar dato en la bd
    fetch(`${URLsocios}/one/${numEmp}`)
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
            activaOpcionEnSelect("tabulador",option)

            option=datos.ct
            activaOpcionEnSelect("ct",option)

            const sexo=datos.sexo
            establecerGenero("sexo",sexo)

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
            limpiaControles()
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
        return false
    }
    const f=document.querySelector("#formulario")
    const df=new FormData(f)
    const fjson=Object.fromEntries(df)
    console.log("(634) formulario:",fjson)
    // console.log("(635) lamado a:",`${URLsocios}/add`)
    fetch(`${URLsocios}/add`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(fjson)
    })
    .then(data=>{
        // console.log(`resp en add: ${URLsocios}/add:`,data)
        if(!data.ok) return Promise.reject("Respuesta fallida del servidor")
        return data.json()
    })
    .then(data=>{
        console.log("respuesta serv al dar de alta:",data)
        if(data.success){
            if(data.success){Swal.fire(data.message);}
            else{Swal.fire(data.message);}
        }else{
            Swal.fire(data.message+","+data.error);
        }
    })
    .catch(err=>{
        Swal.fire("Error(712):"+err.message);
    })
})

/**
 * Prepara datos y calcula simulación
 */
document.getElementById("formulario").addEventListener("submit", function(event) {
    event.preventDefault()
    let datosEmpleado=obtenerDatosDeFormulario()
    if(datosEmpleado == null) return false
    console.log("(603) datos empleado:",datosEmpleado)
    datosEmpleado.sm=obtenerSm(datosEmpleado.plaza) //obtener el salario mensual base
    //preparar datos para el calculo
    datosCalculo.prepararDatosCalculo(datosEmpleado)
    //calcula los resultados de la simulación
    calculoSimulacion(datosEmpleado)
    return
})



/**
 * LLena el combo box "tabulador" ver CCT pag 35
 */
function cargarDatosDeTabulador(){
    cargadDatosDelServer(URLgetTabulador)
    .then(datos=>{
        console.log("recibi datos tab:", datos)
        if(!datos.success){
            throw new Error(datos.message)
        }
        tabuladorVigente=datos.data
        const nombreDelCombo="tabulador"
        pueblaSelect(nombreDelCombo,tabuladorVigente)

    })
    .catch(error=>{
        console.log("Al tratar de leer el tabulador de la bd:",error)
        Swal.fire("No se pudieron leer datos de la BD "+error.message);
    })
}

/**
 * LLena el combo box ct (centro de trabajo)
 */
function cargarDatosDelCT(){
    cargadDatosDelServer(URLgetCt)
    .then(datos=>{
        // console.log("recibi datos ct:", datos)
        console.log("recibi datos CT:", datos)
        if(!datos.success){
            throw new Error(datos.message)
        }
        centroDeTrabajo=datos.data
        nombreDelCombo="ct"
        pueblaSelect(nombreDelCombo,centroDeTrabajo)

    })
    .catch(error=>{
        console.log("Al tratar de leer el centro de trabajo del server:",error)
        Swal.fire("No se pudieron leer datos de la BD "+error.message);
    })
}

window.onload=function(){
    cargarDatosDeTabulador()
    cargarDatosDelCT()
}
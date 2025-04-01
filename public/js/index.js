const url = 'tipoPartes';
    function verificaId() {
        const id = document.getElementById("id").value;
        if (!id) {
            // alert("debe indicar el id del dato");
            Swal.fire('debe indicar el id del dato');
            return false;
        };
        return true;
    }

    /**
     * Verifica que los datos del formulario sean correctos
     * */
    function verificaForm() {
        const id = document.getElementById("id").value;
        if (!id) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Debe indicar el id del dato!",
                footer: '<a href="#">Cual es el problema?</a>'
            });
            // alert("debe indicar el id del dato");
            return false;
        };
        if (document.getElementById("descripcion").value.length < 5) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "La descripcion debe ser mayor a 5 caracteres!",
                footer: '<a href="#">Cual es el problema?</a>'
            });
            // alert("La descripcion debe ser mayor a 5 caracteres");
            return false;
        }
        return true;
    }

    function acercaDe(evt) {
        evt.preventDefault();
        m = `Aplicacion sobre node, frontend usa: [w3css, sweetalert2]. El backend programado en node,el front end hace las solicitudes usando fetch`;
        Swal.fire(m);
    }
    
    /**
     * actualiza dato enviando el formulario miformulario
     * */
    function actualizaForm(evt) {
        evt.preventDefault();
        const localUrl=url
        if (!verificaForm()) {
            return;
        };
        //obtenemos los datos del formulario
        const data = new FormData(document.getElementById('miformulario'));
        fetch(localUrl, {
            method: 'put',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(data)
        })
        .then(function (response) {
            if (response.ok) {
                response.text().then(resp => {
                    console.log(resp);
                    llenaTabla();
                    Swal.fire('Dato actualizado');
                });
            } else {
                Swal.fire('No se pudo actualizar');
                console.log("no se pudieron actualizar los datos")
            }
        })
        .catch(function (err) {
            console.log("Error...");
            console.error(err);
        });
    }
    
    /**
     * inserta dato enviando un formulario
     * */
    function enviarForm(evt) {
        evt.preventDefault();
        const localUrl=url
        if (!verificaForm()) {
            return;
        }
        //obtenemos los datos del formulario
        const data = new FormData(document.getElementById('miformulario'));
        fetch(localUrl, {
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(data)
        })
        .then(function (response) {
            if (response.ok) {
                response.text().then(resp => {
                    console.log(resp);
                    llenaTabla();
                    Swal.fire('Dato insertado');
                });
            } else {
                Swal.fire('no se pudo insertar el dato');
                console.log("no se pudieron insertar el dato")
            }
        })
        .catch(function (err) {
            console.log("Error...");
            console.error(err);
        });
    }
    
    /**
     * inserta dato enviando un json 
     * */
    function enviarJson(evt) {
        evt.preventDefault();
        const localUrl=url
        if (!verificaForm()) {
            return;
        }
        //obtenemos los datos del formulario
        const data = new FormData(document.getElementById('miformulario'));
        const obj = Object.fromEntries(data);
        // console.log(JSON.stringify(obj));
        fetch(localUrl, {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(obj)
        })
        .then(function (response) {
            if (response.ok) {
                response.text().then(resp => {
                    console.log(resp);
                    llenaTabla();
                    Swal.fire('Dato insertado');
                })
            } else {
                Swal.fire('no se pudo insertar el dato');
                console.log("no se pudo insertar el dato")
            }
        })
        .catch(function (err) {
            console.log("Error...");
            console.error(err);
        });
    }

    /** 
     * busca un dato
     * */
    function buscaDato(dab) {
        let parametros = `?id=${dab}`;
        const localUrl=url+'/one'+parametros
        //var request = new Request('prueba.php?movimiento=1&id=1&nombre=luisa&apellido=rosales&edad=4', 
        let request = new Request(localUrl,
            {
                method: 'get',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
        fetch(request).then(function (returnedValue) {
            if (returnedValue.ok) {
                returnedValue.json()
                .then((data) => {
                    console.log("data:",data)
                    if (data.length === 0) {
                        Swal.fire('No existe el dato');
                        // ponMensaje('No existe el dato', 3);
                    } else {
                        let s = '';
                        s += `
                                <tr>
                                    <td>${data.id}</td>
                                    <td>${data.descripcion}</td>
                                </tr>
                            `;
                        document.querySelector('#datosTabla').innerHTML = s;
                    }
                });
            } else {
                Swal.fire('no se pudo recuperar el dato');
                console.log("no se pudo recuperar el dato")
            }
        }).catch(function (err) {
            console.log(err);
        });
    }
    //
    function buscarUno(dab) {
        if (!dab) {
            alert('No indico el dato a buscar dato');
        } else {
            // alert(dab);
            buscaDato(dab)
        }
        let msj = document.querySelector('#mensaje');
        msj.innerHTML = '';

    }
    //function leedatos a buscar
    async function datoAbuscar(evt) {
        evt.preventDefault();
        //
        
        const inputValue = '0'
        const { value: valorID } = await Swal.fire({
        title: "Id a buscar:",
        input: "text",
        inputLabel: "Dato a buscar",
        inputValue,
        showCancelButton: true,
        inputValidator: (value) => {
            if (!value) {
            return "Necesita escribir el id a buscar!";
            }
        }
        });
        if (valorID) {
            let datoAbuscar=isNaN(valorID)?0:parseInt(valorID, 10)
            // Swal.fire(`Su dato a buscar es: ${datoAbuscar}`);
            buscarUno(datoAbuscar)
        }

    }

    /**
     * leer todos los datos
     * */
    function llenaTabla() {
        const localUrl=url+'/all'
        fetch(localUrl, {
            method: 'get',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .then(function (returnedValue) {
            if (returnedValue.ok) {
                // returnedValue.text().then(data => console.log(data));
                returnedValue.json().then((data) => {
                    // console.log('muestro respuesta: ', data);
                    if (data.length === 0) {
                        Swal.fire('No existen el datos');
                        // ponMensaje('No existen datos', 3);
                    } else {
                        let s = '';
                        data.forEach(e => {
                            s += `
                                <tr>
                                    <td>${e.id}</td>
                                    <td>${e.descripcion}</td>
                                    <td><button onclick="editUser({id:'${e.id}',descripcion:'${e.descripcion}'})" class="w3-button w3-blue">update</button></td>
                                    <td><button onclick="deleteUser(${e.id})" class="w3-button w3-red">delete</button></td>
                                </tr>
                            `;
                        });
                        document.querySelector('#datosTabla').innerHTML = s;
                    }
                });
            } else {
                console.log("no se pudoieron recuperar los datos")
            }
        }).catch(function (err) {
            console.log(err);
        });
    }
    //recupera todos los datos
    function traeTodos(evt) {
        evt.preventDefault();
        llenaTabla();
    }

    //
    function borraDato(dab) {
        const localUrl=url
        let parametros = `id=${dab}`;
        let request = new Request(url,
            {
                method: 'delete',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams(parametros)
            });
        fetch(request)
        .then(function (returnedValue) {
            if (returnedValue.ok) {
                returnedValue.text().then(data => {
                    console.log('al borrar: ', data);
                    llenaTabla();
                });
                Swal.fire(`Dato ${dab} eliminado`);
            } else {
                Swal.fire('No se pudo eliminar dato');
                console.log("no se pudo recuperar el dato")
            }
        }).catch(function (err) {
            Swal.fire('Error en eliminar dato');
            console.log(err);
        });
    }

    function eliminaUno(dab) {
        // let dab = document.querySelector("#buscar").value;
        if (!dab) {
            Swal.fire('No indico el dato a borrar');
        } else {
            // alert(dab);
            borraDato(dab)
        }
        // let msj = document.querySelector('#mensaje');
        // msj.innerHTML = '';
    }

    /**
     * 
     * */
    async function elimina(evt) {
        evt.preventDefault();
        const inputValue = '0'
        const { value: valorID } = await Swal.fire({
            title: "Id a eliminaar:",
            input: "text",
            inputLabel: "id del dato a eliminar",
            inputValue,
            showCancelButton: true,
            inputValidator: (value) => {
                if (!value) {
                return "Necesita escribir el id a eliminar!";
                }
            }
        });
        if (valorID) {
            let datoAbuscar=isNaN(valorID)?0:parseInt(valorID, 10)
            // Swal.fire(`Su dato a buscar es: ${datoAbuscar}`);
            eliminaUno(datoAbuscar)
        }
    }
    /**
     * 
     * */
    function editUser(e) {
        console.log(e);
        // document.getElementById("id").value = e.id;
        // document.getElementById("descripcion").value = e.descripcion;
        Swal.fire(`Lamar a edit user ${e.id}`);

    }
    function deleteUser(dab) {
        borraDato(dab);
    }
document.getElementById("menu_beneficiarios").addEventListener("click", function() {
    window.location.href = '/beneficiarios';
})

document.getElementById("menu_aguinaldo").addEventListener("click", function() {
    window.location.href = '/aguinaldo';
})

document.getElementById("menu_salario_regulador").addEventListener("click", function() {
    window.location.href = '/salario_regulador';
})

document.getElementById("menu_home").addEventListener("click", function() {
    window.location.href = '/';
})

document.getElementById("menu_cct").addEventListener("click", function() {
    window.location.href = '/cct';
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

document.getElementById("menu_graficas").addEventListener("click", function(event) {
    window.location.href = '/graficas';
})

document.getElementById("menu_acerca_de").addEventListener("click", function(event) {
    event.preventDefault()
    Swal.fire({
        title: "Simuldor de pensiones",
        imageUrl: "images/sutunacar.png",
        imageHeight: 100,
        html: `Comisión:<br>
        (America Zavala Chan, Angel E. Zapata Torresy, 
        Javier Rivera Dominguez)<br>
        Desarrolladores:<br>
        (Jesús Alejandro Flores Hernández, Ma. del Rosario Vazquez Aragón)`
      });
})
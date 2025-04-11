document.getElementById("menu_beneficiarios").addEventListener("click", function() {
    window.location.href = '/beneficiarios';
})

document.getElementById("menu_aguinaldo").addEventListener("click", function() {
    window.location.href = '/aguinaldo';
})

document.getElementById("salario_regulador").addEventListener("click", function() {
    window.location.href = '/salario_regulador';
})

document.getElementById("menu_home").addEventListener("click", function() {
    window.location.href = '/';
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
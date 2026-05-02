var productos = 
{
    0: {
        id: 0,
        section: "platillo",
        name: "Tacos de marlin",
        img: "producto0.jpeg",
        price: 65,
    },
    1: {
        id: 1,
        section: "platillo",
        name: "Tostada de camaron",
        img: "producto1.jpeg",
        price: 40,
    },
    2: {
        id: 2,
        section: "platillo",
        name: "Aguachile",
        img: "producto2.jpeg",
        price: 120,
    },
    3: {
        id: 3,
        section: "platillo",
        name: "Taco de pescado",
        img: "producto3.jpeg",
        price: 50,
    },
    4: {
        id: 4,
        section: "platillo",
        name: "Taco de camaron",
        img: "producto4.jpeg",
        price: 60,
    },
    5: {
        id: 5,
        section: "platillo",
        name: "Caldo de pescado",
        img: "producto5.jpeg",
        price: 100,
    },
    6: {
        id: 6,
        section: "platillo",
        name: "Cahuamanta",
        img: "producto6.jpeg",
        price: 120,
    },
    7: {
        id: 7,
        section: "bebida",
        name: "Michelada",
        img: "producto7.jpeg",
        price: 80,
    },
    8: {
        id: 8,
        section: "bebida",
        name: "Coca Cola",
        img: "producto8.jpeg",
        price: 30,
    },
    9: {
        id: 9,
        section: "bebida",
        name: "Agua de limon",
        img: "producto9.jpeg",
        price: 25,
    },
    10: {
        id: 10,
        section: "bebida",
        name: "Agua de jamaica",
        img: "producto10.jpeg",
        price: 25,
    },
    11: {
        id: 11,
        section: "bebida",
        name: "Agua de horchata",
        img: "producto11.jpeg",
        price: 25,
    },
}


// Función para renderizar
function cargarProductos() {
    var contenedor = document.getElementById('platillos-container');
    var contenedor_full = ""
    
    // Limpiamos el contenedor por si acaso
    contenedor.innerHTML = "";

    var psize = Object.keys(productos).length;

    // El ciclo FOR para recorrer tus productos
    var productos_properity = Object.values(productos);
    
    for (var producto of productos_properity) {
        // Creamos la "plantilla" de HTML
        var card = `
            <div class="platillo" onclick="addItemToCar(${producto.id})">
                <img src="Images/${producto.img}" alt="">
                <div class="platillo-information">
                    <p class="platillo-name">${producto.name}</p>
                    <p class="platillo-price">$${producto.price}</p>
                </div>
            </div>
        `;

        if(producto.section == "platillo")
            contenedor = document.getElementById('platillos-container');
        else if(producto.section == "bebida")
            contenedor = document.getElementById('bebidas-container');

        // Agregamos la plantilla al contenedor sin borrar lo anterior
        contenedor.innerHTML += card;
        //contenedor.innerHTML = contenedor_full;
    }
}
// Llamamos a la función
cargarProductos();
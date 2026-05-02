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

if (!localStorage.getItem('PrimeraVez')) {
    localStorage.setItem('PrimeraVez', 'true');
    localStorage.setItem('carshop', []);
} else {
}
if (localStorage.getItem('carshop') == null) {
    localStorage.setItem('carshop', []);
}

var total = 0.0;
var carshop = getShopCar();

function shopCar()
{
    total = 0;
    carshop = getShopCar();
    var productos_properity = Object.values(productos);
    var total_productos = carshop.length;
    var productos_unity = [];
    var productos_final = {};

    console.log(carshop);
    console.log(productos_properity);

    // PRODUCTOS FINALES, AQUI SE MUESTRA TODO
    var carcontenent = "";
    var subtotal = 0; 
    
    carshop.forEach(function (elemento, indice, array) {
        //console.log(elemento, indice);
        
        if(!productos_unity.includes(elemento))
        {
            productos_unity.push(elemento);
        }
    });
    
    productos_unity.forEach(function (elemento, indice, array) {
        if(!productos_final[elemento])
        {
            productos_final[elemento] = {
                id: elemento,
                size: get_size_product(elemento),
            }
        }
    });

    var final_properity = Object.values(productos_final);

    for(var actproduct of final_properity)
    {
        var pid = actproduct.id;
        var aproduct = productos_final[pid]; // Datos del carrito {id, size}
        var producto = productos[pid]; // Datos del menú {name, price, img}
        
        subtotal = producto.price*aproduct.size;
        total += subtotal;


        const product = `
            <div class="product" onclick="eliminarProducto(${producto.id});">
                <img src="Images/${producto.img}" alt="">
                <div class="information-container">
                    <div class="header">
                        <p class="tittle">${producto.name}</p>
                        <p class="amount">x${aproduct.size}</p>
                    </div>
                    <p class="price">$${producto.price} c/u</p>
                    <p class="total">$${subtotal} total</p>
                </div>
            </div> 
        `;
        carcontenent += product;
    }

    console.log("PRODUCTOS> " + productos_final);
    document.getElementById("total-productos").innerHTML = "x" + carshop.length + " productos";
    document.getElementById("shopcar-container").style.visibility = "visible";
    document.getElementById("products-container").innerHTML = "";
    if(carshop.length <= 0)
    {
        document.getElementById("total-carrito").innerHTML = "Sin productos";
    }
    else {
        document.getElementById("total-carrito").innerHTML = "Pagar $"+total;
    }

    document.getElementById("products-container").innerHTML = carcontenent;
}

function get_size_product(product)
{
    var carshop = getShopCar();
    var psize = 0;
    carshop.forEach(function (elemento, indice, array) {
        if(elemento == product)
            psize += 1;
    })
    return psize;
}

function closeShopCar()
{
    document.getElementById("shopcar-container").style.visibility = "hidden";
}

function eliminarProducto(id) {

    let i = carshop.indexOf(id);

    if (i !== -1) {
        carshop.splice(i, 1);
    }
    localStorage.setItem('carshop', JSON.stringify(carshop)); 
    document.getElementById("car-size").innerHTML = carshop.length;
    shopCar();
}

function addItemToCar(item)
{
    var shopCar = getShopCar();

    shopCar.push(item)
    localStorage.setItem('carshop', JSON.stringify(shopCar)); 
    document.getElementById("car-size").innerHTML = getShopCar().length;
}

function getShopCar()
{
    var rawData = localStorage.getItem('carshop');
    var shopCar;

    if (rawData && rawData.trim() != "") {
        try {
            shopCar = JSON.parse(rawData);
        } catch (e) {
            console.error("Error al leer el carrito", e);
            shopCar = [];
        }
    } else {
        shopCar = [];
    }

    return shopCar;
}

function PagarCarrito()
{
    if(document.getElementById("total-carrito").innerHTML != "Sin productos")
    {
        console.log("pagando..")
        detectCompraAvaible(0);
        document.getElementById("pago-container").style.visibility = "visible";
    }
}

function closepagoContainer()
{
    document.getElementById("pago-container").style.visibility = "hidden";
}

function metodoPago(metodo)
{
    var tarjeta = document.getElementById("tarjeta-pagar");
    var cash = document.getElementById("cash-amount");
    if(metodo == "tarjeta")
    {
        tarjeta.style.position = "relative";
        tarjeta.style.visibility = "visible";
        cash.style.position = "absolute";
        cash.style.visibility = "hidden";
    }
    else {
        tarjeta.style.position = "absolute";
        tarjeta.style.visibility = "hidden";
        cash.style.position = "relative";
        cash.style.visibility = "visible";
    }
}

var readytobuy = false;
var money = 0;

function detectCompraAvaible(dinero)
{
    money = dinero;
    document.getElementById("pago-cantidad").innerHTML = "Total a pagar : $" + total;
    var change = document.getElementById("cambio-cantidad");
    var cambio = parseFloat(dinero)-total;

    if(cambio >= 0){
        readytobuy = true;
        document.getElementById("pagar-button").style.color = "#ffffff";
        document.getElementById("pagar-button").style.backgroundColor = "#d8554b";
        change.innerHTML = "Cambio : $" + cambio;}
    else{
        readytobuy = false;
        document.getElementById("pagar-button").style.color = "#d8554b";
        document.getElementById("pagar-button").style.backgroundColor = "#eae9f3";
        change.innerHTML = "Faltan : $" + cambio*-1;}

}

function pagar()
{
    if(money >= total && readytobuy)
    {
        alert("¡Compra realiza con exito!");
        closeShopCar();
        closepagoContainer();
        localStorage.setItem('carshop', []); 
        document.getElementById("car-size").innerHTML = "0";
    }
    else
        alert("Saldo insuficiente");

}


function viewPassword()
{
    var pbutton = document.getElementById("cvv");
    var vbutton = document.getElementById("visiblepassword");

    if(pbutton.type == "password")
    {
        vbutton.className = "fa-solid fa-eye-slash";
        pbutton.type = 'text';
    }
    else if(pbutton.type == "text"){
        pbutton.type = 'password';
        vbutton.className = "fa-solid fa-eye view-pasword-button";
    }
}

document.getElementById("car-size").innerHTML = getShopCar().length;


function goToPage(page)
{
    window.location.href = page;
}

// visuales ------------------------------
window.onscroll = function() {
    var header = document.querySelector("header");
    if (window.pageYOffset > 55) { // Si bajó más de 200px
        header.classList.add("sticky-active");
        document.getElementById("header-margin").style.height = "60px";
    } 
    if (window.pageYOffset < 5) { // Si bajó más de 200px
        header.classList.remove("sticky-active");
        document.getElementById("header-margin").style.height = "0";
    }
};

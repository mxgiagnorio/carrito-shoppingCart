
//Objetos

class Producto {

    constructor(nombre, precio, id, img) {
      this.nombre = nombre;
      this.precio = precio;
      this.id = id;
      this.img = img;
      this.stock = "En stock";
    }
    //Metodos
    sinStock() {
      this.stock = "Sin Stock";
    }
    descuento(porcentaje) {
      this.precio = this.precio * porcentaje;
    }
    descuento10() {
      this.precio = this.precio * 0.9;
    }
  }

let botonCompra = document.querySelectorAll(".botonComprar"); 

let carrito = [];  

for(let boton of botonCompra){

    boton.addEventListener("click", agregarCarrito); 

}


function agregarCarrito(e){

    let botonAgregarProducto = e.target;
    let cardProducto = botonAgregarProducto.parentNode.parentNode; 

    nombreProducto = cardProducto.querySelector("h5").textContent;
    imagenProducto = cardProducto.querySelector("img").src;
    precioProducto = cardProducto.querySelector("p").textContent;

    const producto = {

        nombre : nombreProducto,
        imagen : imagenProducto,
        precio : precioProducto, 
        cantidad : 1,  
    }

    carrito.push(producto); 
    mostrarProductosCarrito(producto);

    localStorage.setItem("MiCarrito", JSON.stringify(carrito));
   

}

function mostrarProductosCarrito(producto){

    let fila = document.createElement("tr"); 
    
    fila.innerHTML = `<td>${producto.nombre}</td>
                      <td>${producto.cantidad}</td>
                      <td>${producto.precio}</td>
                      <td><button class ="btn btn-danger">Eliminar</button></td>
                      `

 let tbody = document.getElementById("tbody"); 

  tbody.appendChild(fila); 
                      
}

//Muestra y desaparece carrito de compras

$("#botonToggle").click (function(){

  $("#carrito").toggle();


})
$("#botongToggle").on("click" ,function(e){

  if(e.target.innerHTML != "Mostrar carrito"){

    e.target.innerHTML = "Mostrar carrito"; 

  }

  else{

    e.target.innerHTML = "Esconder carrito";

  }
})













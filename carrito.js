//Muestra y desaparece carrito de compras
$("#botonToggle").click(function(){

  $("#carrito").fadeToggle("slow");

})

$("#botonToggle").on("click" ,function(e){

  if(e.target.innerHTML != "Mostrar carrito"){

    e.target.innerHTML = "Mostrar carrito"; 
  }

  else{

    e.target.innerHTML = "Esconder carrito";
  }
})

//Capturo el evento click del boton comprar del producto
const clickProducto = document.querySelectorAll(".botonComprar"); 
const tbody = document.querySelector(".tbody")

let carrito = []; 


for(const boton of clickProducto)

boton.addEventListener("click", (agregarProductoCarrito))

function agregarProductoCarrito(e){

const botonAgregarProducto = e.target; 
const cardProducto = botonAgregarProducto.parentNode.parentNode

    nombreProducto = cardProducto.querySelector(".card-title").textContent; 
    imagenProducto = cardProducto.querySelector(".card-img-top").src;
    precioProducto = cardProducto.querySelector(".card-text").textContent;
    
    const productosCarrito = {

        nombre : nombreProducto,
        imagen : imagenProducto,
        precio : precioProducto, 
        cantidad : 1,  
      
}

      mostrarProductosCarrito(productosCarrito);

}
  //Creo una funcion que recorre el carrito evitando repetir productos en el contenido
  function mostrarProductosCarrito(productosCarrito){
 
  const sumarProducto = tbody.getElementsByClassName("sumaProducto")
 
  for(let i =0; i < carrito.length ; i++){ 
    if(carrito[i].nombre.trim() === productosCarrito.nombre.trim()){

    carrito[i].cantidad ++;
    const valueSumarProducto = sumarProducto[i]
    valueSumarProducto.value ++; 
    totalCarrito()
    
    return null; 

    }
  
  }
  
  carrito.push(productosCarrito);
  
  actualizarCarrito();

}

// Se crea el contenido del carrito 
function actualizarCarrito(){

  tbody.innerHTML = ""

  carrito.map(cardProducto => {

    const tr = document.createElement("tr")

    tr.classList.add("agregaProductoCarrito")

    const contenido =  
    ` 
                  <th scope="row">1</th>
                  <td class="table__productos">
                    <img src=${cardProducto.imagen} alt="">
                    <h6 class="title ml-4">${cardProducto.nombre}</h6>              
                  </td>
                  <td class="table__precio"><p>${cardProducto.precio}</p></td>
                  <td class="table__cantidad">
                    <input type="number" min="1" value=${cardProducto.cantidad} class="sumaProducto">
                    <button class="delete btn btn-danger ml-2">X</button>
                  </td>

    `
    tr.innerHTML = contenido;
    tbody.append(tr);
    
    tr.querySelector(".delete").addEventListener("click", eliminarProductoCarrito);
    tr.querySelector(".sumaProducto").addEventListener("change" , sumaCantidad)
   
  })
  
  totalCarrito()

}

//Total de la suma de las compras
function totalCarrito(){

  let total = 0;
  totalProductoCarrito = document.querySelector(".totalProductoCarrito")

  carrito.forEach(cardProducto => {

    const precioProductoCarrito = Number(cardProducto.precio.replace("$" , ""))
    
    total = total + precioProductoCarrito*cardProducto.cantidad 
    
  });

  totalProductoCarrito.innerHTML = `${total} AR$`
 
//Almaceno lista de productos localmente
  productosLocalStorage()
}

function eliminarProductoCarrito(e){

  const botonBorrar = e.target; 
  const tr = botonBorrar.closest(".agregaProductoCarrito")
  const nombre = tr.querySelector(".title").textContent
  for(let i=0; i<carrito.length ; i++){
   
    if(carrito[i].nombre.trim() === nombre.trim()){

      carrito.splice(i, 1)

    }

  }
  
  tr.remove()
  
  totalCarrito()
}

//Suma y resta la cantidad de los productos. Se refleja en el total($) de los productos
function sumaCantidad(e){

  const sumaProducto = e.target; 
  const tr = sumaProducto.parentNode.parentNode;
  const nombre =  tr.querySelector(".title").textContent;

  carrito.forEach(cardProducto => {

    if (cardProducto.nombre.trim() === nombre){

      sumaProducto.value < 1 ? (sumaProducto.value=1) : sumaProducto.value; 

      cardProducto.cantidad = sumaProducto.value; 
      totalCarrito()
    
    }
    
  });

}
  
//Confirma y vuelve el simulador a 0
const confirmarCompra = document.querySelector(".confirmarCompra");
confirmarCompra.addEventListener("click" , confirmarCompraOk);


function confirmarCompraOk(){

  const limpiarCarrito = document.querySelector(".totalProductoCarrito")
  limpiarCarrito.innerHTML = "0 AR$"
 
  tbody.innerHTML = "" 

  carrito = []; 
   
}

//Local Storage

function productosLocalStorage(){

  localStorage.setItem("carrito", JSON.stringify(carrito));

  actualizarCarrito()

}


window.onload = function(){

 const storage = JSON.parse(localStorage.getItem("carrito"))

 if (storage){

      carrito = storage; 
      actualizarCarrito()

 }

}



  

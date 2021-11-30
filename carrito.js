
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

  
const confirmarCompra = document.querySelector(".confirmarCompra");
confirmarCompra.addEventListener ("click" , confirmarCompraOk)

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
                      <td><button class ="btn btn-danger botonEliminar">Eliminar</button></td>
                      `

 let tbody = document.getElementById("tbody"); 

  tbody.appendChild(fila); 

  fila.querySelector(".botonEliminar").addEventListener("click" , eliminarProductoOk);
                      
}


function eliminarProductoOk(e){

  const eliminarProductoElegido = e.target; 

  eliminarProductoElegido.closest('tr').remove();

}

function confirmarCompraOk(){

tbody.innerHTML = ``

}

//Texto animado

$("#desafioCoder")
            .html("Esto es para el desafio complementario")
                .css("color", "blue")
                    .fadeOut(4000)
                        .fadeIn(3000); 


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
  

//API DEL CLIMA 

$("#botonClima").click(function(){

  $("#apiClima").fadeToggle("slow");

})

$("#botonClima").on("click" ,function(e){
  
	if(e.target.innerHTML != "Mostrar clima"){

    e.target.innerHTML = "Mostrar clima"; 

  }

  else{

    e.target.innerHTML = "Esconder clima";

  }
})


$.ajax({


  url:'http://api.openweathermap.org/data/2.5/weather',
  type:"GET",
  data:{
      q:'Tigre',
      appid: '8d1c7e66144d584458f0befbc90792a2',
      dataType:"jsonp",
      units: 'metric'
  },
  success:function(data){

      console.log( data);
      let icono = data.weather[0].icon;
      let iconoURL = "http://openweathermap.org/img/w/" + icono + ".png";
      $("#icono").attr("src" , iconoURL);
      let contenido = `<div>
                          <p>${data.name}</p>                            
                          <p>${data.weather[0].main}</p>
                          <p>TEMP MAX: ${data.main.temp_max}</p>
                          <p>TEMP MIN: ${data.main.temp_min}</p>

                      </div>`;


      $("#apiClima").append(contenido);



  }


})












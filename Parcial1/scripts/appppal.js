import Anuncio_Auto from "./auto.anuncio.js";



const anuncios = localStorage.getItem("anuncios")
? JSON.parse(localStorage.getItem("anuncios"))
: [];



function armarAnuncios(titulo,descripcion,precio,puertas,potencia,kms){
    const card = document.createElement("div");
    card.classList.add("card");
    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card--header");
    const h1 = document.createElement("h2");
    h1.classList.add("card--text");
    h1.textContent = titulo;

    const divDescripcion = document.createElement("card--descripcion");
    divDescripcion.classList.add("card--text");
    divDescripcion.textContent = descripcion ; 
    divDescripcion.appendChild(document.createElement("br"));

    const divPrecio = document.createElement("card--precio");
    divPrecio.classList.add("card--text");
    divPrecio.textContent = "Precio: $" + precio.toString();
    divPrecio.appendChild(document.createElement("br"));

    const divPuertas = document.createElement("card--puertas");
    divPuertas.classList.add("card--text");
    divPuertas.textContent = "Puertas: "+puertas.toString();
    divPuertas.appendChild(document.createElement("br"));

    const divPotencia = document.createElement("card--potencia");
    divPotencia.classList.add("card--text");
    divPotencia.textContent = "Potencia: " +potencia.toString();
    divPotencia.appendChild(document.createElement("br"));

    const divKms = document.createElement("card--kms");
    divKms.classList.add("card--text");
    divKms.textContent = "Kms : "+kms.toString();
    divKms.appendChild(document.createElement("br"));
    

    cardHeader.appendChild(h1);
    card.appendChild(cardHeader);
    card.appendChild(divDescripcion);
    card.appendChild(divPrecio);
    card.appendChild(divPuertas);
    card.appendChild(divPotencia);
    card.appendChild(divKms);
    return card;
    //document.body.appendChild(crearTabla(empleados));
    
}
anuncios.forEach(element => {
    document.getElementById("Container").appendChild(armarAnuncios(element.titulo,element.descripcion,element.precio,element.puertas,element.potencia,element.kms));
});

//document.body.appendChild(a());

/**
 <div class="card" id="card">
  <div class="card--header">
    <h1 class="card--number--text">
      Card number
    </h1>

    </div>
    <div class="card--by">
      By 
    </div>
    <div class="card--time">
     43 minutes ago
    </div>
</div>
 */



function crearCard(vec) {
    const table = document.createElement("table");
    table.appendChild(crearCabecera(vec[0]));
    table.appendChild(crearCuerpo(vec));
  
    return table;
  }
  
  function crearCabecera(obj) {
    const thead = document.createElement("thead");
    const tr = document.createElement("tr");
  
    tr.setAttribute("class","cabecera");
    for (const key in obj) {
      if (key !== "id") {
        const th = document.createElement("th");
        th.textContent = key;
        tr.appendChild(th);
      }
    }
    thead.appendChild(tr);
    return thead;
  }
  
  function crearCuerpo(vec) {
    const tbody = document.createElement("tbody");
    vec.forEach((elemento, index) => {
      const tr = document.createElement("tr");
     // tr.classList.add(index % 2 ? "colorPar" : "colorImpar");
     tr.classList.add("colorImpar");
      tr.classList.add("pointer");
      for (const key in elemento) {
        if (key === "id") {
          tr.setAttribute("data-id", elemento[key].toString()); //ATRIBUTO INVISIBLE PARA REFERENCIAR
        } else {
          const td = document.createElement("td");
          td.textContent = elemento[key].toString();
          tr.appendChild(td);
        }
      }
      tbody.appendChild(tr);
    });
    return tbody;
  }
  
  //document.body.appendChild(crearTabla(empleados));
  //document.querySelector(".table-container").appendChild(crearTabla(empleados));
 // export default crearTabla;

import crearTabla from "./tablaDinamica.js";
import Anuncio_Auto from "./auto.anuncio.js";

//SIMULO LATENCIA EN LA CARGA DE DATOS
//localStorage.clear();//POR SI QUEDA SUCIO EL LOCALSTORAGE
//console.log(asd);
  //#region CARGA DE DATOS

  const anuncios = localStorage.getItem("anuncios")
  ? JSON.parse(localStorage.getItem("anuncios"))
  : [];
  
  var max = 0;
  anuncios.forEach((anuncios) => {
    if (anuncios.id > max) {
      max = anuncios.id;
    }
  });
  const UltimoId = max;
  localStorage.setItem("IdMax", (UltimoId + 1).toString());
  
  cargarTabla();
  //#endregion
  //#region AGREGAR

  const $frmAnuncio = document.forms[0];

  $frmAnuncio.addEventListener("submit", (e) => {
    const frm = e.target;
    e.preventDefault();

    let titulo = frm.txtTitulo.value;
    let descripcion = frm.txtDescripcion.value;
    let precio = parseFloat(frm.txtPrecio.value);
    let potencia = parseInt(frm.txtPotencia.value);
    let kms = parseInt(frm.txtKms.value);
    let puertas = parseInt(frm.txtPuertas.value);

    let transaccionInt = "Alquiler";
    if (document.formulario.transaccion[0].checked) {
      transaccionInt = "Venta";
    }

    if (precio > 0 &&
      potencia > 0 &&
      puertas > 0 &&
      kms > 0
    ) {

      let idMax = parseInt(localStorage.getItem("IdMax"));
      let newAnuncio = new Anuncio_Auto(
        idMax,
        titulo,
        transaccionInt,
        descripcion,
        precio,
        puertas,
        kms,
        potencia
      );
      anuncios.push(newAnuncio);
      console.log(anuncios)
      localStorage.setItem("anuncios", JSON.stringify(anuncios));
      localStorage.setItem("IdMax", idMax + 1);
      mostrarTabla();
      refrescarTabla();
      mostrarSpinner3Seg();
    } else {
      alert("Los datos ingresados son invalidos.");
    }
  });
  //#endregion
  //#region MAPEO

  function MapearObjetoAControl(id) {
    anuncios.forEach((element) => {
      if (element.id == id) {
        document.getElementById("txtTitulo").value = element.titulo;
        document.getElementById("txtDescripcion").value = element.descripcion;
        document.getElementById("txtPrecio").value = element.precio;
        document.getElementById("txtPotencia").value = element.potencia;
        document.getElementById("txtPuertas").value = element.puertas;
        document.getElementById("txtKms").value = element.kms;
        document.formulario.transaccion[0].checked = true;
        if (element.transaccion == "Alquiler") {
          document.formulario.transaccion[1].checked = true;
        }
        localStorage.setItem("Id", id);
        return;
      }
    });
  }

  //#endregion
  //#region FUNCIONALIDAD TABLA
  document.getElementById("table-container").addEventListener("click", (e) => {
    if (e.target.matches("tr td")) {
        MapearObjetoAControl(e.target.parentElement.dataset.id);
    }
  });
  function cargarTabla() {
    document
      .querySelector(".table-container")
      .appendChild(crearTabla(anuncios));
  }
  function refrescarTabla() {
    document.querySelector(".table-container").firstElementChild.remove();
    document
      .querySelector(".table-container")
      .appendChild(crearTabla(anuncios));
  }
  function limpiarFormulario() {
    $frmAnuncio.reset();
  }
  //#endregion
  //#region CANCELAR
  let btnCancelar = document.getElementById("btnCancelar");
  btnCancelar.addEventListener("click", (e) => {
    cancelar();
  });
  function cancelar() {
    limpiarFormulario();
    localStorage.removeItem("Id");
  }
  //#endregion
  //#region ELIMINAR
  let btnEliminar = document.getElementById("btnEliminar");

  btnEliminar.addEventListener("click", (e) => {
    eliminar();
    mostrarSpinner3Seg();
  });

  function eliminar() {
    let id = localStorage.getItem("Id");
    let index = 0;
    anuncios.forEach((element) => {
      if (element.id == id) {
        anuncios.splice(index, 1);
        return true;
      }
      index++;
    });
    limpiarFormulario();
    refrescarTabla();
  }

  //#endregion
  //#region Modificar
  let btnModificar = document.getElementById("btnModificar");

  btnModificar.addEventListener("click", (e) => {
    modificar();
    mostrarSpinner3Seg();
  });

  function modificar() {
    let id = localStorage.getItem("Id");
    anuncios.forEach((element) => {
      if (element.id == id) {
        modificarAnuncio(element);
        localStorage.setItem("anuncios", JSON.stringify(anuncios));
        refrescarTabla();
        return;
      }
    });
  }

  function modificarAnuncio(anuncio) {
    let titulo = document.getElementById("txtTitulo").value;
    let descripcion = document.getElementById("txtDescripcion").value;
    let precio = document.getElementById("txtPrecio").value;
    let puertas = document.getElementById("txtPuertas").value;
    let potencia = document.getElementById("txtPotencia").value;
    let kms = document.getElementById("txtKms").value;
    let transaccionInt = "Alquiler";
    if (document.formulario.transaccion[0].checked) {
      transaccionInt = "Ventas";
    }
    if (precio > 0 &&
      puertas > 0 &&
      kms > 0 &&
      potencia > 0
    ) {
      anuncio.titulo = titulo;
      anuncio.descripcion = descripcion;
      anuncio.precio = precio;
      anuncio.puertas = puertas;
      anuncio.potencia = potencia;
      anuncio.kms = kms;
      anuncio.transaccion = transaccionInt;
      return;
    } else {
      alert("Los datos ingresados son invalidos.");
    }
  }
  //#endregion
  //#region SPINNER

 
  setTimeout(() => {
  const divSpinner = document.getElementById("divSpinner");
  divSpinner.setAttribute("Hidden", true);
  if(anuncios.length > 0){
   mostrarTabla();
  }
  
  //#endregion
}, 5000);

function mostrarTabla(){
  const tabla = document.getElementById("table-container");
  tabla.removeAttribute("Hidden");
  const botones = document.getElementById("botonera");
  botones.removeAttribute("Hidden");
}

function mostrarSpinner3Seg(){
  const divSpinner = document.getElementById("divSpinner");
    divSpinner.removeAttribute("Hidden");
  setTimeout(() => {
    divSpinner.setAttribute("Hidden", true);
  }, 3000)
}

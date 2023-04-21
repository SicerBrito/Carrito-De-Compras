// script llenado dinamico

document.addEventListener('DOMContentLoaded',()=>{
    mirarServicios(servicios)
    masInfo()
})



function mirarServicios(servicios){
    const contenedor = document.querySelector("#contenedor-tarjetas")

    servicios.forEach((servicio) => {
        const {nombre,imagen,detalle,disponibilida,boton} = servicio
        const textoHTML = document.createElement("p")
        textoHTML.innerHTML = /*html*/ `
        <div class="tarjetas">
            <h4>${nombre}</h4>
            <img src="/images/${imagen}" alt="">
            <button id="abrir" detalle = "${detalle}" disonibilidad = "${disponibilida}" nombre = "${nombre}" >Ver datos</button>
        </div>
        `
        contenedor.appendChild(textoHTML)
    });
}



const contain = document.querySelector("#modal")
const dialog = document.createElement("p")
function masInfo(){
    const service = document.querySelector("#contenedor-tarjetas")
    service.addEventListener("click", loadModal);
}

function loadModal(e) {
    const nombre = e.target.getAttribute("nombre")
    const disonibilidad = e.target.getAttribute("disonibilidad")
    const detalle = e.target.getAttribute("detalle")
    dialog.innerHTML = `
    <h1>Servicios</h1>
    <table>
        <thead>
            <th>Nombre</th>
            <th>Detalles</th>
            <th>Disponibilida</th>
        </thead>
        <tbody id="tbodie" >
        <td> ${nombre}</td>
        <td>${detalle}</td>
        <td>${disonibilidad}</td>           
        </tbody>
    </table>`
    contain.appendChild(dialog);
}


function limpiar(){
   let m = document.querySelectorAll('p')
   for (let i = 0; i < m.length; i++) {
    m[i].remove()
   } 
}
// script accordion

const abrirModal1 = document.querySelector('#contenedor-tarjetas')
const modal = document.querySelector('#modal')
const cerrarModal = document.querySelector('#btn-cerrar-modal')

abrirModal1.addEventListener('click', () =>{
    modal.showModal()
    mirarDetalles(servicios)
})

cerrarModal.addEventListener('click', ()=>{
    modal.close();
})
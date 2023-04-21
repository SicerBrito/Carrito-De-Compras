//script funcionalidad de carrito y tienda

document.addEventListener("DOMContentLoaded", () =>{
    mirarTienda(ociones)
})


function mirarTienda(ociones){

    const contain = document.querySelector(".products")

    ociones.forEach((unidad) => {
        const {nombre,imagen,valor,id} = unidad
        const textoHTML = document.createElement("p");
        textoHTML.innerHTML = `
            <div class="carts">
                <img src="/images/${imagen}" alt="">
                <div class="value">
                 <h3>${nombre}</h3>   
                </div>
                <p>${valor}$</p>
                <a  class = "agregar"   id = "agregar" imagen = "${imagen}" clean = "${id}" nombre = "${nombre}" valor = "${valor}">AÑADIR AL CARRITO</a>
            </div>`;
            
            contain.appendChild(textoHTML)
    });
    
}
//modal
const abrirModal = document.querySelector("#abrir")
const modal = document.querySelector("#carrito")
const cerrarModal = document.querySelector("#cerrar-modal")

abrirModal.addEventListener("click", () =>{
    modal.showModal()
})

cerrarModal.addEventListener("click", () =>{
    modal.close()
})


//carrito
const itemsTienda =  document.querySelector(".products")
const total = document.querySelector('#total')
const contador = document.querySelector('#contador')
let arrayCards = []
const bodie = document.querySelector("#car")
const borrar = document.querySelector("#car")


itemsTienda.addEventListener("click", selectItem);
borrar.addEventListener("click", borrarItem)

document.addEventListener("DOMContentLoaded", ()=>{
    arrayCards = JSON.parse(localStorage.getItem("items")) || [];
    injectingItemHtml()
})


function selectItem(e){
    e.preventDefault
    if(e.target.classList.contains("agregar")){
        const storeItems  = e.target.parentElement;
        console.log(storeItems);
        details(storeItems)
    }
}

function details(storeItems){
    
    
    const storeDetails = {
        imagen: storeItems.querySelector("img").src,
        valor: storeItems.querySelector("p").textContent,
        nombre: storeItems.querySelector("h3").textContent,
        id: storeItems.querySelector(".agregar").getAttribute("clean")
    }
    console.log(arrayCards);
    const index = arrayCards.findIndex((producto) => producto.id === storeDetails.id)
    if (index === -1){
        arrayCards.push({...storeDetails,cantidad: 1})
    } else {
        arrayCards[index].cantidad++
    }
    addLocal()
    precioTotal()
    injectingItemHtml()
    contarMas()
}



function precioTotal(){
    const totalProductos = arrayCards.reduce((total, producto) =>{
        return total + (producto.valor.slice(0, -1) * producto.cantidad)
    }, 0)
    total.textContent = `Total: ${totalProductos}$`
}

function borrarItem(e){
    if(e.target.classList.contains("delete-product")){
        const itemToDelete = e.target.getAttribute("clean")
        console.log(itemToDelete);
        arrayCards = arrayCards.filter((itemToDel)=> itemToDel.id !== itemToDelete)
        injectingItemHtml()
        nuevoPrecio()
        contarMenos()
    }
    
}

function nuevoPrecio(){
    const totalProductos = arrayCards.reduce((total,producto)=>{
        return total - (producto.valor.slice(0, -1) * producto.cantidad) *-1
    }, 0)
    total.textContent = `Total: ${totalProductos}$`
    
}

function contarMas(){
    const cantidadProductos = arrayCards.reduce((contador, producto)=>{
        return contador + (producto.cantidad)
    }, 0)
    contador.textContent = `${cantidadProductos}`
    addLocal()
}

function contarMenos(){
    const cantidadProductos = arrayCards.reduce((contador, producto)=>{
        return contador - (producto.cantidad) *-1
    }, 0)
    contador.textContent = `${cantidadProductos}`
    addLocal()
}


function injectingItemHtml(){
    cleanHtml()
    arrayCards.forEach((arrayCard)=>{
        const {imagen,valor,nombre,id,cantidad} = arrayCard
        const row = document.createElement("p")
        row.innerHTML =  `
                <br>
                <img src="${imagen}" alt="">
                <p>${nombre}</p>
                <p>${valor}</p>
                <p>Cantidad:${cantidad}</p>
                <a class="delete-product" clean = "${id}" id="borrar">&times;</a>`
        bodie.appendChild(row)
    });
    addLocal()
    
}

function addLocal(){
    localStorage.setItem("items", JSON.stringify(arrayCards))
}


function cleanHtml(){
    bodie.innerHTML = "";
}
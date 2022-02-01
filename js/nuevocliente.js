(function(){
    let DB;
    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded',()=>{
        conectarDB();
        
        formulario.addEventListener('submit', validarCliente);
    });

function validarCliente(e){
    e.preventDefault();
    
    
    // Leer los imputs
    const nombre = document.querySelector('#nombre').value;
    const email = document.querySelector('#email').value;
    const telefono = document.querySelector('#telefono').value;
    const empresa = document.querySelector('#empresa').value;
   
    if(nombre === ''||email === ''||telefono === ''||empresa === ''){
        imprimirAlerta('Todos los campos son obligatorios','error');
        return;
    }
   // Crear un objeto con la informacion

   const cliente = {
       nombre,        // esto es lo mismo que nombre : nombre 
       email,
       telefono,
       empresa,
       id : Date.now()
   }
 console.log(cliente)
 
crearNuevoCliente(cliente);
  
 }
 
function crearNuevoCliente(cliente){
   const transaction = DB.transaction(['crm'], 'readwrite');

   const objectStore = transaction.objectStore('crm');

   objectStore.add(cliente);

   transaction.onerror = ()=>{
       imprimirAlerta('hubo un error(comprobar email) ', 'error');
   }

   transaction.oncomplete = ()=> {
       console.log('añadido');
       imprimirAlerta('Cliente añadido correctamente');
       setTimeout(() => {
           window.location.href ='index.html'
       }, 3000);
   }   
  
}

function conectarDB() {
    const abrirConexion = window.indexedDB.open('crm', 1);

        abrirConexion.onerror = function(){
            console.log('hubo un error...');
        };
        abrirConexion.onsuccess = function(){
            DB = abrirConexion.result;
        }   

}

   

})();

console.log("Tarea Asincronia - Me estoy guiando por los apuntes hechos en clase y por la ayuda de un amigo programador");

let contenido = document.querySelector('#contenido')

//Verificamos si el tiempo esta zeteado
//si no està zeteado, se agrega el minutoy se pone una variable en falso que indica
//que es la primera vez que se carga.
if (localStorage.getItem('tiempoUser') === null ) {
    var time = Date.now()+60000;
    localStorage.setItem('tiempoUser', time)
    localStorage.setItem('reloj', false)
} 

//Funciòn principal de boton.
function traer(){
    var tiempoActual = Date.now();

    //Cuando el tiempo del minuto ya pasò, va a generar uno nuevo
    if (localStorage.getItem('reloj') == false || localStorage.getItem('tiempoUser') <= tiempoActual) {
        var time = Date.now()+60000;
             localStorage.setItem('tiempoUser', time)

    //Llamado al Fetch
        let url = 'https://reqres.in/api/users?delay=3'
        fetch(url)
         .then( response => response.json() )
         .then( data => {
             tabla(data); 
             usarLocalStorage(data);
             console.log("Hola, bienvenido. Tienes un minuto.")
             
         })
         .catch( error => console.log(error))

      }
    //cuanto el tiempo del minuto 1 està transcurriendo.
      else { 
        if (localStorage.getItem('tiempoUser') >= tiempoActual)
        tablaDos()
        console.log("Estas sobre el tiempo")
      }  
    }

// Funciòn para vacias datos API por primera vez.
function tabla(data) {
    contenido.innerHTML = ''
    for (let valor of data.data) {
            contenido.innerHTML += `
            <tr>
                <th scope="row">${valor.id}</th>
                <td class="d-none d-sm-block"><img src="${valor.avatar}"  class="border border-3 border-danger rounded-circle"></img></td>
                <td>${valor.first_name}</td>
                <td>${valor.last_name}</td>
                <td>${valor.email}</td>
            </tr>`
        }
    }    

// Tabla 2: Funciòn que llena los datos con el LocalStorage
    function tablaDos() {
        let datos = JSON.parse(localStorage.getItem('userDatos'))
        contenido.innerHTML = ''
        console.log(datos)
        if (datos != null){
            for (let valor of datos) {
                contenido.innerHTML += `
                <tr>
                    <th scope="row">${valor.id}</th>
                    <td class="d-none d-sm-block"><img src="${valor.avatar}"  class="border border-3 border-danger rounded-circle"></img></td>
                    <td>${valor.first_name}</td>
                    <td>${valor.last_name}</td>
                    <td>${valor.email}</td>
                </tr>`
            }
        }
    }    

// Guardar los datos en localStorage y pone los datos en true, la variable de inicio
function usarLocalStorage(data) {
    let jsonData = JSON.stringify(data.data)
    console.log("localStorage");
    localStorage.setItem('reloj', true)
    localStorage.setItem('userDatos', jsonData)
      
} 

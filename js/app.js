let pagina = 1; //empezaremos de la pagina uno

const btnAnterior = document.getElementById('btnAnterior');  //creamos una constante donde seleccionaremos el elemnto btnAnterior con un getElementbyId
const btnSiguiente = document.getElementById('btnSiguiente');  //creamos una constante donde seleccionaremos el elemnto btnSiguiente con un getElementbyId

// Eventos de los botones
btnSiguiente.addEventListener('click', () => {  //crearemos un evento este sera de funcion flecha y diremos que tendremos la funcion click 
    pagina += 1; //donde a la pagina actual le sumaremos uno
    cargarAnimes();  //y volveremos a cargar la funcion
});

btnAnterior.addEventListener('click', () => {  //creamnos un evento de boton donde sera de tipo flecha
    if (pagina > 1) {  //creamos un if donde diremos que si poagina es mayor de 1 entonces
        pagina -= 1;  // a la pagina actual le restaremos uno y cargamos la funcion
        cargarAnimes();
    }
});

// Función para cargar los animes
const cargarAnimes = async () => {  //creamos una constante de tipo asincrona usando try y catch
    try {  //dentro de try pondremos la funcion
        const respuesta = await fetch(`https://api.jikan.moe/v4/top/anime?page=${pagina}`); //creamos una constante donde usaremos el fetch y aqui usaremos la url de la pagina c0n echa diremos que queremos todas las paginas de esta 
        if (respuesta.status === 200) {   //aqui diremos que si el status es 200 osea si nos conecto entonces 
            const datos = await respuesta.json(); //hacemos una constante donde guardemos la respuesta
            let animes = ''; 
            datos.data.slice(0, 24).forEach(anime => { // Limitamos a 24 animes
                //creamos un html donde mostraremos todas las paginas de los animes que tenga tendremoe en cuenta que queremos tener la imagen y su nombre
                //ademas de que tendremos el titulo de esta pagina
                animes += `
                    <div class="anime"> 
                        <img src="${anime.images.jpg.image_url}" alt="${anime.title}">
                        <h3>${anime.title}</h3>
                    </div>
                `;
            });
            document.getElementById('contenedor').innerHTML = animes; //accederemos al contendedor del html de nombre animes
        } else {  //si sale un error este nos mandara un mensaje 
            console.error('Error al cargar los animes');
        }
    } catch (error) {  //con catch capturaremos el eror que nos arroje
        console.error('Error:', error);
    }
};

// Cargar los animes al inicio
cargarAnimes();

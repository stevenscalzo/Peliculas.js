import films from './films.js';
window.addEventListener('load', load);

function load(){
    
    let url = new URL(window.location.href);
    let idpelicula = url.searchParams.get('peliculas').valueOf();
    
    console.log(idpelicula);
    console.log(url);
    let foundFilm = films.find((film) => film.id == idpelicula);
    console.log(foundFilm);
    pagina(foundFilm);
}
function pagina(movie) {

    const IMG = "http://image.tmdb.org/t/p/w185/"

    let botonBuscar = document.querySelector('#botonBuscar');
    botonBuscar.addEventListener('click', buscar);
    let divFilms = document.querySelector('#films');
    divFilms.innerHTML = '';
    

            let { title, vote_average, poster_path, release_date, overview} = movie;
            let divFilm = document.createElement('div');
            let date = release_date.split('-');
            divFilm.innerHTML = `
                    <img src="${IMG}${poster_path}" >
                    <p id="titulo"> ${title}</p1>
                    <p>${date[0]}</p>
                    <p id= "average">${vote_average}</p> 
                    `;
            divFilms.appendChild(divFilm);
            let text = document.createElement('div');
            text.innerHTML = `
            <p1> ${overview} <p1>
                     
                    `;
            divFilms.appendChild(text);
    ;

}
function buscar() {
    console.log('buscar');
    let inputElement = document.querySelector('#inputBusqueda');
    console.log(inputElement.value);
    let clave = String(inputElement.value);
    let titulos = films.map((function (nombres) {
            return nombres;
    }));
    let filtrados = titulos.filter((titulo) => titulo.title.toLowerCase().indexOf(clave.toLowerCase()) >= 0);
    console.log(filtrados);
    if (filtrados.length == 0) {
            pagina(films)
    } else {
            pagina(filtrados)
    };
}


//<a href="/peliculas.html?peliculas=${peliculas}">${peliculas}</a>
/*
elementLi =.addEventListener('click', () =>{
    window.location.assign('/ciudad.htl?ciudad='+ ciudad)
    
})
*/
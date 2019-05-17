import films from './films.js';
window.addEventListener('load', () => {
        pagina(films)
});

function pagina(mostrar) {

        const IMG = "http://image.tmdb.org/t/p/w185/"

        let botonBuscar = document.querySelector('#botonBuscar');
        botonBuscar.addEventListener('click', buscar);
        let divFilms = document.querySelector('#films');
        divFilms.innerHTML = '';
        mostrar.forEach((film) => {

                let { title, vote_average, poster_path, release_date, id } = film;
                let divFilm = document.createElement('div');
                let date = release_date.split('-');
                divFilm.innerHTML = `
                        <a href="/peliculas.html?peliculas=${id}" ><img src="${IMG}${poster_path}" ></a>
                        <p id="titulo"> ${title}</p1>
                        <p>${date[0]}</p>
                        <p id= "average">${vote_average}</p> `;
                divFilms.appendChild(divFilm);

        });
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







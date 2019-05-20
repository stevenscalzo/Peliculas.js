const IMG_PATH = 'http://image.tmdb.org/t/p/original';
const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '3d2d2b0c9fe9449158a984016d34aa05';
const API_POPULAR_URL = 'movie/popular';
const API_CATEGORIES = 'genre/movie/list'
let films = [];
let generos = [];
let botonBuscar = document.querySelector('#botonBuscar');

window.addEventListener('load', () => {

        axios.get(API_URL + API_POPULAR_URL + '?api_key=' + API_KEY).then((response) => {
                films = response.data.results;


                axios.get(API_URL + API_CATEGORIES + '?api_key=' + API_KEY).then((resp) => {
                        generos = resp.data.genres;

                        films = films.map((pelicula) => {
                                let arrayGeneros = pelicula['genre_ids'].map((id) => {
                                        return generos.find((genero) => genero.id === id);
                                });
                                pelicula.genres = arrayGeneros;
                                pelicula['poster_path'] = IMG_PATH + pelicula['poster_path'];
                                pelicula['backdrop_path'] = IMG_PATH + pelicula['backdrop_path'];

                                pelicula.stars = Math.round(pelicula['vote_average'] / 2);

                                return pelicula;
                        })
                        botonBuscar.addEventListener('click', buscar);
                        let url = new URL(window.location.href);
                        let idpelicula = url.searchParams.get('peliculas').valueOf();

                        console.log(idpelicula);
                        console.log(url);
                        let foundFilm = films.find((film) => film.id == idpelicula);
                        console.log(foundFilm);
                        pagina(foundFilm);




                })



        });




});
function pagina(movie) {

        let divFilms = document.querySelector('#films');
        divFilms.innerHTML = '';
        let { title, vote_average, poster_path, release_date, overview, backdrop_path } = movie;
        let divFilm = document.createElement('div');
        divFilm.innerHTML = `
        <img src="${poster_path}" ></a>
        <p id="titulo"> ${title}</p1>
        <p>${release_date}</p>
        <p id= "average">${vote_average}</p> 
        `;

        divFilms.appendChild(divFilm);
        let text = document.createElement('div');
        text.innerHTML = `
        <p1> ${overview} <p1>
        `;
        divFilms.appendChild(text);
        document.querySelector('body').style.backgroundImage = `url(${backdrop_path})`;
        document.querySelector('body').style.backgroundPosition = '0 0';


}
function buscar() {
        console.log('buscar');
        let inputElement = document.querySelector('#inputBusqueda');
        console.log(inputElement.value);
        let find = inputElement.value.toLowerCase();
        let film = films.filter((film) => film.title.toLowerCase().includes(find));
        console.log(filtrados);
        if (filtrados.length == 0) {
                pagina(films)
        } else {
                pagina(film)
        };
}



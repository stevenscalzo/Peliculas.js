const IMG_PATH = 'http://image.tmdb.org/t/p/original';
const API_URL = 'https://api.themoviedb.org/3/';
const API_KEY = '3d2d2b0c9fe9449158a984016d34aa05';
const API_POPULAR_URL = 'movie/popular';
const API_CATEGORIES = 'genre/movie/list'
let films = [];
let generos = [];
let fav = JSON.parse(localStorage.getItem('Favoritos'));
let botonBuscar = document.querySelector('#botonBuscar');
let arrayFav = fav[0];
let corazon = [`<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="30" height="30"
viewBox="0 0 192 192"
style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,192v-192h192v192z" fill="none"></path><g fill="#333333"><g id="surface1"><path d="M62.88,34.56c-24.03,0 -43.68,19.41 -43.68,43.32c0,49.035 55.635,74.715 74.4,90.24l2.4,2.04l2.4,-2.04c18.765,-15.525 74.4,-41.205 74.4,-90.24c0,-23.91 -19.65,-43.32 -43.68,-43.32c-13.35,0 -25.11,6.195 -33.12,15.6c-8.01,-9.405 -19.77,-15.6 -33.12,-15.6zM62.88,42.24c12.54,0 23.445,6.345 29.88,15.96l3.24,4.8l3.24,-4.8c6.435,-9.615 17.34,-15.96 29.88,-15.96c19.905,0 36,15.915 36,35.64c0,41.85 -47.085,65.31 -69.12,82.56c-22.035,-17.25 -69.12,-40.71 -69.12,-82.56c0,-19.725 16.08,-35.64 36,-35.64z"></path></g></g></g></svg>`, `<svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
width="30" height="30"
viewBox="0 0 192 192"
style=" fill:#000000;"><g fill="none" fill-rule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" style="mix-blend-mode: normal"><path d="M0,192v-192h192v192z" fill="none"></path><g fill="#e74c3c"><g id="surface1"><path d="M96,170.1l-2.445,-2.025c-3.84,-3.18 -9,-6.69 -14.955,-10.755c-23.655,-16.14 -59.4,-40.53 -59.4,-79.425c0,-23.895 19.575,-43.335 43.635,-43.335c12.87,0 24.915,5.595 33.165,15.195c8.25,-9.6 20.31,-15.195 33.165,-15.195c24.06,0 43.635,19.44 43.635,43.335c0,38.895 -35.745,63.285 -59.4,79.425c-5.97,4.065 -11.115,7.575 -14.955,10.755z"></path></g></g></g></svg>`];



window.addEventListener('load', async () => {
        
        let response = await axios.get(API_URL + API_POPULAR_URL + '?api_key=' + API_KEY)
        films = response.data.results
        let resp = await axios.get(API_URL + API_CATEGORIES + '?api_key=' + API_KEY)
        generos = resp.data.genres
        
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

function pagina(movie) {
        
        let i;
        if (fav !== null) {
                let paginaFav = fav[0];
                let idFilm = movie.id;
                let long = paginaFav.length;
                let contadorFav = 0;
                for (let i = 0; i < long; i++) {
                        if (idFilm == paginaFav[i]) {
                                contadorFav++;
                        }
                }
                if (contadorFav == 0) {
                        i = 0;
                } else { i = 1 };
                console.log(idFilm);
                console.log(contadorFav);
        } else i = 0;
        let divFilms = document.querySelector('#films');
        divFilms.innerHTML = '';
        let { title, vote_average, poster_path, release_date, overview, backdrop_path } = movie;
        let divFilm = document.createElement('div');
        divFilm.innerHTML = `
        <img src="${poster_path}" ></a>
        
        <p>${release_date}</p>
        <p id= "average">${vote_average}</p> 
        <p1>${corazon[i]}</p1>

        `;

        divFilm.querySelector('p1').addEventListener('click', like);

        function like() {

                i++;
                if (i % 2 == 0) {
                        let found = arrayFav.findIndex(function (element) {
                                return element == movie.id;
                        })
                        console.log(found);
                        arrayFav.splice(found, 1);
                        localStorage.setItem('Favoritos', JSON.stringify([arrayFav]));
                        return divFilm.querySelector('p1').innerHTML = corazon[0];
                } else {

                        arrayFav.push(movie.id)

                        localStorage.setItem('Favoritos', JSON.stringify([arrayFav]));
                        return divFilm.querySelector('p1').innerHTML = corazon[1];
                }
        };
        divFilms.appendChild(divFilm);
        let text = document.createElement('divv');
        text.innerHTML = ` <h1 id="titulo"> ${title}</h1>
        
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



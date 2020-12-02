// https://api.themoviedb.org/3/search/movie?api_key=75fa11ba07d05d73ee35e8943a4a42f9&query='ricercaUtente'
const apiKey = '75fa11ba07d05d73ee35e8943a4a42f9';
const urlBase = 'https://api.themoviedb.org/3/search/movie?api_key=';
const lingua = '&language=it-IT&';

var app = new Vue({
  el: '#app',
  data: {
    ricercaUtente: '',
    filmTrovati: []
  },
  methods: {
    // funzione per filtrare i film
    searchMovie: function () {

      axios.get(urlBase + apiKey + lingua + '&query=' + this.ricercaUtente)
      .then(risultato => {

        this.filmTrovati = risultato.data.results;

        console.log(this.filmTrovati);

      });

      this.ricercaUtente = '';

    },
    // funzione per convertire i voti
    conversioneVoto: function (voti) {

      return Math.ceil(voti.vote_average / 2)

    },
    // funzione per generare il percorso immagine
    generatoreCopertina: function (foto) {

      if (foto != null) {
        return 'https://image.tmdb.org/t/p/' + 'w342' + foto;
      } else {
        return 'img/no-poster.png';
      }

    }

  }

});

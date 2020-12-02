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

    searchMovie: function () {

      axios.get(urlBase + apiKey + lingua + '&query=' + this.ricercaUtente)
      .then(risultato => {

        this.filmTrovati = risultato.data.results;

        console.log(this.filmTrovati);

      });

      this.ricercaUtente = '';

    },
    conversioneVoto: function (voti) {
      return Math.ceil(voti.vote_average / 2)
    }
  }



});

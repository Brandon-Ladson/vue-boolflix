var app = new Vue({
  el: '#app',
  data: {
    ricercaUtente: '',
    apiKey: '75fa11ba07d05d73ee35e8943a4a42f9',
    filmTrovati: []
  },
  methods: {
    // funzione per filtrare film/serie tv
    searchMovie: function () {

      this.filmTrovati = [];

      // richiesta film
      axios.get('https://api.themoviedb.org/3/search/movie?api_key=' + this.apiKey + '&language=it-IT&query=' + this.ricercaUtente)
      .then(risultato => {

        this.filmTrovati = this.filmTrovati.concat(risultato.data.results);

      });

      // richiesta serie tv
      axios.get('https://api.themoviedb.org/3/search/tv?api_key=' + this.apiKey + '&language=it-IT&query=' + this.ricercaUtente)
      .then(risultato => {

        this.filmTrovati = this.filmTrovati.concat(risultato.data.results);

      });

      this.ricercaUtente = '';

    },
    // funzione per convertire i voti
    conversioneVoto: function (voti) {

      return Math.ceil(voti.vote_average / 2);

    },
    // funzione per generare il percorso per la cover
    generatoreCopertina: function (foto) {

      if (foto != null) {
        return 'https://image.tmdb.org/t/p/' + 'w342' + foto;
      } else {
        return 'img/no-poster.png';
      }

    },
    // funzione per generare il percorso per la bandiera
    generatoreBadiare: function (lingua) {

      return 'img/flags/' + lingua + '-100.png';

    }

  }

});

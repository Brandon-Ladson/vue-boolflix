var app = new Vue({
  el: '#app',
  data: {
    ricercaUtente: '',
    apiKey: '75fa11ba07d05d73ee35e8943a4a42f9',
    tipoVisibile: false,
    popolariVisibili: true,
    filmTrovati: [],
    serieTrovate: []
  },
  mounted: function () {

    // richiesta film popolari
    axios.get('https://api.themoviedb.org/3/movie/popular?api_key=' + this.apiKey + '&language=it-IT')
    .then(risultato => {

      this.filmTrovati = this.filmTrovati.concat(risultato.data.results);

    });

    // richiesta serie tv popolari
    axios.get('https://api.themoviedb.org/3/tv/popular?api_key=' + this.apiKey + '&language=it-IT')
    .then(risultato => {

      this.serieTrovate = this.serieTrovate.concat(risultato.data.results);

    });

  },
  methods: {
    // funzione per filtrare film/serie tv
    searchMovie: function () {

      // controllo che l'utente inserisca qualcosa nella ricerca
      if (this.ricercaUtente != '') {

        this.filmTrovati = [];
        this.serieTrovate = [];
        this.tipoVisibile = true;
        this.popolariVisibili = false;

        // richiesta film
        axios.get('https://api.themoviedb.org/3/search/movie?api_key=' + this.apiKey + '&language=it-IT&query=' + this.ricercaUtente)
        .then(risultato => {

          this.filmTrovati = this.filmTrovati.concat(risultato.data.results);

        });

        // richiesta serie tv
        axios.get('https://api.themoviedb.org/3/search/tv?api_key=' + this.apiKey + '&language=it-IT&query=' + this.ricercaUtente)
        .then(risultato => {

          this.serieTrovate = this.serieTrovate.concat(risultato.data.results);

        });

        this.ricercaUtente = '';

      }

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

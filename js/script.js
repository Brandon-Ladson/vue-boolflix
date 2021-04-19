var app = new Vue({
  el: '#app',
  data: {
    ricercaUtente: '',
    apiKey: '75fa11ba07d05d73ee35e8943a4a42f9',
    tipoFilm: false,
    tipoSerie: false,
    popolariVisibili: true,
    filmTrovati: [],
    serieTrovate: [],
    generi: []
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

    // richiesta generi film
    axios.get('https://api.themoviedb.org/3/genre/movie/list?api_key=' + this.apiKey + '&language=it-IT')
    .then(risultato => {

      this.generi = this.generi.concat(risultato.data.genres);

    });

    // richiesta generi serie
    axios.get('https://api.themoviedb.org/3/genre/tv/list?api_key=' + this.apiKey + '&language=it-IT')
    .then(risultato => {

      this.generi = this.generi.concat(risultato.data.genres);

    });

  },
  methods: {
    // funzione per filtrare film/serie tv
    searchMovie: function () {

      // controllo che l'utente inserisca qualcosa nella ricerca
      if (this.ricercaUtente != '') {

        this.filmTrovati = [];
        this.serieTrovate = [];
        this.tipoFilm = true;
        this.tipoSerie = true;
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
    conversioneVoto: function (voto) {

      return Math.ceil(voto / 2);

    },
    // funzione per generare il percorso per la cover
    generatoreCopertina: function (poster) {

      if (poster != null) {
        return 'https://image.tmdb.org/t/p/' + 'w500' + poster;
      } else {
        return 'img/no-poster.png';
      }

    },
    // funzione per generare il percorso per la bandiera
    generatoreBadiare: function (lingua) {

      return 'img/flags/' + lingua + '-100.png';

    },
    // funzione per generare i generi
    generatoreGenere: function (codice) {

      var nomeGenre;

      // ciclo in array this.generi per asseggare ad ogni genere id il suo nome
      this.generi.forEach((genere) => {
        if (codice == genere.id) {
          nomeGenre = genere.name;
        }
      });

      return nomeGenre;

    }

  }

});

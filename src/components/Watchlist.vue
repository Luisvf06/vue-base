<template>
  <h1>Películas pendientes</h1>
  <div class="row">
    <div v-for="movie in movies" :key="movie.id" class="col-md-4 mb-4">
      <div class="card-hover-wrapper" @click="elegirPeli(movie)">
        <a :href="'/Detalles/'+movie.id" class="card-link">
          <div class="card">
            <img :src="getMovieImageUrl(movie.poster_path)" class="card-img-top" alt="Movie Poster">
            <div class="card-body">
              <h5 class="card-title">{{ movie.title }}</h5>
              <span>Idioma original: {{ movie.original_language }}</span><br>
              <span>{{ movie.overview.substring(0,200)+'...' }}</span>
            </div>
          </div>
        </a>
        <button class="btn-delete" @click.stop="borrarPelicula(movie.id)"><font-awesome-icon :icon="['fas', 'trash']" /></button>
      </div>
    </div>
  </div>
</template>

  <script setup>
  import { ref, onMounted, defineEmits } from 'vue';
  const account_id = '20930787';
  const emit = defineEmits(['peliculaElegida']);
  const movies = ref([]);
  
  const getWatchlistMovies = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDMxZmVkODM5MGIwMmQ2YzI4NjU1ZmViNTM2MTU2YSIsInN1YiI6IjY1YThmOTNlYzRmNTUyMDEyNzhlNjU2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nArKWLxihtW5aycNC-GAqUwF7JGeo_Rj13o_5ZA7K3w'
      }
    };
  
    fetch(`https://api.themoviedb.org/3/account/20930787/watchlist/movies?language=en-US&page=1&sort_by=created_at.asc`, options)
      .then(response => response.json())
      .then(data => {
        movies.value = data.results;
        movies.value.sort((a, b) => b.vote_average - a.vote_average);
      })
      .catch(err => console.error(err));
  };

  const borrarPelicula = async (movieId) => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDMxZmVkODM5MGIwMmQ2YzI4NjU1ZmViNTM2MTU2YSIsInN1YiI6IjY1YThmOTNlYzRmNTUyMDEyNzhlNjU2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nArKWLxihtW5aycNC-GAqUwF7JGeo_Rj13o_5ZA7K3w'
    },
    body: JSON.stringify({
      media_type: 'movie',
      media_id: movieId,
      watchlist: false
    })
  };

  try {
    const response = await fetch(`https://api.themoviedb.org/3/account/${account_id}/watchlist`, options);
    const data = await response.json();
    if (data.success) {
      console.log('Película eliminada de la watchlist con éxito');
      getWatchlistMovies(); 
    } else {
      console.error('Error al eliminar la película de la watchlist', data);
    }
  } catch (err) {
    console.error('Error al conectar con la API', err);
  }
};


  const getMovieImageUrl = (posterPath) => {
    if (posterPath) {
      return `https://image.tmdb.org/t/p/w500/${posterPath}`;
    }
  };
  
  const elegirPeli = (movie) => {
    emit('peliculaElegida', movie);
  };
  
  onMounted(() => {
    getWatchlistMovies();
  });
  
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas) 



  </script>
  
<style scoped lang="scss">
@import '_styles.scss';

.card-hover-wrapper {
  position: relative;
  .card-body {
    h5{
      background-color: $color-cuarto;
      color: $color-primario;
    }
      span{background-color: $color-cuarto;
      color: $color-primario;}
    }
  .btn-delete {
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: none;
    z-index: 2;
    padding: 0.375rem 0.75rem; 
    font-size: 1rem;
    font-weight: 400; 
    line-height: 1.5; 
    text-align: center; 
    white-space: nowrap; 
    vertical-align: middle; 
    border: 1px solid transparent; 
    border-color: #dc3545; 
    color: #dc3545; 
    background-color: transparent;
    border-radius: 0.25rem; 
    cursor: pointer; 
    transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out; 
    &:hover {
      color: #fff;
      background-color: #dc3545; 
      border-color: #dc3545; 
    }
  }

  &:hover .btn-delete {
    display: block;
  }
}

h1 {
  color: #E0E0FF;
  
}


h3 {
  margin-top: 20px;
}
</style>
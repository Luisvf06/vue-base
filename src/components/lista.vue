<template>
  <div class="row">
    <div v-for="movie in movies" :key="movie.id" class="col-md-4 mb-4" @click="elegirPeli(movie.id)">
      <a :href="'/Detalles/'+movie.id" class="card-link">
      <div class="card">
        <img :src="getMovieImageUrl(movie.poster_path)" class="card-img-top" alt="Movie Poster">
        <span v-if="movie.vote_average.toFixed(2) >= 8.55" class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
          {{ movie.vote_average.toFixed(2) }}
        </span>
        <span v-else-if="movie.vote_average.toFixed(2) >= 7.0" class="position-absolute top-0 start-100 translate-middle p-2 bg-warning border border-light rounded-circle">
          {{ movie.vote_average.toFixed(2) }}
        </span>
        <span v-else class="position-absolute top-0 start-100 translate-middle p-2 bg-info border border-light rounded-circle">
          {{ movie.vote_average.toFixed(2) }}
        </span>
        <div class="card-body">
          <h5 class="card-title">{{ movie.title }}</h5>
          <span>{{ movie.overview.substring(0,200)+'...' }}</span>
        </div>
      </div>
      </a>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue';
import { useRoute } from 'vue-router';
const emit = defineEmits(['peliculaElegida']);

const apiKey = ref('4431fed8390b02d6c28655feb536156a');
const movies = ref([]);

const getTopRatedMovies = () => {
  fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey.value}`)
    .then(response => response.json())
    .then(data => {
      movies.value = data.results;
      movies.value.sort((a, b) => b.vote_average - a.vote_average);
    });
};

const getMovieImageUrl = (posterPath) => {
  if (posterPath) {
    return `https://image.tmdb.org/t/p/w500/${posterPath}`;
  }
};

const elegirPeli = (movieId) => {
  emit('peliculaElegida', movieId);
};

onMounted(() => {
  getTopRatedMovies();
});
</script>

<style scoped lang="scss">

@import '_styles.scss';
  /* Estilos para anular el formato de enlace */
  .card-link {
    text-decoration: none; /* Quita el subrayado */
    color: inherit; /* Hereda el color del texto */
    cursor: pointer; /* Cambia el cursor al pasar sobre el enlace */
  }

  .card-link:hover {
    color: inherit; /* Hereda el color del texto al pasar sobre el enlace */
  }
</style>

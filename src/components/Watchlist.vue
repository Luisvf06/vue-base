<template>
<h1>Películas vistas</h1>  
<div class="row">
    <div v-for="movie in movies" :key="movie.id" class="col-md-4 mb-4" @click="elegirPeli(movie)">
      <div class="card">
        <img :src="getMovieImageUrl(movie.poster_path)" class="card-img-top" alt="Movie Poster">
        <div class="card-body">
          <h5 class="card-title">{{ movie.title }}</h5>
          <span>Idioma original: {{ movie.original_language }}</span>
          <br>
          <span>{{ movie.overview.substring(0,200)+'...' }}</span>
        </div>
      </div>
    </div>
  </div>          
</template>

<script setup>
import { ref, onMounted, defineEmits } from 'vue';

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

const elegirPeli = (movie) => {
  emit('peliculaElegida', movie);
};

onMounted(() => {
  getTopRatedMovies();
});
</script>

<style lang="scss" scoped>
h1 {
    text-decoration: underline;
}
h3 {
    margin-top: 20px;
}
</style>

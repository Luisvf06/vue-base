<template>
  <div id="carouselExampleSlidesOnly" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-inner">
      <div v-for="(movie, index) in movies" :key="index" :class="{ 'carousel-item': true, 'active': index === 0 }" data-bs-interval="4000">
        <a :href="'/Detalles/'+movie.id" class="card-link">
        <img :src="getMovieImageUrl(movie.backdrop_path)" class="d-block w-100" alt="Movie Poster" @click="elegirPelicula(movie)">
        </a>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, defineEmits } from 'vue'
const emit = defineEmits(['peliculaElegida']);
const apiKey = ref('4431fed8390b02d6c28655feb536156a')
const bearerToken = ref('eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDMxZmVkODM5MGIwMmQ2YzI4NjU1ZmViNTM2MTU2YSIsInN1YiI6IjY1YThmOTNlYzRmNTUyMDEyNzhlNjU2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nArKWLxihtW5aycNC-GAqUwF7JGeo_Rj13o_5ZA7K3w')
const movies = ref([])
const getTopRatedMovies = () => {
  fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey.value}`)
    .then(response => response.json())
    .then(data => {
      movies.value = data.results;
      movies.value.sort((a, b) => b.vote_average - a.vote_average);
    });
};
const getMoviesUrlApi = () => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=' + apiKey.value)
        .then(response => response.json())
        .then(data => movies.value = data.results.slice(0,3))
        
}
const getMoviesHeaderApi = () => {
    fetch('https://api.themoviedb.org/3/movie/popular', {
        headers: {
            'Authorization': 'Bearer ' + bearerToken.value
        }
    })
        .then(response => response.json())
        .then(data => movies.value = data.results)
}
onMounted(() => {
  getMoviesUrlApi()
})


const seleccionarPelicula = (pelicula) => {
  emit('peliculaElegida', pelicula);
};
const getMovieImageUrl = (posterPath) => {
    if (posterPath) {
        return 'https://image.tmdb.org/t/p/w500/' + posterPath;
    }
}
</script>
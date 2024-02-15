<template>
  <div class="row">
    <div v-for="pelicula in peliculas" :key="pelicula.id" class="col-md-4 mb-4" @click="elegirPelicula(pelicula)">
      <div class="card">
        <img :src="getImagenPelicula(pelicula.poster_path)" class="card-img-top" alt="Movie Poster">
        <span v-if="pelicula.vote_average.toFixed(2) >= 8.55" class="position-absolute top-0 start-100 translate-middle p-2 bg-danger border border-light rounded-circle">
          {{ pelicula.vote_average.toFixed(2) }}
        </span>
        <span v-else-if="pelicula.vote_average.toFixed(2) >= 7.0" class="position-absolute top-0 start-100 translate-middle p-2 bg-warning border border-light rounded-circle">
          {{ pelicula.vote_average.toFixed(2) }}
        </span>
        <span v-else class="position-absolute top-0 start-100 translate-middle p-2 bg-info border border-light rounded-circle">
          {{ pelicula.vote_average.toFixed(2) }}
        </span>
        <div class="card-body">
          <h5 class="card-title">{{ pelicula.title }}</h5>
          <span>{{ pelicula.overview.substring(0, 200) + '...' }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const apiKey = ref('4431fed8390b02d6c28655feb536156a');
const bearerToken = ref('eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDMxZmVkODM5MGIwMmQ2YzI4NjU1ZmViNTM2MTU2YSIsInN1YiI6IjY1YThmOTNlYzRmNTUyMDEyNzhlNjU2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nArKWLxihtW5aycNC-GAqUwF7JGeo_Rj13o_5ZA7K3w');
const peliculas = ref([]);

const obtenerPeliculasDesdeAPI = () => {
    fetch('https://api.themoviedb.org/3/movie/popular?api_key=' + apiKey.value)
        .then(response => response.json())
        .then(data => peliculas.value = data.results.slice(0, 3))
}

const obtenerPeliculasConHeaderAPI = () => {
    fetch('https://api.themoviedb.org/3/movie/popular', {
        headers: {
            'Authorization': 'Bearer ' + bearerToken.value
        }
    })
        .then(response => response.json())
        .then(data => peliculas.value = data.results)
}

onMounted(() => {
  obtenerPeliculasDesdeAPI()
})

const obtenerImagenPelicula = (rutaPoster) => {
    if (rutaPoster) {
        return 'https://image.tmdb.org/t/p/w500/' + rutaPoster;
    }
}
</script>

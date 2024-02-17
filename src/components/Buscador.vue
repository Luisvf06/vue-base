<template>
  <div class="row">
    <div v-for="pelicula in peliculas" :key="pelicula.id" class="col-md-4 mb-4">
      <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4 position-relative">
            <img :src="getImagenPelicula(pelicula.poster_path)" class="img-fluid rounded-start" alt="Movie Poster">
            <div class="position-absolute start-0 translate-middle-y p-2" style="width: 100%;">
              <span v-if="pelicula.vote_average.toFixed(2) >= 8.55" class="bg-danger rounded p-1 text-white">
                {{ pelicula.vote_average.toFixed(2) }}
              </span>
              <span v-else-if="pelicula.vote_average.toFixed(2) >= 7.0" class="bg-warning rounded p-1 text-white">
                {{ pelicula.vote_average.toFixed(2) }}
              </span>
              <span v-else class="bg-info rounded p-1 text-white">
                {{ pelicula.vote_average.toFixed(2) }}
              </span>
            </div>
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">{{ pelicula.title }}</h5>
              <p class="card-text">{{ pelicula.overview.substring(0, 200) + '...'}}</p>
              <p class="card-text">{{ 'Fecha de salida: ' + pelicula.release_date }}</p>
              <p class="card-text">{{ 'Fecha de salida: ' + pelicula.original_language }}</p>
              

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from'vue-router';
const apiKey = '4431fed8390b02d6c28655feb536156a';
const peliculas = ref([]);
const route = useRoute();

const realizarBusquedaAPI = async () => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${route.query.cadena}`);
    const data = await response.json();
    peliculas.value = data.results;
  } catch (error) {
    console.error('Error al buscar películas:', error);
  }
}

onMounted(() => {
  if (route.query.cadena) {
    realizarBusquedaAPI();
  }
});

const getImagenPelicula = (rutaPoster) => {
  if (rutaPoster) {
    return 'https://image.tmdb.org/t/p/w500/' + rutaPoster;
  }
}

const elegirPelicula = (pelicula) => {
  // Lógica para elegir una película
}
</script>

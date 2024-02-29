<template>
  <div>
    <label for="customRange3" class="form-label">Filtrar por popularidad</label>
    <input type="range" class="form-range" min="0" max="10" step="0.5" id="customRange3" v-model="rangoPopularidad">
    <p>Valoración de la comunidad: {{ rangoPopularidad }}</p>
    <div class="btn-group" role="group" aria-label="Basic radio toggle button group">
  <input type="radio" class="btn-check" name="ordenacion" id="asc" autocomplete="off" v-model="ordenacion" value="asc">
  <label class="btn btn-outline-primary" for="asc">Menos recientes</label>

  <input type="radio" class="btn-check" name="ordenacion" id="desc" autocomplete="off" v-model="ordenacion" value="desc">
  <label class="btn btn-outline-primary" for="desc">Más recientes</label>

  <input type="radio" class="btn-check" name="ordenacion" id="none" autocomplete="off" v-model="ordenacion" value="none">
  <label class="btn btn-outline-primary" for="none">No ordenar</label>
</div>

    <div class="row">
      
      <div v-for="pelicula in peliculasOrdenadas" :key="pelicula.id" class="col-md-4 mb-4">
  <a :href="'/Detalles/'+pelicula.id" class="card-link">
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
            <p class="card-text">{{ 'Idioma original: ' + pelicula.original_language }}</p>
          </div>
        </div>
      </div>
    </div>
  </a>
</div>

    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRoute } from 'vue-router';

const apiKey = '4431fed8390b02d6c28655feb536156a';
const peliculas = ref([]);
const route = useRoute();
const rangoPopularidad = ref(0);
const ordenacion = ref('none');

const realizarBusquedaAPI = async () => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${route.query.cadena}`);
    const data = await response.json();
    peliculas.value = data.results;
  } catch (error) {
    console.error('Error al buscar películas:', error);
  }
};

const getImagenPelicula = (rutaPoster) => {
  if (rutaPoster) {
    return 'https://image.tmdb.org/t/p/w500/' + rutaPoster;
  }
};

const peliculasFiltradas = computed(() => {
  return peliculas.value.filter(pelicula => pelicula.vote_average >= rangoPopularidad.value);
});

const peliculasOrdenadas = computed(() => {
  if (ordenacion.value === 'asc') {
    return peliculasFiltradas.value.slice().sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
  } else if (ordenacion.value === 'desc') {
    return peliculasFiltradas.value.slice().sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
  } else {
    return peliculasFiltradas.value;
  }
});

const ordenarPorFecha = (tipo) => {
  ordenacion.value = tipo;
};

const elegirPelicula = (pelicula) => {
  
};


watch(() => route.query.cadena, () => {
  if (route.query.cadena) {
    realizarBusquedaAPI();
  } else {
    peliculas.value = []; 
  }
});


onMounted(() => {
  if (route.query.cadena) {
    realizarBusquedaAPI();
  }
});
</script>
<style scoped>
  
  .card-link {
    text-decoration: none;
    color: inherit;
    cursor: pointer; 
  }

  .card-link:hover {
    color: inherit; 
  }
</style>

<template>
    <div class="container mt-5">
      <div class="text-center">
        <h1 class="h">{{ actor.name }}</h1>
        <div v-if="actor.profile_path">
        <img  :src="getImageUrl(actor.profile_path)" alt="Foto del actor" class="img-fluid rounded-circle mb-3" style="max-width: 200px;">
        <p>{{ actor.biography }}</p>
        <p><strong>Fecha de nacimiento:</strong> {{ actor.birthday }}</p>
        <p><strong>Lugar de nacimiento:</strong> {{ actor.place_of_birth }}</p>
        </div>
        <div v-else>
          <img src="@/assets/sinfoto.jpg" class="img-fluid rounded-circle" alt="Foto del actor">
          <p>{{ actor.biography }}</p>
        <p><strong>Fecha de nacimiento:</strong> {{ actor.birthday }}</p>
        <p><strong>Lugar de nacimiento:</strong> {{ actor.place_of_birth }}</p>
        </div>
        
  
        
        <div v-if="movieCredits.cast.length">
          <h2 class="h">Películas</h2>
          <div class="row">
            <div v-for="movie in movieCredits.cast" :key="movie.id" class="col-sm-6 col-md-4 col-lg-3 mb-4">
                <a :href="'/Detalles/'+movie.id" class="card-link">
              <div class="card" v-if="movie.poster_path">
                <img :src="getImageUrl(movie.poster_path)" class="card-img-top" alt="Póster de la película">
                <div class="card-body">
                  <h5 class="card-title">{{ movie.title }}</h5>
                  <p class="card-text descripcion">{{ movie.release_date.substring(0, 4) }}</p>
                </div>
              </div>
              <div v-else>
                <img src="@/assets/sinfoto2.jpg" class="card-img-top" alt="Póster de la película">
                <div class="card-body">
                  <h5 class="card-title">{{ movie.title }}</h5>
                  <p class="card-text descripcion">{{ movie.release_date.substring(0, 4) }}</p>
                </div>
              </div>
                </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const actor = ref({});
  const movieCredits = ref({ cast: [] });
  const route = useRoute();
  
  onMounted(() => {
    const actorId = route.params.id;
    fetchActorDetails(actorId);
    fetchActorMovies(actorId);
  });
  
  function fetchActorDetails(actorId) {
    const apiKey = '4431fed8390b02d6c28655feb536156a';
    fetch(`https://api.themoviedb.org/3/person/${actorId}?api_key=${apiKey}&language=es-ES`)
      .then(response => response.json())
      .then(data => {
        actor.value = data;
      })
      .catch(error => console.error('Error al obtener los detalles del actor:', error));
  }
  
  function fetchActorMovies(actorId) {
    const apiKey = '4431fed8390b02d6c28655feb536156a';
    fetch(`https://api.themoviedb.org/3/person/${actorId}/movie_credits?api_key=${apiKey}&language=es-ES`)
      .then(response => response.json())
      .then(data => {
        movieCredits.value = data;
      })
      .catch(error => console.error('Error al obtener las películas del actor:', error));
  }
  
  function getImageUrl(path) {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }
  </script>
  <style scoped lang="scss">
  @import '_styles.scss';
  .h{color:$color-sexto}
  .card-link {
    text-decoration: none;
    color: inherit;
    cursor: pointer;
    
    &:hover {
      color: inherit;
    }
  
    .card {
      border: 1px solid #ccc;
      border-radius: 8px; 
  
      img.card-img-top {
        border-top-left-radius: 8px; 
        border-top-right-radius: 8px; 
      }
  
      .card-body {
        padding: 1rem; 
      }
  
      .card-title {
        font-weight: bold; 
        margin-bottom: 0.5rem; 
        color:$color-primario;
      }
  
      .card-text {
        color: $color-quinto; 
      }
  
      
    }
  }
    </style>
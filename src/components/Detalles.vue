<template>
    <div>
      <h1>{{ pelicula.title }}</h1>
      <img :src="getImagenPelicula(pelicula.poster_path)" class="img-fluid rounded-start" alt="Movie Poster">

      <!-- Otros detalles de la película -->
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  var pelicula = ref([]);
  const route = useRoute();
  const getImagenPelicula = (rutaPoster) => {
  if (rutaPoster) {
    return 'https://image.tmdb.org/t/p/w500/' + rutaPoster;
  }
};
  onMounted(() => {
    getMoviesUrlApi()
  });
  const getMoviesUrlApi = () => {
    const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDMxZmVkODM5MGIwMmQ2YzI4NjU1ZmViNTM2MTU2YSIsInN1YiI6IjY1YThmOTNlYzRmNTUyMDEyNzhlNjU2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nArKWLxihtW5aycNC-GAqUwF7JGeo_Rj13o_5ZA7K3w'
  }
};

fetch('https://api.themoviedb.org/3/movie/'+route.params.id+'?language=en-US', options)
  .then(response => response.json())
  .then(data =>pelicula.value=data )
  .catch(err => console.error(err));
}
  </script>
  
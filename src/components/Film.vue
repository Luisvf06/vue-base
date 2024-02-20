<template>
    <div>
      <lista @peliculaElegida="manejarPeliculaElegida" />
      <p>{{ pelicula.title }}</p>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import lista from './lista.vue';
  
  const pelicula = ref(null);
  
  const manejarPeliculaElegida = (movie) => {
    pelicula.value = movie;
  };
  </script>
  
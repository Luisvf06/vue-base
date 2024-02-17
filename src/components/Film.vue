<template>
    <div>
      <!-- Agrega el componente hijo y escucha el evento -->
      <lista @peliculaElegida="manejarPeliculaElegida" />
      <p>{{ pelicula.title }}</p>
      <!-- Otros detalles de la película -->
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import lista from './lista.vue';
  
  const pelicula = ref(null);
  
  // Método para manejar la película seleccionada
  const manejarPeliculaElegida = (movie) => {
    pelicula.value = movie;
  };
  </script>
  
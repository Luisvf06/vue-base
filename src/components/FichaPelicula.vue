<template>
    <div>
      <!-- Button trigger modal -->
      <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Ver trailer
      </button>
  
      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Trailer {{ selectedMovie.original_title }}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <!-- Aquí puedes incluir el reproductor de video para el trailer de la película -->
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  // Define una variable reactiva para almacenar la información de la película seleccionada
  const selectedMovie = ref(null);
  
  // Escucha el evento 'peliculaElegida' emitido desde 'lista.vue'
  const onPeliculaElegida = (movie) => {
    selectedMovie.value = movie;
    console.log("hola")
  };
  </script>
  
  <style>
  /* Agrega tus estilos CSS personalizados aquí si es necesario */
  </style>
  
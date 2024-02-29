<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <Carrusel />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-10">
        <!-- Agregar el componente Lista y escuchar el evento peliculaElegida -->
        <Lista @peliculaElegida="mostrarDetalles" />
      </div>
    </div>
    <!-- Aquí se mostrarán los detalles de la película seleccionada -->
    <div class="row justify-content-center">
      <div class="col-md-10">
        <FichaPelicula v-if="peliculaSeleccionada" :pelicula="peliculaSeleccionada" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Carrusel from './Carrusel.vue'
import Lista from './lista.vue'
import FichaPelicula from './FichaPelicula.vue'
import { useRouter } from 'vue-router';

// Definir la variable reactiva para almacenar la película seleccionada
const peliculaSeleccionada = ref(null);
const router = useRouter();

// Función para mostrar los detalles de la película seleccionada
const mostrarDetalles = (pelicula) => {
  peliculaSeleccionada.value = pelicula;
  router.push({ name: 'film', params: { id: pelicula.id } });
};
</script>

<style lang="scss" scoped>
@import './_variables.scss';
@import './_styles.scss';
</style>
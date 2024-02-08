<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-10">
        <Carrusel />
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-md-10">
        <Lista />
      </div>
    </div>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import Carrusel from './Carrusel.vue'
import Lista from './lista.vue'
</script>

<style lang="scss" scoped>
$color-primario: #183b31;
$color-secundario: #C69774;
$color-terciario: #F8DFD4;
$color-cuarto: #FFEFE8;
header {
  background-color: $color-primario;
  h1 {
    text-decoration: underline;
    color: $color-terciario;
  }
  p {
    color: $color-cuarto;
  }
}
</style>


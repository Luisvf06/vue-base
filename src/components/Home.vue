<template>
  <div class="container">
    <div class="row">
      <header class="col-12">
       
      </header>

  <Carrusel />
</div>
</div>

</template>

<script setup>
import { ref } from 'vue';
import Carrusel from './Carrusel.vue'
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


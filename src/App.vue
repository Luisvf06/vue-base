<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <div class="container">
    <header class="row align-items-center">
      <img
        alt="Vue logo"
        class="logo col-2"
        src="./assets/logo.svg"
        width="125"
        height="125"
      />
      <nav class="col-7"> <!-- Modifica el tamaño de esta columna -->
        <a><RouterLink to="/">Home</RouterLink></a>
        <a><RouterLink to="/buscador">Buscador</RouterLink></a>
        <a><RouterLink to="/watchlist">watchlist</RouterLink></a>
        <a><RouterLink to="/film">Película</RouterLink></a>
      </nav>
      <div class="col-3"> <!-- Modifica el tamaño de esta columna -->
        <div class="d-flex align-items-center">
          <div class="mb-3 d-inline">
            <input type="text" class="form-control" id="buscador" aria-describedby="buscador" placeholder="Buscar película...">
          </div>
          <button type="submit" class="btn btn-primary ml-2">Submit</button>
        </div>
      </div>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>


<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}
</style>

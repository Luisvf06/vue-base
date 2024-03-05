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
      <nav class="navbar navbar-expand-lg ">
        <div class="container-fluid">
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item">
                <a class="nav-link active" aria-current="page" ><RouterLink to="/">Home</RouterLink></a>
              </li>
              <li class="nav-item">
                <a class="nav-link active" aria-current="page"><RouterLink to="/watchlist">Watchlist</RouterLink></a>
              </li>
            </ul>
            <form @submit.prevent="realizarBusqueda" class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" v-model="textoBusqueda">
              <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
      
    </header>
    <breadcrumb />
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from "vue-router";
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import breadcrumb from './components/breadcrumb.vue'
const textoBusqueda = ref('');
const router = useRouter();

const realizarBusqueda = () => {
  router.push({ path: '/buscador', query: { cadena: textoBusqueda.value } });
};


const manejarSeleccionPelicula = (pelicula) => {
  router.push({ name: 'film', params: { id: pelicula.id } });
};
</script>

<style scoped lang="scss">
@import 'components/_styles.scss';

header {
  background-color: $color-primario;
  color: $color-terciario;
  line-height: 1.5;
  padding: 1rem 0;
}

.logo {
  display: block;
  margin: 0 auto;
  width: 125px; 
}

nav.navbar {
  background-color: $color-terciario;
  .nav-link {
    color: $color-cuarto;
    &:hover {
      color: lighten($color-cuarto, 10%); 
    }
    a{ color: $color-quinto;
      text-decoration: none;}
  }
}
</style>

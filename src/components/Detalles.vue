<template>
  <div class="container">
    <h1>{{ pelicula.title }}</h1>
    <img :src="getImagenPelicula(pelicula.poster_path)" class="img-fluid rounded-start mb-3" alt="Movie Poster">
    
    <!-- Botones con estilo de Bootstrap -->
    <div class="d-flex justify-content-start mb-3">
      <button @click="agregarAPeliculaAWatchlist" class="btn btn-primary me-2">Agregar a Watchlist</button>
      <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
        Películas Recomendadas
      </button>
    </div>

    <!-- Contenedor de colapso para Películas Recomendadas -->
<!-- Contenedor de colapso para Películas Recomendadas -->
<div style="min-height: 120px;">
  <div class="collapse collapse-horizontal" id="collapseWidthExample">
    <div class="card card-body">
      <!-- Utiliza 'row' para envolver las recomendaciones -->
      <div class="row">
        <div v-for="recomendacion in recomendaciones" :key="recomendacion.id" class="col-sm-6 col-md-4 col-lg-3 mb-3">
          <a :href="'/Detalles/'+recomendacion.id" class="card-link">
          <div class="card">
            <img :src="getImagenPelicula(recomendacion.poster_path)" class="card-img-top" :alt="recomendacion.title">
            <div class="card-body">
              <h5 class="card-title">{{ recomendacion.title }}</h5>
            </div>
          </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
<div v-if="proveedores && proveedores.ES && proveedores.ES.flatrate">
      <h3>Disponible en:</h3>
      <div class="proveedores">
        <div v-for="proveedor in proveedores.ES.flatrate" :key="proveedor.provider_id">
          <img :src="`https://image.tmdb.org/t/p/original${proveedor.logo_path}`" :alt="proveedor.provider_name" class="logo-proveedor">
        </div>
      </div>
    </div>


    <!-- Otros detalles de la película y reparto -->
    <div class="reparto">
  <h2>Reparto</h2>
  <div class="row">
    <div v-for="actor in reparto" :key="actor.id" class="col-sm-6 col-md-4 col-lg-3 mb-4">
      <router-link :to="`/actor/${actor.id}`">
        <img :src="getImagenActor(actor.profile_path)" class="img-fluid rounded-circle" alt="Foto del actor">
        <p class="mt-2">{{ actor.name }}</p>
      </router-link>
    </div>
  </div>
</div>
  </div>
  
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const pelicula = ref({});
const reparto = ref([]);
const route = useRoute();
const recomendaciones = ref([]);
const proveedores = ref({});
const getImagenPelicula = (rutaPoster) => {
  return rutaPoster ? `https://image.tmdb.org/t/p/w500/${rutaPoster}` : '';
};

const getImagenActor = (rutaFoto) => {
  return rutaFoto ? `https://image.tmdb.org/t/p/w500/${rutaFoto}` : '';
};
const getRecomendacionesPelicula = () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDMxZmVkODM5MGIwMmQ2YzI4NjU1ZmViNTM2MTU2YSIsInN1YiI6IjY1YThmOTNlYzRmNTUyMDEyNzhlNjU2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nArKWLxihtW5aycNC-GAqUwF7JGeo_Rj13o_5ZA7K3w'
    }
  };

  fetch(`https://api.themoviedb.org/3/movie/${route.params.id}/recommendations?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(data => {
      recomendaciones.value = data.results;
    })
    .catch(err => console.error(err));
};
onMounted(() => {
  getMoviesUrlApi();
  getRepartoPelicula();
  getRecomendacionesPelicula();
  obtenerProveedoresPelicula();
});

const getMoviesUrlApi = () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDMxZmVkODM5MGIwMmQ2YzI4NjU1ZmViNTM2MTU2YSIsInN1YiI6IjY1YThmOTNlYzRmNTUyMDEyNzhlNjU2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nArKWLxihtW5aycNC-GAqUwF7JGeo_Rj13o_5ZA7K3w'
    }
  };

  fetch(`https://api.themoviedb.org/3/movie/${route.params.id}?language=en-US`, options)
    .then(response => response.json())
    .then(data => pelicula.value = data)
    .catch(err => console.error(err));
};
function obtenerProveedoresPelicula() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDMxZmVkODM5MGIwMmQ2YzI4NjU1ZmViNTM2MTU2YSIsInN1YiI6IjY1YThmOTNlYzRmNTUyMDEyNzhlNjU2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nArKWLxihtW5aycNC-GAqUwF7JGeo_Rj13o_5ZA7K3w'
        }
    };

    fetch(`https://api.themoviedb.org/3/movie/${route.params.id}/watch/providers`, options)
        .then(response => response.json())
        .then(data => {
            proveedores.value = data.results;
        })
        .catch(err => console.error(err));
}
const getRepartoPelicula = () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDMxZmVkODM5MGIwMmQ2YzI4NjU1ZmViNTM2MTU2YSIsInN1YiI6IjY1YThmOTNlYzRmNTUyMDEyNzhlNjU2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nArKWLxihtW5aycNC-GAqUwF7JGeo_Rj13o_5ZA7K3w'
    }
  };

  fetch(`https://api.themoviedb.org/3/movie/${route.params.id}/credits?language=en-US`, options)
    .then(response => response.json())
    .then(data => {
      reparto.value = data.cast;
    })
    .catch(err => console.error(err));
};

const agregarAPeliculaAWatchlist = () => {
  const options = {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'content-type': 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0NDMxZmVkODM5MGIwMmQ2YzI4NjU1ZmViNTM2MTU2YSIsInN1YiI6IjY1YThmOTNlYzRmNTUyMDEyNzhlNjU2OSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nArKWLxihtW5aycNC-GAqUwF7JGeo_Rj13o_5ZA7K3w'
    },
    body: JSON.stringify({
      media_type: 'movie',
      media_id: pelicula.value.id, // Asegúrate de que 'pelicula.value.id' tenga el ID correcto de la película
      watchlist: true
    })
  };

  fetch(`https://api.themoviedb.org/3/account/{account_id}/watchlist`, options) // Sustituye {account_id} por tu ID de cuenta real
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Película agregada a la watchlist con éxito');
        // Aquí puedes agregar cualquier lógica adicional tras una adición exitosa
      } else {
        alert('Hubo un error al agregar la película a la watchlist');
        // Puedes manejar errores específicos aquí
      }
    })
    .catch(err => {
      console.error(err);
      alert('Ocurrió un error al intentar agregar la película a la watchlist');
      // Manejo de errores de red o del servidor
    });
};
</script>
<style scoped lang="scss">
@import '_styles.scss';

/* Centra el contenido de la página */
div {
  text-align: center;
}

/* Ajustes para la imagen de la película */
img.img-fluid.rounded-start {
  max-width: 80%; /* Ajusta el ancho de la imagen de la película */
  margin: 0 auto; /* Centra la imagen */
}

/* Estilos para el reparto */
.reparto {
  h2 {
    margin-top: 2rem;
  }

  .row {
    justify-content: center; /* Centra las tarjetas de los actores */
  }

  .col-md-3 {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
  }

  img {
    width: 100px; /* Reduce el tamaño de las fotos de los actores */
    height: auto; /* Mantiene la proporción de las fotos */
    border-radius: 50%; /* Hace las imágenes circulares para un estilo más elegante */
  }
}

/* Estilos para anular el formato de enlace */
.card-link {
  text-decoration: none; /* Quita el subrayado */
  color: inherit; /* Hereda el color del texto */
  cursor: pointer; /* Cambia el cursor al pasar sobre el enlace */
}

.card-link:hover {
  color: inherit; /* Hereda el color del texto al pasar sobre el enlace */
}
</style>
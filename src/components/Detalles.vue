<template>
<div class="container">
  <h1 class="peliculatitulo" id="titulo">{{ pelicula.title }}</h1>
  <div v-if="pelicula.poster_path" class="contenedor-imagen">
    <img :src="getImagenPelicula(pelicula.poster_path)" class="img-fluid rounded-start mb-3" alt="Movie Poster">
  </div>
  <div v-else class="contenedor-imagen">
    <img src="@/assets/sinfoto2.jpg" class="img-fluid" alt="Foto de la película">
  </div>

    
    <div class="d-flex justify-content-around mb-3">
      <button @click="agregarAPeliculaAWatchlist" class="btn me-3">Agregar a Watchlist</button>
      <button class="btn  me-3" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">
        Películas Recomendadas
      </button>
      <button class="btn" type="button" data-bs-toggle="modal" data-bs-target="#trailerModal">
        Ver Tráiler
      </button>
    </div>




<div class="modal fade" id="trailerModal" tabindex="-1" aria-labelledby="trailerModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="trailerModalLabel">{{ pelicula.title }} - Tráiler</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <iframe width="100%" height="480" :src="trailerUrl" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </div>
  </div>
</div>


<div style="min-height: 120px;">
  <div class="collapse collapse-horizontal" id="collapseWidthExample">
    <div class="card card-body">
      
      <div class="row">
        <div v-for="recomendacion in recomendaciones" :key="recomendacion.id" class="col-sm-6 col-md-4 col-lg-3 mb-3">
          <a :href="'/Detalles/'+recomendacion.id" class="card-link">
          <div class="card">
            <img :src="getImagenPelicula(recomendacion.poster_path)" class="card-img-top" :alt="recomendacion.title">
            <div class="card-body">
              <h5 class="card-title detalles">{{ recomendacion.title }}</h5>
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
      <div class="proveedores d-flex justify-content-around mb-3">
        <div v-for="proveedor in proveedores.ES.flatrate" :key="proveedor.provider_id">
          <img :src="`https://image.tmdb.org/t/p/original${proveedor.logo_path}`" :alt="proveedor.provider_name" class="logo-proveedor">
        </div>
      </div>
    </div>



    <div class="reparto">
  <h2>Reparto</h2>
  <div class="row">
    <div v-for="actor in reparto" :key="actor.id" class="col-sm-6 col-md-4 col-lg-3 mb-4">
      
      <router-link :to="`/actor/${actor.id}`">
        <div v-if="actor.profile_path">
        <img :src="getImagenActor(actor.profile_path)" class="img-fluid rounded-circle" alt="Foto del actor">
        <p class="mt-2">{{ actor.name }}</p>
        </div>
        <div v-else>
        <img src="@/assets/sinfoto.jpg" class="img-fluid rounded-circle" alt="Foto del actor">
        <p class="mt-2">{{ actor.name }}</p>
        </div>
      </router-link>
    </div>
  </div>
</div>
  </div>
  
</template>


<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
const trailerUrl = ref('');
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

const obtenerTrailerPelicula = async () => {
  const movieId = route.params.id; 
  const apiKey = '4431fed8390b02d6c28655feb536156a'; 
  const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}&language=en-US`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Respuesta de red no fue ok');

    const data = await response.json();
    const trailers = data.results.filter(video => video.type === 'Trailer' && video.site === 'YouTube');
    if (trailers.length > 0) {
      trailerUrl.value = `https://www.youtube.com/embed/${trailers[0].key}`;
    } else {
      console.log('No se encontraron tráilers para esta película.');
    }
  } catch (error) {
    console.error('Error al obtener el tráiler de la película:', error);
  }
};

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
      media_id: pelicula.value.id, 
      watchlist: true
    })
  };

  fetch(`https://api.themoviedb.org/3/account/{account_id}/watchlist`, options) 
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert('Película agregada a la watchlist con éxito');
        
      } else {
        alert('Hubo un error al agregar la película a la watchlist');
        
      }
    })
    .catch(err => {
      console.error(err);
      alert('Ocurrió un error al intentar agregar la película a la watchlist');
      
    });
};
onMounted(() => {
  getMoviesUrlApi();
  getRepartoPelicula();
  getRecomendacionesPelicula();
  obtenerProveedoresPelicula();
  obtenerTrailerPelicula();
});
</script>
<style  scoped lang="scss">
@import '_styles.scss';

div {
  text-align: center;
  .contenedor-imagen {
  display: flex; 
  justify-content: center; 
  align-items: center; 
  width: 400px;
  height: 580px; 
  margin: auto; 
  border-radius: 10px; 
  overflow: hidden; 
  }
}
:deep(.modal-body) {
  background-color: #557593;
}
#titulo{
  color:$color-sexto;
}
.btn{
  background-color: $color-terciario;
  color:$color-quinto;
}
.reparto{
  background-color: #577898;
  a{
    color: $color-primario;
    padding: 2rem 0;
    text-decoration: none;
}
img.img-fluid.rounded-start {
  max-width: 80%;
  margin: 20px auto;
  border-radius: 10px; 
}
.card-body{background-color: #557593;}

  
  h2 {
    color: $color-quinto;
  }


  .row {
    justify-content: center;
  }

  .col-md-3 {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 1rem;
  }

  img {
    max-width: 100px;
    
    height: auto;
    border-radius: 50%;

  }

}
h3{
  color: $color-sexto;
}
</style>

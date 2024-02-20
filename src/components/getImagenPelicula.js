export default function getImagenPelicula(rutaPoster) {
    if (rutaPoster) {
      return 'https://image.tmdb.org/t/p/w500/' + rutaPoster;
    }
  }
  
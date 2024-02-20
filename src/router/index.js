// router/router.js

import { createRouter, createWebHistory } from 'vue-router'
// Import your components
import Home from '@/components/Home.vue';
import GetApi from '@/components/GetApi.vue';
import Buscador from '@/components/Buscador.vue';
import Film from '@/components/Film.vue';
import Watchlist from '@/components/Watchlist.vue';
import Carrusel from '@/components/Carrusel.vue'
// Define your routes
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/getapi',
      name: 'getapi',
      component: GetApi
    },
    {
      path:'/buscador',
      component: Buscador
    },
    {
      path:'/film/:id',
      name: 'Film',
      component: Film
    },
    {
      path: '/watchlist',
      name: 'watchlist',
      component: Watchlist
    },
    {
      path:'/carrusel',
      name: 'carrusel',
      component: Carrusel
    }
  ]
})
// Create the router instance

export default router;

// router/router.js

import { createRouter, createWebHistory } from 'vue-router'
// Import your components
import Home from '@/components/Home.vue';
import Buscador from '@/components/Buscador.vue';
import Film from '@/components/Film.vue';
import Watchlist from '@/components/Watchlist.vue';
import Carrusel from '@/components/Carrusel.vue';
import Detalles from '@/components/Detalles.vue';
import actor from '@/components/actor.vue'
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
      path:'/buscador',
      component: Buscador
    },
    {
      path:'/film/:id',
      name: 'Film',
      component: Film
    },
    {
      path:'/Detalles/:id',
      name: 'Detalles',
      component: Detalles
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
    ,
    {path:'/actor/:id',
  name:'actor',
  component:actor}
  ]
})
// Create the router instance

export default router;

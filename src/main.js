import './assets/main.css'



import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

import {library} from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {faHome} from '@fortawesome/free-solid-svg-icons'

library.add(faHome)

import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index.js'

const app = createApp(App)

app.use(router)

app.mount('#app')
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'

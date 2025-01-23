import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './assets/tailwind.css';

// Importaciones de FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

// Agregar íconos a la librería
library.add(faUser, faCoffee);

const app = createApp(App);

// Registrar el componente globalmente
app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router).mount('#app');



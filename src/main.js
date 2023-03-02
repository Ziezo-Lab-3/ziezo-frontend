import { createApp } from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';

import './style.css';
import 'primeicons/primeicons.css';

const app = createApp(App);
app.use(PrimeVue);

createApp(App).mount('#app');

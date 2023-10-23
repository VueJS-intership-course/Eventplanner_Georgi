import { createApp } from 'vue'
import '@/styles/style.css'
import App from '@/App.vue'
import highChart from '@/plugins/highChart.js';
import router from '@/router/index.js';
import { createPinia } from 'pinia';
import firebaseData from '@/firebase/firebase-config.js';
import { authStore } from '@/store/authStore/authStore.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(highChart);

const store = authStore()

firebaseData.fireAuth.onAuthStateChanged((user) => {
    if (user) {
        store.setCurrentUser(user);
    } else {
        store.setCurrentUser(null);
    }
});

app.mount('#app');

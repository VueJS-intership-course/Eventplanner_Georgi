import { createApp } from 'vue'
import '@/styles/style.scss'
import App from '@/App.vue'
import highChart from '@/plugins/highChart.js';
import TimeConvertor from './plugins/TimeConvertor';
import router from '@/router/index.js';
import { createPinia } from 'pinia';
import firebaseData from '@/firebase/firebase-config.js';
import { authStore } from '@/store/auth/authStore.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import authServices from './services/authServices/authServices';

const pinia = createPinia();
const app = createApp(App);

app.use(pinia);
app.use(router);
app.use(highChart);
app.use(TimeConvertor)
const store = authStore()

firebaseData.fireAuth.onAuthStateChanged(async (user) => {
    if (user) {
        const userData = await authServices.getUserData(user.uid)
        store.setCurrentUser(userData);
    } else {
        store.setCurrentUser(null);
    }
});

app.mount('#app');

import { createApp, markRaw } from 'vue'
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
import 'bootstrap/dist/js/bootstrap';
import authServices from './services/authServices/authServices';

const pinia = createPinia();
pinia.use(({ store }) => {
    store.router = markRaw(router)
  });
const app = createApp(App);

app.use(pinia);
app.use(highChart);
app.use(TimeConvertor);
app.use(router);

const store = authStore();


export function authStateChangedPromise() {
    return new Promise((resolve, reject) => {
        const unsubscribe = firebaseData.fireAuth.onAuthStateChanged(async (user) => {
            if (user) {
                try {
                    const userData = await authServices.getUserData(user.email);
                    store.setCurrentUser(userData);
                    unsubscribe();
                    resolve(userData);
                } catch (error) {
                    reject(error); 
                }
            } else {
                store.setCurrentUser(null);
                unsubscribe(); 
                resolve(null); 
            }
        });
    });
}

authStateChangedPromise()


app.mount('#app');

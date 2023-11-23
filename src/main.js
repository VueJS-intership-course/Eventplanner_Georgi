import { createApp, markRaw } from 'vue'
import '@/styles-config/bootstrap-config.js'
import '@/styles/style.scss';
import App from '@/App.vue'
import router from '@/router/index.js';
import { createPinia } from 'pinia';
import firebaseData from '@/firebase/firebase-config.js';
import { authStore } from '@/store/auth/authStore.js';
import authServices from '@/services/authServices/authServices.js';
import commonTemplates from '@/plugins/common-templates.js';
import highChart from '@/plugins/highChart.js';
import TimeConvertor from '@/plugins/TimeConvertor.js';

const pinia = createPinia();
pinia.use(({ store }) => {
    store.router = markRaw(router)
});

const app = createApp(App);

app.use(pinia);
app.use(highChart);
app.use(TimeConvertor);
app.use(commonTemplates)


const store = authStore();

await new Promise((resolve, reject) => {
    firebaseData.fireAuth.onAuthStateChanged(async (user) => {
        if (user) {
            try {
                const userData = await authServices.getUserData(user.email);
                store.setCurrentUser(userData);
                resolve(userData);
            } catch (error) {
                reject(error);
            }
        } else {
            store.setCurrentUser(null);
            resolve(null);
        }
    });
});

app.use(router);
app.mount('#app');

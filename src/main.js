import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import highChart from './plugins/highChart';

const app = createApp(App);

app.use(highChart)

app.mount('#app')

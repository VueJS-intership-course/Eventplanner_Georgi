import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";

const router = createRouter({
    history:createWebHistory(),
    routes: [
        ...routes, 
        {
            path: '/:pathMatch(.*)*',
            name: 'Not-Found',
            component: () => import('@/pages/NotFound.vue'),
        },
    ],
});

export default router;
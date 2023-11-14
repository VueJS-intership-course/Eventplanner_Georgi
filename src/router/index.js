import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import { authStore } from '../store/auth/authStore.js';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        ...routes,
        {
            path: '/:pathMatch(.*)*',
            name: 'Not-Found',
            component: () => import('@/pages/NotFound.vue'),
        },
    ],
    linkActiveClass: 'active'
});


router.beforeResolve(async (to, _, next) => {
    const store =  authStore();

    if (to.meta.isAuth && !store.currentUser) {
        next({ name: "SignIn-Page" });
    } else if (to.meta.notAuth && store.currentUser) {
        next({ name: "Home-Page" });
    } else if (to.meta.requireAdmin && !store.currentUser.isAdmin) {
        next({ name: 'Home-Page' })
    } else {
        next();
    }
});

export default router;
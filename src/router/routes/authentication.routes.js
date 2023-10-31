export default [
    {
        path: '/user-profile',
        name: 'Profile-Page',
        meta: { isAuth: true },
        component: () => import('@/pages/authentication/ProfilePage.vue'),
    },
    {
        path: '/signUp',
        name: 'SignUp-Page',
        meta:{notAuth: true},
        component: () => import('@/pages/authentication/RegisterPage.vue'),
    },
    {
        path: '/signIn',
        name: 'SignIn-Page',
        meta:{notAuth: true},
        component: () => import('@/pages/authentication/LoginPage.vue')
    }
];
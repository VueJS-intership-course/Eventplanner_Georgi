export default [
    {
        path: '/user-profile',
        name: 'Profile-Page',
        component: () => import('@/pages/authentication/ProfilePage.vue')
    },
    {
        path: '/signUp',
        name: 'SignUp-Page',
        component: () => import('@/pages/authentication/RegisterPage.vue')
    },
    {
        path: '/signIn',
        name: 'SignIn-Page',
        component: () => import('@/pages/authentication/LoginPage.vue')
    }
];
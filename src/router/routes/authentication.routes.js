
export default [
    {
        path: '/signIn',
        name: 'SignIn-Page',
        meta: { notAuth: true },
        component: () => import('@/pages/authentication/LoginPage.vue')
    }, 
    {
        path: '/signUp',
        name: 'SignUp-Page',
        meta: { notAuth: true },
        component: () => import('@/pages/authentication/RegisterPage.vue'),
    },
];
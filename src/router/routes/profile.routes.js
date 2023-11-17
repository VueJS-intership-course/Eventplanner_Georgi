export default [
    {
        path: '/user-profile',
        name: 'Profile-Page',
        meta: { isAuth: true },
        component: () => import('@/pages/profile/ProfilePage.vue'),
    },
]
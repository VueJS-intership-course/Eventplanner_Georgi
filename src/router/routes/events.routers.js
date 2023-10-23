export default [
    {
        path: '/catalog',
        name: 'Event-Catalog',
        component: () => import('@/pages/events/EventCatalog.vue'),
    },
    {
        path:'/catalog/:id',
        name: 'Single-Event',
        component: () => import('@/pages/events/SingleEvent.vue')
    }
]
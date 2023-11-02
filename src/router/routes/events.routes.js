export default [
    {
        path: '/catalog',
        name: 'Event-Catalog',
        component: () => import('@/pages/events/EventsPage.vue'),
    },
    {
        path:'/catalog/event/:id',
        name: 'Single-Event',
        component: () => import('@/pages/events/SingleEvent.vue'),
        props:true
    }
];
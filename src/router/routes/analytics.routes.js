export default [
    {
        path: '/analytics',
        name: 'Analytics-Page',
        component: () => import('@/pages/analytics/AnalyticsPage.vue'),
        meta: { requireAdmin: true }
    },
    {
        path: '/analytics/event/:id',
        name: 'Event-Analytics',
        component: () => import('@/pages/analytics/EventAnalytics.vue'),
        meta: { requireAdmin: true },
        props: true
    }
]
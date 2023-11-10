export default [
    {
        path: '/budget',
        name: 'Budget-Page',
        component: () => import('@/pages/budget/BudgetPage.vue'),
        meta: { requireAdmin: true }
    },
    {
        path: '/budget/event/:id',
        name: 'Event-Budget',
        component: () => import('@/pages/budget/EventBudget.vue'),
        meta: { requireAdmin: true },
        props: true
    }
]
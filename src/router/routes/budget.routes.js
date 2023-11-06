export default [
    {
        path: '/budget',
        name:'Budget-Page',
        component: () => import('@/pages/budget/BudgetPage.vue'),
        meta: { requireAdmin: true }
    }
]
import { lazy } from 'react'


const routes = [
    {
      path: '/dashboard', // the url
      component: lazy(() => import('../pages/private/Dashboard')), // view rendered, lazy loadingDashboard, // view rendered
    },
]

export default routes
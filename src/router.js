import { createWebHistory,createRouter } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('./components/HomePage.vue'),
    },
    {
        path : '/foodmenu',
        name : 'foodmenu',
        component: () => import('./components/FoodMenu.vue'),
    },
    {
        path : '/ordermenu',
        name : 'ordermenu',
        component: () => import('./components/OrderMenu.vue'),
    },

]

const router =  createRouter({
    history: createWebHistory(process.env.BASE_URL), //html file history mode
    routes
  })
  
  export default router;
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

]

const router =  createRouter({
    history: createWebHistory(process.env.BASE_URL), //html file history mode
    routes
  })
  
  export default router;
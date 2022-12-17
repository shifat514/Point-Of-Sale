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
        path : '/selectmenu',
        name : 'selectmenu',
        component: () => import('./components/SelectMenu.vue'),
    },
    {
        path : '/selectlayout',
        name : 'selectlayout',
        component: () => import('./components/layouts/SelectLayout.vue'),
    },
    {
        path : '/selectmenu',
        name : 'selectmenu',
        component: () => import('./components/SelectMenu.vue'),
    },
    {
        path : '/selecttable/:id',
        name : 'selecttable',
        props:true,
        component: () => import('./components/SelectTable.vue'),
    },
    {
        path : '/showtables/',
        name : 'showtables',
        
        component: () => import('./components/ShowTables.vue'),
    },

]

const router =  createRouter({
    history: createWebHistory(process.env.BASE_URL), //html file history mode
    routes
  })
  
  export default router;
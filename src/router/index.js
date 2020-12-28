import Vue from 'vue'
import VueRouter from 'vue-router'
import About from '@/views/About.vue'
import Detail from "@/views/Detail";
import List from "@/views/List";


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Root',
        redirect: '/errors'
    },
    {
        path: window.$elmah_root || '/elmah',
        name: 'Home',
        redirect: (window.$elmah_root || '/elmah') +"/errors"
    },
    {
        path: (window.$elmah_root || '/elmah')+ '/errors',
        name: 'Errors',
        component: List,
    },
    {
        path: (window.$elmah_root || '/elmah') + '/about',
        name: 'About',
        component: About,
    },
    {
        path: (window.$elmah_root || '/elmah') + '/detail/:id',
        name: 'Detail',
        component: Detail,
        props: true
    },
    {
        path: (window.$elmah_root || '/elmah') + '*',
        redirect: { name: 'Home' }
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
    linkExactActiveClass: 'exact-active',
    linkActiveClass: 'active',
    scrollBehavior (to, from, savedPosition) {
        return savedPosition || { x: 0, y: 0 }
    }
})

export default router

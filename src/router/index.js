import Vue from 'vue'
import VueRouter from 'vue-router'
import Errors from '@/views/Errors.vue'
import About from '@/views/About.vue'
import Detail from "@/views/Detail";


Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Root',
        redirect: (window.$elmah_root || '/elmah') +"/errors"
    },
    {
        path: window.$elmah_root || '/elmah',
        name: 'Home',
        redirect: (window.$elmah_root || '/elmah') +"/errors"
    },
    {
        path: (window.$elmah_root || '/elmah')+ '/errors',
        name: 'Errors',
        component: Errors,
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

import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export const constantRoutes = [
    {
        path: '/index',
        name: 'index',
        component: resolve => require(['@/views/index'], resolve)
    },
    {
        path: '/',
        name: '/',
        redirect:'/login',
    },
    {
        path: '/login',
        name: 'login',
        component: resolve => require(['@/views/login'], resolve)
    },
    {
        path: '/newStorage',
        name: 'newStorage',
        component: resolve => require(['@/views/newStorage'], resolve)
    },
    {
        path: '/checkTag',
        name: 'checkTag',
        component: resolve => require(['@/views/checkTag'], resolve)
    },
    {
        path: '/selProduct',
        name: 'selProduct',
        component: resolve => require(['@/views/selProduct'], resolve)
    },
    {
        path: '/storageRecord',
        name: 'storageRecord',
        component: resolve => require(['@/views/storageRecord'], resolve)
    },
    {
        path: '/recordDetail',
        name: 'recordDetail',
        component: resolve => require(['@/views/recordDetail'], resolve)
    }

];

const router = new Router({
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
});
export default router
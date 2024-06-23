import Vue from 'vue'
import VueRouter from "vue-router";
import Login from './components/Login.vue';
import Home from './components/Home.vue';
import Welcome from './components/Welcome.vue'
import User from './components/user/User.vue'
import Rights from './components/authority/Rights.vue'
import Roles from './components/authority/Roles.vue'
import Category from './components/goods/Category.vue'
import NotFound from '@/exception/404.vue'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: "/",
            redirect: '/login'
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: "/home",
            component: Home,
            redirect: '/welcome',
            children: [
                {
                    path: '/welcome',
                    component: Welcome
                },
                {
                    path: '/merchant11',
                    component: User
                },
                {
                    path: '/menus2',
                    component: Rights
                },
                {
                    path: '/roles',
                    component: Roles
                },
                {
                    path: '/category',
                    component: Category
                }
            ]
        },
        {
            path: '/:pathMatch(.*)',
            component: NotFound
        }
    ]
})

//挂载路由导航守卫
router.beforeEach((to, from, next) => {
    //to 将要访问的路径
    //from 代表从哪个路径跳转而来
    //next 是函数，表示放行
    if (to.path === '/login') return next()
    //获取token
    const tokenStr = window.sessionStorage.getItem('token')
    if (!tokenStr) return next('/login');
    next()
})

export default router
import { createWebHistory, createRouter, RouterOptions } from "vue-router";

import { contactRoutes } from "./contacts"
import { configRoutes } from "./config"
import { personRoutes } from "./persons"
import { usersRoutes } from "./users"
import { dashRoutes } from "./dash"

const options: RouterOptions = {
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: () => import("../views/Home.vue"),
        },
        {
            path: '/dashboard',
            component: () => import("../views/Dashboard.vue"),
            children: [
                configRoutes,
                ...contactRoutes,
                ...personRoutes,
                ...usersRoutes,
                dashRoutes
            ]
        },
        {
            path: '/:pathMatch(.*)',
            component: () => import('../views/Notfound.vue')
        }
    ]
}

const router = createRouter(options)

router.beforeEach((to) => {
    const isAuthenticated = localStorage.getItem('@metaway-token')
    const isDashboard = to.path.toString().includes('/dashboard')

    if (!isAuthenticated && isDashboard) {
        localStorage.removeItem('@metaway-token')
        return '/'
    }

    if (isAuthenticated && !isDashboard) {
        return '/dashboard/'
    }
})

export { router };
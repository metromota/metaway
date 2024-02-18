import axios from "axios"
import { createWebHistory, createRouter, RouterOptions } from "vue-router"
import { contactRoutes } from "./contacts"
import { configRoutes } from "./config"
import { personRoutes } from "./persons"
import { usersRoutes } from "./users"
import { dashRoutes } from "./dash"
import { TipoHttpCodes } from "../core/enums/tipo-httpcodes.enum"
import { RoleUser } from "../core/enums/tipo-acesso.enum"
import { store } from "../store"

const options: RouterOptions = {
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: () => import("../views/Home.vue"),
        },
        {
            path: "/dashboard",
            component: () => import("../views/Dashboard.vue"),
            children: [
                ...configRoutes,
                ...contactRoutes,
                ...personRoutes,
                ...usersRoutes,
                dashRoutes,
            ],
        },
        {
            path: "/:pathMatch(.*)",
            component: () => import("../views/Notfound.vue"),
        },
    ],
}

const router = createRouter(options)

router.beforeEach(to => {

    const withToken = localStorage.getItem("@metaway-token")
    const isPrivateArea = to.path.toString().includes("/dashboard")
    const isUsers = to.path.toString().includes("users")

    if (isPrivateArea && !withToken) {
        localStorage.removeItem("@metaway-token")
        localStorage.removeItem("@metaway-id")
        return "/"
    }

    const isAdmin = store.state.isAdmin
    const isNotAdmin = withToken && isUsers && !isAdmin

    if ((withToken && !isPrivateArea) || isNotAdmin) {
        return "/dashboard/"
    }

})

export { router }

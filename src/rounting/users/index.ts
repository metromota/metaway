const usersRoutes = [
    {
        path: "users",
        component: () => import("../../components/users/Users.vue"),
    },
    {
        path: "users/novo",
        component: () => import("../../components/users/FormUser.vue"),
    },
    {
        path: "users/atualizar/:id",
        component: () => import("../../components/users/FormUserUpdate.vue"),
    }

]

export { usersRoutes }
const usersRoutes = [
    {
        path: "users",
        component: () => import("../../components/users/Users.vue"),
    },
    {
        path: "users/novo",
        component: () => import("../../components/users/FormUser.vue"),
    }
]

export { usersRoutes }
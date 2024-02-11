const personRoutes = [
    {
        path: "persons",
        component: () => import("../../components/persons/Persons.vue"),
    },
    {
        path: "persons/novo",
        component: () => import("../../components/persons/FormPerson.vue"),
    }
]

export { personRoutes }
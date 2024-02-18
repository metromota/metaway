const personRoutes = [
    {
        path: "persons",
        component: () => import("../../components/persons/Persons.vue"),
    },
    {
        path: "persons/novo",
        component: () => import("../../components/persons/FormPerson.vue"),
    },
    {
        path: "persons/atualizar/:id",
        component: () => import("../../components/persons/FormPersonUpdate.vue"),
    }
]

export { personRoutes }
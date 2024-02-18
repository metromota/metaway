const contactRoutes = [
    {
        path: "contacts",
        component: () => import("../../components/contacts/Contacts.vue"),
    },
    {
        path: "contacts/novo",
        component: () => import("../../components/contacts/FormContact.vue"),
    },
    {
        path: "contacts/atualizar/:id",
        component: () => import("../../components/contacts/FormContactUpdate.vue"),
    }

]
export { contactRoutes }
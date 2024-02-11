const contactRoutes = [
    {
        path: "contacts",
        component: () => import("../../components/contacts/Contacts.vue"),
    },
    {
        path: "contacts/novo",
        component: () => import("../../components/contacts/FormContact.vue"),
    }

]
export { contactRoutes }
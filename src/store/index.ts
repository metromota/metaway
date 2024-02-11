import { createStore } from 'vuex';

const store = createStore({
    state() {
        const contacts = [""]
        return {
            contacts
        }
    },
    mutations: {
        // Suas mutações
    },
    actions: {
        // Suas ações
    },
    getters: {
        // Seus getters
    }
});

export { store }
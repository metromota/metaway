<template>
    <div class="w-full">
        <div class="flex justify-between items-center w-full">
            <ul class="menu">
                <li v-for="(item, index) in items" :key="index">
                    <RouterLink
                        :to="item?.link"
                        :class="{ selected: isSelected(item) }"
                        >{{ item?.label }}</RouterLink
                    >
                </li>
            </ul>
            <div>
                <button class="btn-exit" @click="logout">
                    <BIconPower></BIconPower> Sair
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { BIconPower } from "bootstrap-icons-vue"
import { ref } from "vue"
import { useRoute, useRouter } from "vue-router"

export default {
    setup() {
        const route = useRoute()
        const router = useRouter()
        const items = ref([
            { label: "Homepage", link: "/dashboard/" },
            { label: "Contatos", link: "/dashboard/contacts" },
            { label: "Pessoas", link: "/dashboard/persons" },
            { label: "Usuários", link: "/dashboard/users" },
        ])

        const isSelected = (item) => {
            return route.path === item.link
        }

        const logout = () => {
            localStorage.removeItem("@metaway-token")
            router.push("/")
        }

        return { items, isSelected, logout }
    },
    methods: {},
    components: { BIconPower },
}
</script>

<style scoped>
.menu {
    @apply flex flex-col md:flex-row gap-[1px] p-1;
}

.menu > li {
    @apply w-full text-center;
}

.menu a {
    @apply w-full block py-2 px-4 text-[var(--primary)] hover:bg-slate-200 rounded-md;
}

.menu a.selected {
    @apply bg-[var(--primary)] text-white font-medium rounded-md;
}

.btn-exit {
    @apply flex gap-2 items-center bg-[var(--error)] hover:bg-[var(--error-hover)] text-white py-2 px-4 rounded-md;
}
</style>

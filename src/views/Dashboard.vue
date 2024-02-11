<template>
    <div class="view-page">
        <div class="container">
            <div class="top">
                <Menu></Menu>
            </div>
            <main class="main">
                <span v-if="$route.name === 'dashboard'"
                    >Escolha uma área no menu acima</span
                >
                <RouterView></RouterView>
            </main>
        </div>
    </div>
</template>

<script lang="ts">
import Menu from "../components/Menu.vue"

export default {
    data() {
        return {}
    },
    components: {
        Menu,
    },
}
</script>

<style scoped>
.view {
    @apply w-full h-screen flex gap-4 justify-center items-center;
}

.container {
    @apply w-full flex flex-col;
}

.top {
    @apply h-[20vh] md:h-[5vh] w-full p-2 border-b-[1px] border-slate-200 flex justify-center items-center;
}

.main {
    @apply h-[80vh] md:h-[95vh] w-full p-2;
}
</style>

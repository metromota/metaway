<template>
    <h1 class="title-heading">{{ title }}</h1>
    <p>{{ description }}</p>
</template>

<script lang="ts">
export default {
    data() {
        return {
            title: "Metaway",
            description: "Agenda Pessoal",
        }
    }
}
</script>

<style scoped>
.title-heading {
    @apply text-3xl font-black;
}
</style>
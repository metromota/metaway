<template>
    <div class="view-page">
        <div class="container">
            <div class="heading">
                <h2 class="title">Oh Não!</h2>
            </div>
            <div class="mb-4">
                <p>{{ message }}</p>
            </div>
            <button class="btn-house" @click="gotoDash">
                <BIconHouse></BIconHouse> Voltar para o Dashboard
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { BIconHouse } from 'bootstrap-icons-vue';
import { ref } from 'vue';

export default {
    setup() {
        const message = ref("Sua Pagina não foi encontrada!");
        return { message };
    },
    methods: {
        gotoDash() {
            this.$router.push('/dashboard/');
        }
    },
    components: { BIconHouse }
}
</script>

<style scoped>
.btn-house {
    @apply p-4 flex items-center gap-4 bg-[var(--primary)] text-white rounded-md;
}
</style>
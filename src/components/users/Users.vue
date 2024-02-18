<template>
    <div class="view-page">
        <div class="container">
            <div class="heading">
                <h2 class="title">Lista de Usuários</h2>
                <button class="btn-add" @click="handleNewUser">
                    <BIconPlus></BIconPlus> Novo
                </button>
            </div>

            <div class="content">
                <Form
                    @submit="searchUser"
                    :validation-schema="schema"
                    v-slot="{ meta, isSubmitting }"
                >
                    <div class="search-container">
                        <div class="input-search">
                            <Field
                                type="search"
                                name="termo"
                                autocomplete="termo"
                                class="input"
                                placeholder="Buscar Usuários"
                            />
                            <div class="content-block">
                                <ErrorMessage name="termo" class="error" />
                            </div>
                        </div>
                        <div class="btn-search-container">
                            <button
                                :disabled="
                                    !(meta.dirty && meta.valid) || isSubmitting
                                "
                                class="btn-search"
                            >
                                <BIconSearch class="search" />
                            </button>
                        </div>
                    </div>
                </Form>
            </div>

            <div class="content">
                <ul class="lists">
                    <li v-for="(user, index) in usersFinded" :key="index">
                        <div class="flex gap-2 dots">
                            <span>{{ user?.id }}</span>
                            <span>-</span>
                            <span>{{ user?.nome }}</span>
                        </div>
                        <button class="btn-search" @click="editUser(user?.id)">
                            <BIconPencilFill></BIconPencilFill>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import * as yup from "yup"
import { Form, Field, ErrorMessage, useForm } from "vee-validate"
import { User } from "../../core/models/user"
import { computed, ref } from "vue"
import { BIconPlus, BIconPenFill } from "bootstrap-icons-vue"
import { UserService } from "./user-service"

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
        BIconPenFill,
        BIconPlus,
    },

    setup() {
        const { isSubmitting, meta, errors } = useForm()
        const users = ref<User[]>([])
        const usersFinded = computed(() => users.value)
        const changeUsers = (newUsers: User[]) => {
            users.value = [...newUsers]
        }
        const schema = yup.object({
            termo: yup.string(),
        })

        return {
            errors,
            isSubmitting,
            meta,
            schema,
            users,
            changeUsers,
            usersFinded,
        }
    },

    mounted() {
        this.searchUser({ termo: "" })
    },

    methods: {
        handleNewUser() {
            this.$router.push("/dashboard/users/novo")
        },

        editUser(id: number) {
            this.$router.push(`/dashboard/users/atualizar/${id}`)
        },

        async searchUser(value) {
            const result = await UserService.findUserByTermo(value, this.$axios)
            if (result) this.changeUsers(result)
        },
    },
}
</script>

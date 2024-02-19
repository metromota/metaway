<template>
    <div class="view-page">
        <div class="container">
            <div class="heading">
                <h2 class="title">Atualizar Usuário</h2>
            </div>

            <div class="content">
                <Form
                    @submit="handleSubmit"
                    :validation-schema="schema"
                    v-slot="{ meta, isSubmitting }"
                    class="grade"
                >
                    <div class="control-container">
                        <label>Nome</label>
                        <Field
                            type="text"
                            name="nome"
                            autocomplete="nome"
                            class="input"
                            v-model="user.nome"
                        />
                        <div class="content-block">
                            <ErrorMessage name="nome" class="error" />
                        </div>
                    </div>

                    <div class="control-container">
                        <label>Email</label>
                        <Field
                            type="email"
                            name="email"
                            autocomplete="email"
                            class="input"
                            v-model="user.email"
                        />
                        <div class="content-block">
                            <ErrorMessage name="email" class="error" />
                        </div>
                    </div>

                    <div class="control-container">
                        <label>Cpf</label>
                        <Field
                            type="text"
                            name="cpf"
                            autocomplete="cpf"
                            class="input"
                            v-mask="'###.###.###-##'"
                            v-model="user.cpf"
                        />
                        <div class="content-block">
                            <ErrorMessage name="cpf" class="error" />
                        </div>
                    </div>

                    <div class="control-container">
                        <label>Data Nascimento</label>
                        <Field
                            type="date"
                            name="dataNascimento"
                            autocomplete="dataNascimento"
                            class="input"
                            v-model="user.dataNascimento"
                        />
                        <div class="content-block">
                            <ErrorMessage name="dataNascimento" class="error" />
                        </div>
                    </div>

                    <div class="control-container">
                        <label>Telefone</label>
                        <Field
                            type="text"
                            name="telefone"
                            autocomplete="telefone"
                            class="input"
                            v-mask="'(##) #####-####'"
                            v-model="user.telefone"
                        />
                        <div class="content-block">
                            <ErrorMessage name="telefone" class="error" />
                        </div>
                    </div>

                    <div class="control-container">
                        <label>Username</label>
                        <Field
                            type="text"
                            name="username"
                            autocomplete="username"
                            class="input"
                            v-model="user.username"
                        />
                        <div class="content-block">
                            <ErrorMessage name="username" class="error" />
                        </div>
                    </div>

                    <div class="control-container">
                        <label>Senha</label>
                        <Field
                            type="password"
                            name="password"
                            autocomplete="current-password"
                            class="input"
                        />
                        <div class="content-block">
                            <ErrorMessage name="password" class="error" />
                        </div>
                    </div>

                    <div class="submit-section">
                        <button
                            :disabled="
                                !(meta.dirty && meta.valid) || isSubmitting
                            "
                            class="btn-save"
                        >
                            Atualizar
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { schemaUpdate } from "./user-update-schema"
import { ref } from "vue"
import { useForm, Form, Field, ErrorMessage } from "vee-validate"
import { UserService } from "./user-service"

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },

    setup() {
        const { isSubmitting, meta, errors, handleSubmit } = useForm()
        const id = ref(null)
        const user = ref({
            cpf: "",
            dataNascimento: "",
            email: "",
            nome: "",
            telefone: "",
            username: "",
            password: "",
            usertype: "",
        })
        const schema = schemaUpdate

        return {
            handleSubmit,
            schema,
            errors,
            isSubmitting,
            meta,
            user,
            id,
        }
    },

    async mounted() {
        this.id = this.$route.params.id
        await this.findById()
    },

    methods: {
        mapUser(value) {
            const { usertype } = this.user
            const expectUser = {
                tipos: [...usertype],
                usuario: { ...value },
            }
            delete expectUser?.usuario?.usertype
            return expectUser
        },

        async findById() {
            const result = await UserService.findUserById(this.id, this.$axios)
            if (!result) return
            this.user = result
        },

        async handleSubmit(value, { resetForm }) {
            const expectUser = this.mapUser(value)
            const result = await UserService.saveUser(expectUser, this.$axios)

            if (result) {
                resetForm()
            }
        },
    },
}
</script>

<template>
    <div class="view-page">
        <div class="container">
            <div class="heading">
                <h2 class="title">Cadastro de Contato</h2>
            </div>

            <div class="content">
                <Form
                    @submit="saveContact"
                    :validation-schema="schema"
                    v-slot="{ meta, isSubmitting }"
                >
                    <div class="control-container">
                        <label>Username</label>
                        <Field
                            type="text"
                            name="username"
                            autocomplete="username"
                            class="input"
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

                    <div class="control-container submit-section">
                        <button
                            :disabled="
                                !(meta.dirty && meta.valid) || isSubmitting
                            "
                        >
                            Entrar
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Form, Field, ErrorMessage, useForm } from "vee-validate"
import * as yup from "yup"

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },

    setup() {
        const { isSubmitting, meta, errors } = useForm()

        const schema = yup.object({
            email: yup
                .string()
                .email("Deve possuir email válido")
                .required("O campo deve estar preenchido"),
            tag: yup.string().required("O campo deve estar preenchido"),
            telefone: yup.string().required("O campo deve estar preenchido"),
        })

        return {
            errors,
            isSubmitting,
            meta,
            schema,
        }
    },

    methods: {
        saveContact(value) {
            console.log(value)
        },
    },
}
</script>

<style scoped>
.group {
    @apply flex items-center gap-4;
}
</style>

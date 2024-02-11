<template>
    <div class="view">
        <HeaderLogin />

        <div class="card">
            <Form
                @submit="onSubmit"
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
                        :disabled="!(meta.dirty && meta.valid) || isSubmitting"
                        class="btn"
                    >
                        Entrar
                    </button>
                </div>
            </Form>
        </div>
    </div>
</template>

<script lang="ts">
import * as yup from "yup"
import HeaderLogin from "../components/HeaderLogin.vue"
import { TipoHttpCodes } from "../core/enums/tipo-httpcodes.enum"
import { AuthResponse } from "../core/models/auth-response"
import { useToast } from "vue-toastification"
import { Form, Field, ErrorMessage, useForm } from "vee-validate"

const toast = useToast()

export default {
    setup() {
        const { isSubmitting, meta, errors } = useForm()

        const schema = yup.object({
            username: yup
                .string()
                .min(5, "Deve possuir no mínimo 5 caracteres")
                .required("O campo deve estar preenchido"),
            password: yup
                .string()
                .matches(
                    /^[a-zA-Z0-9]+$/,
                    "Deve possuir apenas letras e números"
                )
                .min(8, "Deve possuir no mínimo 8 caracteres")
                .required("O campo deve estar preenchido"),
        })

        return {
            errors,
            isSubmitting,
            meta,
            schema,
        }
    },

    components: {
        HeaderLogin,
        Form,
        Field,
        ErrorMessage,
    },

    computed: {
        title: () => `Metaway`,
        description: () => `Aquele que ama o mundo`,
    },

    methods: {
        async onSubmit(value) {
            const url = `/api/auth/login`
            try {
                const responseRequest = await this.$axios.post(url, value)
                const { status } = responseRequest
                if (status === TipoHttpCodes.OK) {
                    const { data } = responseRequest
                    this.authOK(data)
                    toast.success("Login realizado com sucesso")
                }
            } catch ({ response }) {
                if (response.status === TipoHttpCodes.UNAUTHORIZED) {
                    toast.error(
                        "Credenciais estão erradas revise e tente novamente"
                    )
                }
            }
        },

        authOK(response: AuthResponse) {
            const access_token = response.accessToken
            localStorage.setItem("@metaway-token", access_token)
            this.$router.push("/dashboard/")
        },
    },
}
</script>

<style scoped>
.view {
    @apply w-full h-screen flex flex-col gap-4 justify-center items-center;
}
.card {
    @apply p-10 md:rounded-xl shadow-xl border w-full md:w-[35%] lg:w-[30%] xl:w-[25%];
}
</style>

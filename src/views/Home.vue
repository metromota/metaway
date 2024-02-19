<template>
    <div class="view">
        <HeaderLogin />

        <div class="card">
            <Form
                @submit="onSubmit"
                :validation-schema="schema"
                v-slot="{ isSubmitting }"
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
                    <button :disabled="isSubmitting" class="btn">Entrar</button>
                </div>
            </Form>
        </div>
    </div>
</template>

<script lang="ts">
import * as yup from "yup"
import HeaderLogin from "../components/HeaderLogin.vue"
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

    methods: {
        async onSubmit(value) {
            const response = await this.$store.dispatch("executeLogin", value)
            const { status, data } = response

            if (status === 200) {
                this.saveInfoOnStorage(data)
                toast.success("Login realizado com sucesso")
                return
            }

            toast.error(data)
        },

        saveInfoOnStorage(response: AuthResponse) {
            const { accessToken, id } = response
            localStorage.setItem("@metaway-token", accessToken)
            localStorage.setItem("@metaway-id", JSON.stringify(id))

            setTimeout(() => {
                this.$router.push("/dashboard/")
            }, 200)
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

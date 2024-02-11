<template>
    <div class="view-page">
        <div class="container">
            <div class="heading">
                <h2 class="title">Cadastro de Usuário</h2>
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

                    <div class="control-container">
                        <label>Tipo</label>
                        <Field name="usertype" as="select">
                            <option value="" disabled>
                                Selecione o tipo de usuário
                            </option>
                            <option
                                v-for="(typ, index) in types"
                                :value="typ.value"
                                :key="index"
                                :selected="typ.value === 'ROLE_USER'"
                            >
                                {{ typ.label }}
                            </option>
                        </Field>
                        <div class="content-block">
                            <ErrorMessage name="usertype" class="error" />
                        </div>
                    </div>

                    <div class="submit-section">
                        <button
                            :disabled="
                                !(meta.dirty && meta.valid) || isSubmitting
                            "
                            class="btn-save"
                        >
                            Salvar
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import * as yup from "yup"
import { ref } from "vue"
import { useForm, Form, Field, ErrorMessage } from "vee-validate"
import { TipoHttpCodes } from "../../core/enums/tipo-httpcodes.enum"
import { RoleUser } from "../../core/enums/tipo-acesso.enum"
import { useToast } from "vue-toastification"

const toast = useToast()

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },

    setup() {
        const { isSubmitting, meta, errors, handleSubmit } = useForm()
        const types = ref([
            {
                label: "Admin",
                value: RoleUser.ROLE_ADMIN,
            },
            {
                label: "Usuário",
                value: RoleUser.ROLE_USER,
            },
        ])

        const schema = yup.object({
            cpf: yup
                .string()
                .min(14, "Deve possuir no mínimo 11 dígitos")
                .required("Campo deve ser preenchido"),
            dataNascimento: yup.date().required("Campo deve ser preenchido"),
            email: yup
                .string()
                .email("Deve possuir email válido")
                .required("Campo deve ser preenchido"),
            nome: yup
                .string()
                .min(3, "Deve possuir no mínimo 3 caracteres")
                .matches(/^[a-zA-Z\s]+$/, "Deve possuir nome válido")
                .required("Campo deve ser preenchido"),
            telefone: yup
                .string()
                .min(14, "Deve possuir no mínimo 11 caracteres")
                .required("Campo deve ser preenchido"),
            username: yup
                .string()
                .min(5, "Deve possuir no mínimo 5 caracteres")
                .required("Campo deve ser preenchido"),
            password: yup
                .string()
                .matches(
                    /^[a-zA-Z0-9]+$/,
                    "Deve possuir apenas letras e números"
                )
                .min(8, "Deve possuir no mínimo 8 caracteres")
                .required("Campo deve ser preenchido"),
            usertype: yup
                .string()
                .oneOf(
                    [RoleUser.ROLE_ADMIN, RoleUser.ROLE_USER],
                    "Por favor, selecione um tipo válido"
                ),
        })

        return {
            schema,
            errors,
            isSubmitting,
            meta,
            types,
            handleSubmit,
        }
    },

    methods: {
        async handleSubmit(value, { resetForm }) {
            const { usertype } = value
            const expectUser = {
                tipos: [usertype],
                usuario: {
                    ...value,
                },
            }
            const url = `/api/usuario/salvar`
            try {
                const responseRequest = await this.$axios.post(url, expectUser)
                const { status } = responseRequest

                if (status === TipoHttpCodes.OK) {
                    const { object, message } = responseRequest?.data

                    if (!!object) {
                        const { usuario } = object
                        toast.success(
                            `Usuário ${usuario?.username} salvo com Sucesso`
                        )
                        resetForm()
                        return
                    }

                    if (!object) {
                        toast.info(message)
                    }
                }
            } catch ({ response }) {
                const { data } = response

                if (response.status === TipoHttpCodes.UNAUTHORIZED) {
                    toast.error(
                        "Credenciais estão erradas revise e tente novamente"
                    )
                }

                if (response.status === TipoHttpCodes.BAD_REQUEST) {
                    const { message } = data
                    toast.error(message)
                }
            }
        },
    },
}
</script>

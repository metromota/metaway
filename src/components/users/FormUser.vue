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
import { ref } from "vue"
import { useForm, Form, Field, ErrorMessage } from "vee-validate"
import { RoleUser } from "../../core/enums/tipo-acesso.enum"
import { schemaSave } from "./user-save-schema"
import { UserService } from "./user-service"

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

        const schema = schemaSave

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
        mapUser(value) {
            const { usertype } = value
            const expectUser = {
                tipos: [usertype],
                usuario: { ...value },
            }
            delete expectUser?.usuario?.usertype
            return expectUser
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

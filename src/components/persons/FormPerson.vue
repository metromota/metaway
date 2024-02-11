<template>
    <div class="view-page">
        <div class="container">
            <div class="heading">
                <h2 class="title">Cadastro de Pessoa</h2>
            </div>

            <div class="content">
                <Form
                    @submit="savePerson"
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
import * as yup from "yup"
import { useForm, Form, Field, ErrorMessage } from "vee-validate"
import { computed, ref } from "vue"
import { Person } from "../../core/models/person"

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },

    setup() {
        let person = ref<Person[]>([])
        const { isSubmitting, meta, errors } = useForm()

        const schema = yup.object({
            termo: yup
                .string()
                .min(5, "Deve possuir no mínimo 5 caracteres")
                .required("O campo deve estar preenchido"),
        })

        const changePersons = (newPersons: Person[]) => {
            person.value = [...newPersons]
        }

        const personsFinded = computed(() => person.value)

        return {
            errors,
            isSubmitting,
            meta,
            schema,
            person,
            changePersons,
            personsFinded,
        }
    },

    methods: {
        savePerson(value) {
            console.log(value)
        },
    },
}
</script>

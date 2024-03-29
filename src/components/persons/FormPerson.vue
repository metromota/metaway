<template>
    <div class="view-page">
        <div class="container">
            <div class="heading">
                <h2 class="title">Cadastro de Pessoa</h2>
            </div>

            <div class="content">
                <Form
                    @submit="handleSubmit"
                    :validation-schema="schema"
                    v-slot="{ meta, isSubmitting }"
                    class="grade"
                >
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
                        <label>Logradouro</label>
                        <Field
                            type="text"
                            name="logradouro"
                            autocomplete="logradouro"
                            class="input"
                        />
                        <div class="content-block">
                            <ErrorMessage name="logradouro" class="error" />
                        </div>
                    </div>

                    <div class="control-container">
                        <label>Bairro</label>
                        <Field
                            type="text"
                            name="bairro"
                            autocomplete="bairro"
                            class="input"
                        />
                        <div class="content-block">
                            <ErrorMessage name="bairro" class="error" />
                        </div>
                    </div>

                    <div class="control-container">
                        <label>Cidade</label>
                        <Field
                            type="text"
                            name="cidade"
                            autocomplete="cidade"
                            class="input"
                        />
                        <div class="content-block">
                            <ErrorMessage name="cidade" class="error" />
                        </div>
                    </div>

                    <div class="control-container">
                        <label>Cep</label>
                        <Field
                            type="text"
                            name="cep"
                            autocomplete="cep"
                            class="input"
                            v-mask="'######-###'"
                        />
                        <div class="content-block">
                            <ErrorMessage name="cep" class="error" />
                        </div>
                    </div>

                    <div class="control-container">
                        <label>Estado</label>
                        <Field name="estado" as="select">
                            <option value="" disabled>
                                Selecione o Estado
                            </option>
                            <option
                                v-for="(typ, index) in states"
                                :value="typ.value"
                                :key="index"
                                :selected="typ.value === 'RS'"
                            >
                                {{ typ.label }}
                            </option>
                        </Field>
                        <div class="content-block">
                            <ErrorMessage name="estado" class="error" />
                        </div>
                    </div>

                    <div class="control-container">
                        <label>Número</label>
                        <Field
                            type="number"
                            name="numero"
                            autocomplete="numero"
                            class="input"
                        />
                        <div class="content-block">
                            <ErrorMessage name="numero" class="error" />
                        </div>
                    </div>

                    <div class="control-container">
                        <label>País</label>
                        <Field
                            type="text"
                            name="pais"
                            autocomplete="pais"
                            class="input"
                        />
                        <div class="content-block">
                            <ErrorMessage name="pais" class="error" />
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
import { listObjectUf } from "./static/list-object-uf"
import { schemaSave } from "./person-save-schema"
import { PersonService } from "./person-service"

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },

    setup() {
        const { isSubmitting, meta, errors, handleSubmit } = useForm()
        const states = ref(listObjectUf)
        const schema = schemaSave

        return {
            schema,
            errors,
            isSubmitting,
            meta,
            states,
            handleSubmit,
        }
    },

    methods: {
        mapPerson(value) {
            const {
                bairro,
                cep,
                cidade,
                estado,
                logradouro,
                numero,
                pais,
                cpf,
                nome,
            } = value

            return {
                nome,
                cpf,
                endereco: {
                    bairro,
                    cep,
                    cidade,
                    estado,
                    logradouro,
                    numero,
                    pais,
                },
            }
        },

        async handleSubmit(value, { resetForm }) {
            const expectPerson = this.mapPerson(value)
            const result = await PersonService.savePerson(
                expectPerson,
                this.$axios
            )
            if (result) {
                resetForm()
            }
        },
    },
}
</script>

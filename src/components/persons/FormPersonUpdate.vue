<template>
    <div class="view-page">
        <div class="container">
            <div class="heading">
                <h2 class="title">Atualizar Pessoa</h2>
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
                            v-model="person.cpf"
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
                            v-model="person.nome"
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
                            v-model="person.endereco.logradouro"
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
                            v-model="person.endereco.bairro"
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
                            v-model="person.endereco.cidade"
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
                            v-model="person.endereco.cep"
                        />
                        <div class="content-block">
                            <ErrorMessage name="cep" class="error" />
                        </div>
                    </div>

                    <div class="control-container">
                        <label>Estado</label>
                        <Field
                            name="estado"
                            as="select"
                            v-model="person.endereco.estado"
                        >
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
                            v-model="person.endereco.numero"
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
                            v-model="person.endereco.pais"
                        />
                        <div class="content-block">
                            <ErrorMessage name="pais" class="error" />
                        </div>
                    </div>

                    <div class="control-container">
                        <label>Foto</label>
                        <input
                            ref="foto"
                            type="file"
                            class="input"
                            @change="handleFileChange"
                        />
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
import { ref } from "vue"
import { useForm, Form, Field, ErrorMessage } from "vee-validate"
import { listObjectUf } from "./static/list-object-uf"
import { schemaUpdate } from "./person-update-schema"
import { PersonService } from "./person-service"

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },

    setup() {
        const { isSubmitting, meta, errors, handleSubmit } = useForm()
        const foto = ref(null)
        const person = ref({
            id: 0,
            nome: "",
            cpf: "",
            endereco: {
                id: 0,
                logradouro: "",
                numero: 0,
                cep: "",
                bairro: "",
                cidade: "",
                estado: "",
                pais: "",
            },
            foto: {
                id: 0,
                name: "",
                type: "",
            },
        })
        const states = ref(listObjectUf)
        const schema = schemaUpdate

        return {
            schema,
            errors,
            isSubmitting,
            meta,
            states,
            foto,
            handleSubmit,
            person,
        }
    },

    async mounted() {
        this.id = this.$route.params.id
        await this.findById()
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
                id: this.id,
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

        async findById() {
            const result = await PersonService.findPersonById(
                this.id,
                this.$axios
            )
            if (!result) return
            this.person = result
        },

        async handleFileChange() {
            const id = this.person?.id
            const foto = this.foto?.files[0]

            if (!(id && foto)) return

            await PersonService.uploadFoto(id, foto, this.$axios)
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

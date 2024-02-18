<template>
    <div class="view-page">
        <div class="container">
            <div class="heading">
                <h2 class="title">Atualizar Contato</h2>
            </div>

            <div class="content">
                <Form
                    :validation-schema="schema"
                    @submit="handleSubmit"
                    v-slot="{ meta, isSubmitting }"
                    class="grade"
                >
                    <div class="control-container relative">
                        <Field
                            @keyup="autoCompleteUser"
                            @input="clearList($event, 'usersFinded')"
                            v-model="userSearchValue"
                            type="search"
                            name="userSearch"
                            autocomplete="userSearch"
                            placeholder="Buscar Usuário"
                            class="input"
                        />
                        <div class="content-block">
                            <ErrorMessage name="userSearch" class="error" />
                        </div>

                        <div class="chip-search" v-if="usersFinded">
                            <ul>
                                <li v-for="user in usersFinded">
                                    <div
                                        class="flex gap-2 dots item-chip"
                                        @click="addUser(user)"
                                    >
                                        <span>{{ user?.id }}</span>
                                        <span>-</span>
                                        <span>{{ user?.nome }}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="control-container relative">
                        <Field
                            @keyup="autoCompletePerson"
                            @input="clearList($event, 'personFinded')"
                            v-model="personSearchValue"
                            type="search"
                            name="personSearch"
                            autocomplete="personSearch"
                            class="input"
                            placeholder="Buscar Pessoa"
                        />
                        <div class="content-block">
                            <ErrorMessage name="personSearch" class="error" />
                        </div>

                        <div class="chip-search" v-if="personFinded">
                            <ul>
                                <li v-for="person in personFinded">
                                    <div
                                        class="flex gap-2 dots item-chip"
                                        @click="addPerson(person)"
                                    >
                                        <span>{{ person?.id }}</span>
                                        <span>-</span>
                                        <span>{{ person?.nome }}</span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div class="control-container">
                        <label>Tag</label>
                        <Field
                            type="text"
                            name="tag"
                            autocomplete="tag"
                            class="input"
                            v-model="contact.tag"
                        />
                        <div class="content-block">
                            <ErrorMessage name="tag" class="error" />
                        </div>
                    </div>

                    <div class="control-container">
                        <label>Privacidade</label>
                        <div class="flex items-center py-2">
                            <input
                                type="checkbox"
                                name="privado"
                                class="w-auto mr-4"
                                v-model="privado"
                            />
                            Contato Privado
                        </div>
                    </div>

                    <div class="control-container">
                        <label>Telefone</label>
                        <Field
                            v-mask="'(##) #####-####'"
                            type="text"
                            name="telefone"
                            autocomplete="telefone"
                            class="input"
                            v-model="contact.telefone"
                        />
                        <div class="content-block">
                            <ErrorMessage name="telefone" class="error" />
                        </div>
                    </div>

                    <div class="control-container">
                        <label>Email</label>
                        <Field
                            type="email"
                            name="email"
                            autocomplete="email"
                            class="input"
                            v-model="contact.email"
                        />
                        <div class="content-block">
                            <ErrorMessage name="email" class="error" />
                        </div>
                    </div>

                    <div class="control-container">
                        <label>Tipo de Contato</label>
                        <Field
                            name="tipoContato"
                            as="select"
                            v-model="contact.tipoContato"
                        >
                            <option value="" disabled>
                                Selecione um tipo de contato
                            </option>
                            <option
                                v-for="(typ, index) in types"
                                :value="typ.value"
                                :key="index"
                                :selected="typ.value === 'CELULAR'"
                            >
                                {{ typ.label }}
                            </option>
                        </Field>
                        <div class="content-block">
                            <ErrorMessage name="tipoContato" class="error" />
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
import { ref } from "vue"
import { useForm, Form, Field, ErrorMessage } from "vee-validate"
import { ContactService } from "./contact-service"
import { schemaUpdate } from "./contact-update-schema"
import { listContact } from "./static/list-contact"
import { UserService } from "../users/user-service"
import { PersonService } from "../persons/person-service"

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },

    setup() {
        const { isSubmitting, meta, errors, handleSubmit } = useForm()
        const usersFinded = ref(null)
        const personFinded = ref(null)
        const privado = ref(null)
        const user = ref(null)
        const person = ref(null)
        const userSearchValue = ref("")
        const personSearchValue = ref("")

        const id = ref(null)
        const types = ref(listContact)
        const contact = ref({
            id: 0,
            email: "",
            pessoa: {},
            privado: true,
            tag: "",
            telefone: "",
            tipoContato: "CELULAR",
            usuario: {},
        })
        const schema = schemaUpdate

        return {
            handleSubmit,
            schema,
            errors,
            isSubmitting,
            meta,
            types,
            user,
            person,
            usersFinded,
            personFinded,
            userSearchValue,
            personSearchValue,
            privado,
            id,
            contact,
        }
    },

    async mounted() {
        this.id = this.$route.params.id
        await this.getById()
    },

    methods: {
        async getById() {
            const id = this.id
            const result = await ContactService.getContactFromIDPerson(
                id,
                this.$axios
            )
            if (result) {
                this.contact = result
                this.user = result?.usuario
                this.person = result?.pessoa
                this.userSearchValue = result?.usuario?.nome
                this.personSearchValue = result?.pessoa?.nome
            }
        },

        async clearList(ev, list) {
            const isEmpty = ev.target.value.length === 0
            if (isEmpty) this[list] = null
        },

        async addUser(user) {
            this.user = { ...user }
            this.usersFinded = null
            this.userSearchValue = user.nome
        },

        async addPerson(person) {
            this.person = { ...person }
            this.personFinded = null
            this.personSearchValue = person.nome
        },

        async autoCompleteUser(event) {
            const isEmpty = event?.target?.value?.length === 0
            if (isEmpty) return

            const value = event?.target?.value
            const result = await UserService.findUserList(value, this.$axios)
            this.usersFinded = !!result ? result : null
        },

        async autoCompletePerson(event) {
            const isEmpty = event?.target?.value?.length === 0
            if (isEmpty) return

            const value = event.target.value
            const result = await PersonService.findPerson(value, this.$axios)
            this.personFinded = !!result ? result : null
        },

        async findPerson(nome) {
            const response = await PersonService.findPerson(nome, this.$axios)
            this.person = !!response ? response[0] : null
        },

        async findUser(cpf) {
            const response = await UserService.findUserByCPF(cpf, this.$axios)
            this.user = !!response ? response[0] : null
        },

        async handleSubmit(value, { resetForm }) {
            const contact = this.mapContact(value)
            const result = await ContactService.saveContact(
                contact,
                this.$axios
            )
            if (result) {
                resetForm()
            }
        },

        mapContact(value) {
            const privado = !!this.privado
            const usuario = this.contact.usuario
            const pessoa = this.contact.pessoa
            const id = this.contact?.id
            const contactObject = { ...value, pessoa, usuario, privado, id }
            delete contactObject.userSearch
            delete contactObject.personSearch

            return contactObject
        },
    },
}
</script>

<style scoped>
.chip-search {
    @apply absolute h-auto w-full max-h-[300px] overflow-y-auto left-0 top-[45px] p-2 bg-zinc-100 rounded-md z-10 shadow-md border;
}

.item-chip {
    @apply hover:bg-zinc-200 p-2 rounded-md cursor-pointer;
}
</style>

<template>
    <div class="view-page">
        <div class="container">
            <div class="heading">
                <h2 class="title">Lista de Contatos</h2>
                <button class="btn-add" @click="handleNewContact">
                    <BIconPlus></BIconPlus> Novo
                </button>
            </div>

            <div class="content">
                <Form
                    @submit="searchContact"
                    :validation-schema="schema"
                    v-slot="{ meta, isSubmitting }"
                >
                    <div class="search-container">
                        <div class="input-search">
                            <Field
                                type="search"
                                name="termo"
                                autocomplete="termo"
                                class="input"
                                placeholder="Buscar Contatos"
                            />
                            <div class="content-block">
                                <ErrorMessage name="termo" class="error" />
                            </div>
                        </div>
                        <div class="btn-search-container">
                            <button
                                :disabled="
                                    !(meta.dirty && meta.valid) || isSubmitting
                                "
                                class="btn-search"
                            >
                                <BIconSearch class="search" />
                            </button>
                        </div>
                    </div>
                </Form>
            </div>

            <div class="content">
                <ul class="lists">
                    <li v-for="contact in contactsFinded">
                        <div class="flex gap-2 dots">
                            <span>{{ contact?.id }}</span>
                            <span>{{ contact?.pessoa?.nome }}</span>
                        </div>
                        <button
                            class="btn-trash"
                            @click="deleteContact(contact?.id)"
                        >
                            <BIconTrashFill></BIconTrashFill>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import * as yup from "yup"
import { Form, Field, ErrorMessage, useForm } from "vee-validate"
import { Contact } from "../../core/models/contact"
import { TipoHttpCodes } from "../../core/enums/tipo-httpcodes.enum"
import { useToast } from "vue-toastification"
import { computed, ref } from "vue"
import { BIconPlus, BIconTrashFill } from "bootstrap-icons-vue"

const toast = useToast()

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
        BIconTrashFill,
        BIconPlus,
    },

    setup() {
        let contacts = ref<Contact[]>([])
        const { isSubmitting, meta, errors } = useForm()

        const schema = yup.object({
            termo: yup
                .string()
                .min(5, "Deve possuir no mínimo 5 caracteres")
                .required("O campo deve estar preenchido"),
        })

        const changeContacts = (newContacts: Contact[]) => {
            contacts.value = [...newContacts]
        }

        const contactsFinded = computed(() => contacts.value)

        return {
            errors,
            isSubmitting,
            meta,
            schema,
            contacts,
            changeContacts,
            contactsFinded,
        }
    },

    methods: {
        handleNewContact() {
            this.$router.push("/dashboard/contacts/novo")
        },

        async searchContact(value) {
            const url = `/api/contato/pesquisar`
            try {
                const responseRequest = await this.$axios.post(url, value)
                const { status } = responseRequest
                if (status === TipoHttpCodes.OK) {
                    const { data } = responseRequest
                    this.changeContacts(data)
                }
            } catch ({ response }) {
                if (response.status === TipoHttpCodes.UNAUTHORIZED) {
                    toast.error(
                        "Credenciais estão erradas revise e tente novamente"
                    )
                }

                if (response.status === TipoHttpCodes.NOT_FOUND) {
                    toast.error(
                        `Não foi encontrado nenhum resultado para o termo: ${value.termo}`
                    )
                }
            }
        },

        async deleteContact(id) {
            const url = `/api/contato/remover/${id}`
            try {
                const responseRequest = await this.$axios.delete(url)
                const { status } = responseRequest
                if (status === TipoHttpCodes.OK) {
                    const { message, object } = responseRequest
                    if (object) toast.success(message)
                }
            } catch ({ response }) {
                if (response.status === TipoHttpCodes.UNAUTHORIZED) {
                    toast.error(
                        "Credenciais estão erradas revise e tente novamente"
                    )
                }

                if (response.status === TipoHttpCodes.NO_CONTENT) {
                    toast.error(
                        `Não existe contato com este identificador: ${id}`
                    )
                }
            }
        },
    },
}
</script>

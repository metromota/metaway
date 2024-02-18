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
                            <span>-</span>
                            <span>{{ contact?.pessoa?.nome }}</span>
                        </div>
                        <div class="flex gap-2">
                            <button
                                class="btn-search"
                                @click="editContact(contact?.pessoa?.id)"
                            >
                                <BIconPencilFill></BIconPencilFill>
                            </button>

                            <button
                                class="btn-trash"
                                @click="deleteContact(contact?.id)"
                            >
                                <BIconTrashFill></BIconTrashFill>
                            </button>
                        </div>
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
import { computed, ref } from "vue"
import { BIconPlus, BIconTrashFill } from "bootstrap-icons-vue"
import { ContactService } from "./contact-service"

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
        BIconTrashFill,
        BIconPlus,
    },

    setup() {
        const { isSubmitting, meta, errors } = useForm()
        const contacts = ref<Contact[]>([])

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

    mounted() {
        this.searchContact({ termo: "" })
    },

    methods: {
        handleNewContact() {
            this.$router.push("/dashboard/contacts/novo")
        },

        editContact(id: number) {
            this.$router.push(`/dashboard/contacts/atualizar/${id}`)
        },

        async searchContact(value) {
            const result = await ContactService.searchContact(
                value,
                this.$axios
            )
            if (result) {
                this.changeContacts(result)
            }
        },

        async deleteContact(id) {
            await ContactService.deleteContact(id, this.$axios)
            this.searchContact({ termo: "" })
        },
    },
}
</script>

<template>
    <div class="view-page">
        <div class="container">
            <div class="heading">
                <h2 class="title">Lista de Pessoas</h2>
                <button class="btn-add" @click="handleNewPerson">
                    <BIconPlus></BIconPlus> Novo
                </button>
            </div>

            <div class="content">
                <Form
                    @submit="searchPerson"
                    :validation-schema="schema"
                    v-slot="{ meta, isSubmitting }"
                >
                    <div class="search-container">
                        <div class="input-search">
                            <Field
                                type="search"
                                name="nome"
                                autocomplete="nome"
                                class="input"
                                placeholder="Buscar Pessoas"
                            />
                            <div class="content-block">
                                <ErrorMessage name="nome" class="error" />
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
                    <li v-for="person in personsFinded">
                        <div class="flex gap-2 dots">
                            <span>{{ person?.id }}</span>
                            <span>-</span>
                            <span>{{ person?.nome }}</span>
                        </div>

                        <div class="flex gap-2">
                            <button
                                class="btn-search"
                                @click="editPerson(person?.id)"
                            >
                                <BIconPencilFill></BIconPencilFill>
                            </button>

                            <button
                                class="btn-trash"
                                @click="deletePerson(person?.id)"
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
import { Person } from "../../core/models/person"
import { computed, ref } from "vue"
import { BIconPlus, BIconTrashFill } from "bootstrap-icons-vue"
import { PersonService } from "./person-service"

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
        BIconTrashFill,
        BIconPlus,
    },

    setup() {
        let persons = ref<Person[]>([])
        const { isSubmitting, meta, errors } = useForm()
        const schema = yup.object({ nome: yup.string() })
        const personsFinded = computed(() => persons.value)
        const changePersons = (newPersons: Person[]) => {
            persons.value = [...newPersons]
        }

        return {
            errors,
            isSubmitting,
            meta,
            schema,
            persons,
            changePersons,
            personsFinded,
        }
    },

    async mounted() {
        await this.searchPerson({ nome: "" })
    },

    methods: {
        handleNewPerson() {
            this.$router.push("/dashboard/persons/novo")
        },

        editPerson(id: number) {
            this.$router.push(`/dashboard/persons/atualizar/${id}`)
        },

        async searchPerson(value) {
            const result = await PersonService.findPerson(
                value?.nome,
                this.$axios
            )
            if (result) {
                this.changePersons(result)
            }
        },

        async deletePerson(id) {
            const result = await PersonService.deletePerson(id, this.$axios)
            if (result) {
                await this.searchPerson({ nome: "" })
            }
        },
    },
}
</script>

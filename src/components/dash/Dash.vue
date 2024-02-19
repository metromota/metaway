<template>
    <div class="view-page">
        <div class="container">
            <div class="heading">
                <h2 class="title">Favoritos</h2>
            </div>

            <div class="content grid-favorites">
                <div>
                    <h2 class="my-4">Favoritos</h2>

                    <p v-if="!favorites.length">Nenhum favorito adicionado</p>

                    <ul class="lists" v-else>
                        <li v-for="contact in favorites">
                            <div class="flex items-center gap-2 dots">
                                <img
                                    :src="contact?.foto"
                                    :alt="contact?.tag"
                                    class="avatar"
                                />
                                <span>{{ contact?.id }}</span>
                                <span>-</span>
                                <span>{{ contact?.pessoa?.nome }}</span>
                            </div>
                            <div class="flex gap-2">
                                <button
                                    class="btn-fav"
                                    @click="deleteContactFav(contact?.id)"
                                >
                                    <BIconStarFill></BIconStarFill>
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 class="my-4">Normais</h2>

                    <p v-if="!notFavorites.length">Nenhum encontrado</p>

                    <ul class="lists" v-else>
                        <li v-for="contact in notFavorites">
                            <div class="flex items-center gap-2 dots">
                                <img
                                    :src="contact?.foto"
                                    :alt="contact?.tag"
                                    class="avatar"
                                />
                                <span>{{ contact?.id }}</span>
                                <span>-</span>
                                <span>{{ contact?.pessoa?.nome }}</span>
                            </div>
                            <div class="flex gap-2">
                                <button
                                    class="btn-fav"
                                    @click="addFav(contact)"
                                >
                                    <BIconStar></BIconStar>
                                </button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { ContactService } from "../contacts/contact-service"
import { ref, watch } from "vue"
import { DashService } from "./dash-service"
import { Contact } from "../../core/models/contact"
import { BIconStarFill, BIconStar } from "bootstrap-icons-vue"

export default {
    components: {
        BIconStarFill,
        BIconStar,
    },

    setup() {
        const contacts = ref<Contact[]>([])
        const favorites = ref<Contact[]>([])
        const notFavorites = ref<Contact[]>([])

        const changeContacts = (newContacts: Contact[]) => {
            contacts.value = [...newContacts]
        }

        const changeFavorites = (newFavorites: Contact[]) => {
            favorites.value = [...newFavorites]
        }

        const changeNotFavorites = (newNotFavorites: Contact[]) => {
            notFavorites.value = [...newNotFavorites]
        }

        const mapList = () => {
            const contactList = contacts.value
            const favList = favorites.value
            const onlyNotFavs = (contact) => {
                return !favList.some((fav) => fav.id === contact.id)
                    ? contact
                    : null
            }
            const result = contactList.filter(onlyNotFavs)
            changeNotFavorites(result)
        }

        watch(contacts, () => {
            mapList()
        })

        watch(favorites, () => {
            mapList()
        })

        return {
            contacts,
            favorites,
            notFavorites,
            changeContacts,
            changeFavorites,
            changeNotFavorites,
        }
    },

    mounted() {
        this.refresh()
    },

    methods: {
        refresh() {
            this.searchContact({ termo: "" })
            this.searchFavorites()
        },

        async downloadFoto(id) {
            const response = await DashService.downloadFoto(id, this.$axios)
            const imageUrl = URL.createObjectURL(response.data)
            return imageUrl
        },

        async searchContact(value) {
            const result = await ContactService.searchContact(
                value,
                this.$axios
            )

            const mapped = Promise.all(
                result.map(async (contact) => {
                    contact.foto = await this.downloadFoto(contact?.pessoa?.id)
                    return contact
                })
            )

            this.changeContacts(await mapped)
        },

        async searchFavorites() {
            const result = await DashService.searchContactFav(this.$axios)

            if (!result) {
                return
            }

            const mapped = Promise.all(
                result.map(async (contact) => {
                    contact.foto = await this.downloadFoto(contact?.pessoa?.id)
                    return contact
                })
            )

            this.changeFavorites(await mapped)
        },

        async deleteContactFav(id) {
            await DashService.deleteContactFav(id, this.$axios)
            this.refresh()
        },

        async addFav(contact) {
            const response = await DashService.saveContactFav(
                contact,
                this.$axios
            )
            if (response) {
                this.refresh()
            }
        },
    },
}
</script>

<style scoped>
.avatar {
    @apply w-[45px] h-[45px] rounded-full border;
}
.grid-favorites {
    @apply grid grid-cols-1 xl:grid-cols-2 gap-2;
}
</style>

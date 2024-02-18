import { AuthResponse } from '@core/models/auth-response';
import { RoleUser } from '../core/enums/tipo-acesso.enum';
import { TipoHttpCodes } from '../core/enums/tipo-httpcodes.enum';
import { User } from '../core/models/user';
import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({

    state() {

        const user: User = {
            id: 0,
            nome: '',
            cpf: '',
            dataNascimento: new Date(),
            email: '',
            password: '',
            telefone: '',
            username: ''
        }

        const responseAuth: AuthResponse = {
            accessToken: '',
            tipos: [],
            tokenType: '',
            username: ''
        }

        const isAdmin = false

        return { user, isAdmin, responseAuth }
    },

    mutations: {

        setResponse(state, data) {
            state.responseAuth = { ...data }
        },

        setUser(state, data) {
            state.user = { ...data }
        },

        setIsAdmin(state, data) {
            state.isAdmin = data
        },

    },

    actions: {

        async setUserByID({ commit }, id) {

            const url = `/api/usuario/buscar/${id}`

            try {
                const responseRequest = await axios.get(url)
                const { status, data } = responseRequest
                const responseOK = status === TipoHttpCodes.OK
                const withData = !!data?.object

                if (responseOK && withData) {
                    const { object } = data
                    commit('setUser', object.usuario)
                    commit('setIsAdmin', object.tipos[0] === RoleUser.ROLE_ADMIN)
                }

                return {
                    status,
                    data: data?.message
                }

            } catch ({ response }) {

                const { status, data } = response

                return {
                    status,
                    data: data?.message
                }
            }

        },

        async executeLogin({ commit }, value) {

            const url = `/api/auth/login`

            try {
                const responseRequest = await axios.post(url, value)
                const { status } = responseRequest

                if (status === TipoHttpCodes.OK) {
                    const { data } = responseRequest
                    commit('setResponse', data)
                    return {
                        status,
                        data
                    }
                }

            } catch ({ response }) {

                const { status } = response

                if (status === TipoHttpCodes.UNAUTHORIZED) {
                    return {
                        status,
                        data: 'Suas credenciais estão erradas'
                    }
                }

                if (status === TipoHttpCodes.FORBIDDEN) {
                    return {
                        status,
                        data: 'Operação não permitida'
                    }
                }

                if (status === TipoHttpCodes.NOT_FOUND) {
                    return {
                        status,
                        data: 'Nenhum usuário foi encontrado'
                    }
                }

                return {
                    status: 400,
                    data: 'Aconteceu algo inesperado'
                }
            }
        },

    },

    getters: {}

})

export { store }
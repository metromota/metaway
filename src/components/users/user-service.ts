import { TipoHttpCodes } from "../../core/enums/tipo-httpcodes.enum"
import { useToast } from "vue-toastification"

export class UserService {

    static async saveUser(user, fetchProvider) {
        const toast = useToast()
        const url = `/api/usuario/salvar`

        try {
            const responseRequest = await fetchProvider.post(url, user)
            const { status } = responseRequest

            if (status === TipoHttpCodes.OK) {
                const { object, message } = responseRequest?.data

                if (!!object) {
                    const { usuario } = object
                    toast.success(`Usuário ${usuario?.username} atualizado com Sucesso`)
                    return usuario
                }

                toast.info(message)
                return null
            }
        } catch ({ response }) {
            const { data } = response



            if (response.status === TipoHttpCodes.BAD_REQUEST) {
                const { message } = data
                toast.error(message)
            }

            return null
        }
    }

    static async findUserById(id, fetchProvider): Promise<any> {

        const toast = useToast()
        const url = `/api/usuario/buscar/${id}`

        try {
            const responseRequest = await fetchProvider.get(url)
            const { status } = responseRequest

            if (status === TipoHttpCodes.OK) {
                const { object, message } = responseRequest?.data

                if (!!object) {
                    const { usuario, tipos } = object
                    return { ...usuario, usertype: tipos }
                }

                toast.info(message)
                return null
            }
        } catch ({ response }) {
            const { data } = response

            if (response.status === TipoHttpCodes.BAD_REQUEST) {
                const { message } = data
                toast.error(message)
            }

            return null
        }

    }

    static async findUserByTermo({ termo }, fetchProvider): Promise<any> {
        const toast = useToast()
        const url = `/api/usuario/pesquisar`

        try {
            const responseRequest = await fetchProvider.post(url, { termo })
            const { status } = responseRequest
            if (status === TipoHttpCodes.OK) {
                const { data } = responseRequest

                if (!data?.length) {
                    toast.info(
                        `Não foi encontrado nenhum resultado para o termo: ${termo}`
                    )
                    return null
                }

                return data
            }
        } catch ({ response }) {

            if (response.status === TipoHttpCodes.NOT_FOUND) {
                toast.error(
                    `Não foi encontrado nenhum resultado para o termo: ${termo}`
                )
            }

            return null
        }
    }

    static async findUserByCPF(cpf, fetchProvider): Promise<any> {
        const toast = useToast()
        const url = `/api/usuario/pesquisar`
        try {
            const responseRequest = await fetchProvider.post(url, { termo: cpf })
            const { status } = responseRequest

            if (status === TipoHttpCodes.OK) {
                const { data } = responseRequest

                if (!data?.length) {
                    toast.info(`Não foi encontrado nenhum usuário para o cpf: ${cpf}`)
                    return null
                }

                return data[0]
            }
        } catch ({ response }) {

            if (response.status === TipoHttpCodes.NOT_FOUND) {
                toast.error(`Não foi encontrado nenhum usuário para o cpf: ${cpf}`)
            }

            return null
        }
    }

    static async findUserList(nome, fetchProvider): Promise<any> {
        const toast = useToast()
        const url = `/api/usuario/pesquisar`
        try {
            const responseRequest = await fetchProvider.post(url, { termo: nome })
            const { status } = responseRequest

            if (status === TipoHttpCodes.OK) {
                const { data } = responseRequest

                if (!data?.length) {
                    toast.info(`Não foi encontrado nenhum usuário para o nome: ${nome}`)
                    return null
                }

                return data
            }
        } catch ({ response }) {

            if (response.status === TipoHttpCodes.NOT_FOUND) {
                toast.error(`Não foi encontrado nenhum usuário para o nome: ${nome}`)
            }

            return null
        }
    }
}
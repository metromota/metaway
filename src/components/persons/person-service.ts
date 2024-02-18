import { TipoHttpCodes } from "../../core/enums/tipo-httpcodes.enum"
import { useToast } from "vue-toastification"
import { token } from "../../core/api/axios-service"

export class PersonService {

    static async findPerson(nome, fetchProvider): Promise<any> {
        const toast = useToast()
        const url = `/api/pessoa/pesquisar`
        try {
            const responseRequest = await fetchProvider.post(url, { nome })
            const { status } = responseRequest

            if (status === TipoHttpCodes.OK) {

                const { data } = responseRequest

                if (!data?.length) {
                    toast.info(`Não foi encontrado nenhuma pessoa para o nome: ${nome}`)
                    return null
                }

                return data

            }
        } catch ({ response }) {

            if (response.status === TipoHttpCodes.UNAUTHORIZED) {
                toast.error("Credenciais estão erradas revise e tente novamente")
                return null
            }

            if (response.status === TipoHttpCodes.NOT_FOUND) {
                toast.error(`Não foi encontrado nenhuma pessoa para o nome: ${nome}`)
                return null
            }

        }
    }

    static async deletePerson(id, fetchProvider) {
        const toast = useToast()
        const url = `/api/pessoa/remover/${id}`

        try {
            const responseRequest = await fetchProvider.delete(url)
            const { status } = responseRequest

            if (status === TipoHttpCodes.OK) {
                const { message, object } = responseRequest
                if (object) toast.success(message)
                return true
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
            return null
        }
    }

    static async savePerson(person, fetchProvider) {
        const toast = useToast()
        const url = `/api/pessoa/salvar`

        try {
            const responseRequest = await fetchProvider.post(url, person)
            const { status } = responseRequest

            if (status === TipoHttpCodes.OK) {
                const { message, object } = responseRequest.data
                toast.success(message)
                return object
            }
        } catch ({ response }) {

            if (response.status === TipoHttpCodes.UNAUTHORIZED) {
                toast.error(
                    "Credenciais estão erradas revise e tente novamente"
                )
            }

            return null
        }

    }

    static async findPersonById(id, fetchProvider) {

        const toast = useToast()
        const url = `/api/pessoa/buscar/${id}`

        try {
            const responseRequest = await fetchProvider.get(url)
            const { status } = responseRequest

            if (status === TipoHttpCodes.OK) {
                const { object, message } = responseRequest?.data

                if (!!object) {
                    return object
                }

                toast.info(message)
                return null
            }
        } catch ({ response }) {
            const { data } = response

            if (response.status === TipoHttpCodes.UNAUTHORIZED) {
                toast.error("Credenciais estão erradas revise e tente novamente")
            }

            if (response.status === TipoHttpCodes.BAD_REQUEST) {
                const { message } = data
                toast.error(message)
            }

            return null
        }

    }

    static async uploadFoto(id, foto, fetchProvider) {
        const toast = useToast()
        const url = `/api/foto/upload/${id}`
        const headers = {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
        }
        const formData = new FormData()

        formData.append("image", foto, foto.name)

        try {
            const response = await fetchProvider.post(url, formData, { headers })
            console.log(response)
        } catch ({ response }) {
            if (response?.status === TipoHttpCodes.BAD_REQUEST) {
                toast.error('Ocorreu um erro ao realizar o upload')
            }
        }
    }

}
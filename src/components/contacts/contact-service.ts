import { TipoHttpCodes } from "../../core/enums/tipo-httpcodes.enum"
import { useToast } from "vue-toastification"

export class ContactService {

    static async saveContact(value, fetchProvider): Promise<any> {

        const toast = useToast()
        const url = `/api/contato/salvar`

        try {
            const responseRequest = await fetchProvider.post(url, value)
            const { status } = responseRequest

            if (status === TipoHttpCodes.OK) {
                const { object, message } = responseRequest?.data

                if (!object) {
                    toast.info(message)
                    return null
                }

                toast.success(`Contato ${object?.pessoa?.nome} salvo com Sucesso`)
                return object

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

    static async searchContact(value, fetchProvider): Promise<any> {

        const toast = useToast()
        const url = `/api/contato/pesquisar`

        try {

            const responseRequest = await fetchProvider.post(url, value)
            const { status } = responseRequest

            if (status === TipoHttpCodes.OK) {
                const { data } = responseRequest

                if (!data?.length) {
                    toast.info(`Não foi encontrado nenhum resultado para o termo: ${value.termo}`)
                    return null
                }

                return data
            }

        } catch ({ response }) {

            if (response.status === TipoHttpCodes.NOT_FOUND) {
                toast.error(`Não foi encontrado nenhum resultado para o termo: ${value.termo}`)
            }

            return null
        }
    }

    static async deleteContact(id, fetchProvider): Promise<any> {

        const toast = useToast()
        const url = `/api/contato/remover/${id}`

        try {
            const responseRequest = await fetchProvider.delete(url)
            const { status } = responseRequest

            if (status === TipoHttpCodes.OK) {
                const { message, object } = responseRequest?.data
                toast.success(message)
                return object
            }

            return null

        } catch ({ response }) {

            if (response.status === TipoHttpCodes.NO_CONTENT) {
                toast.error(`Não existe contato com este identificador: ${id}`)
            }

            return null
        }
    }


    static async getContactFromIDPerson(id, fetchProvider): Promise<any> {
        const toast = useToast()
        const url = `/api/contato/listar/${id}`

        try {
            const responseRequest = await fetchProvider.get(url)
            const { status } = responseRequest

            if (status === TipoHttpCodes.OK) {
                const response = responseRequest?.data

                if (!!response.length) {
                    return response[0]
                }

                toast.info("Não foi encontrado registro para o contato")

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


}
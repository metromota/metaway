import { useToast } from "vue-toastification"
import { TipoHttpCodes } from "../../core/enums/tipo-httpcodes.enum"

export class DashService {

    static async downloadFoto(id, fetchProvider): Promise<any> {
        const url = `/api/foto/download/${id}`
        const response = await fetchProvider.get(url, { responseType: 'blob' })
        const { status } = response
        if (status === TipoHttpCodes.OK) {
            return response
        }
        return null
    }

    static async deleteContactFav(contato_id, fetchProvider): Promise<any> {

        const toast = useToast()
        const url = `/api/favorito/remover/${contato_id}`

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
                toast.error(`Não existe contato favorito com este identificador: ${contato_id}`)
            }

            return null
        }
    }

    static async searchContactFav(fetchProvider): Promise<any> {

        const toast = useToast()
        const url = `/api/favorito/pesquisar`

        try {

            const responseRequest = await fetchProvider.get(url)
            const { status } = responseRequest

            if (status === TipoHttpCodes.OK) {
                return responseRequest.data
            }

        } catch ({ response }) {

            if (response.status === TipoHttpCodes.NOT_FOUND) {
                toast.error(`Não foi encontrado nenhum resultado`)
            }

            return null
        }
    }

    static async saveContactFav(value, fetchProvider): Promise<any> {

        const toast = useToast()
        const url = `/api/favorito/salvar`

        try {
            const responseRequest = await fetchProvider.post(url, value)
            const { status } = responseRequest

            if (status === TipoHttpCodes.OK) {
                const { object, message } = responseRequest?.data

                if (!object) {
                    toast.info(message)
                    return null
                }

                toast.success(`Favorito salvo com Sucesso`)
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
}


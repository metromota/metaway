import { TipoContato } from "@core/enums/tipo-contato.enum"
import { Person } from "./person"
import { User } from "./user"

export interface Contact {
    id?: number,
    fav?: boolean
    email: string,
    pessoa?: Person,
    privado: boolean,
    tag: string,
    telefone: string,
    tipoContato?: TipoContato,
    usuario?: User
    foto?: string
}
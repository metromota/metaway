import { Address } from "./address"
import { Photo } from "./photo"

export interface Person {
    id?: number
    cpf: string
    nome: string
    endereco: Address
    foto: Photo
}
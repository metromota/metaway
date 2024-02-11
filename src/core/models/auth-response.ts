import { RoleUser } from "@core/enums/tipo-acesso.enum"

export interface AuthResponse {
    id?: number
    accessToken: string
    tipos: RoleUser[]
    tokenType: string
    username: string
}
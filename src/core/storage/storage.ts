import { AuthResponse } from "@core/models/auth-response"

export abstract class Storage {
    static saveInfoOnStorage(response: AuthResponse): boolean {
        const { accessToken, id } = response
        localStorage.setItem("@metaway-token", accessToken)
        localStorage.setItem("@metaway-id", JSON.stringify(id))
        return true
    }
    static getToken() {
        return localStorage.getItem('@metaway-token')
    }
}
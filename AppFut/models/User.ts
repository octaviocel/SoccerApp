import Rol from "./Rol"

interface UserProperties {
    id?: number
    nombre?: string
    apepat?: string
    apemat?: string
    email?: string
    rol?: Rol
}

export default class User {
    id
    nombre
    apepat
    apemat
    email
    role
    constructor(propierties: UserProperties = {}) {
        this.id = propierties.id || 0
        this.nombre = propierties.nombre || ''
        this.apepat = propierties.apepat || ''
        this.apemat = propierties.apemat || ''
        this.email = propierties.email || ''
        this.role = propierties.rol || new Rol()
    }

    fullName(): string {
        return `${this.nombre} ${this.apepat} ${this.apemat}`
    }

    isAdmin() {
        return this.role.descripcion === "ADMINISTRADOR"
    }

    isArbitro() {
        return this.role.descripcion === "ARBITRO"
    }
}
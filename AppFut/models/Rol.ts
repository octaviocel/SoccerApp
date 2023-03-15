interface RolProperties {
    id?: number
    descripcion?: string
}

export default class Rol {
    id
    descripcion
    constructor(properties: RolProperties = {}) {
        this.id = properties.id || 2
        this.descripcion = roles[this.id - 1] || 'USUARIO'
    }
}

const roles = ['ADMINISTRADOR', 'USUARIO', 'ARBITRO']
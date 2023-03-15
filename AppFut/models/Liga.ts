
interface LigaPropierties {
    id?: number,
    nombre?: string,
    fechaFundacion?: Date,
    foto?: string,
}

export default class Liga {
    id
    nombre
    fechaFundacion
    foto

    constructor(properties: LigaPropierties = {}) {
        this.id = properties.id || 0
        this.nombre = properties.nombre || ''
        this.fechaFundacion = properties.fechaFundacion || ''
        this.foto = properties.foto || ''
    }
}
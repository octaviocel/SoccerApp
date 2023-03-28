
interface LigaPropierties {
    id?: number,
    nombre?: string,
    fechaFundacion?: string,
    foto?: string,
    ubicacion?: string;
    totalEquipos?: string | number;
}

export default class Liga {
    id
    nombre
    fechaFundacion
    foto
    ubicacion
    totalEquipos

    constructor(properties: LigaPropierties = {}) {
        this.id = properties.id || 0
        this.nombre = properties.nombre || ''
        this.fechaFundacion = properties.fechaFundacion || ''
        this.foto = properties.foto || ''
        this.ubicacion = properties.ubicacion || ''
        this.totalEquipos = properties.totalEquipos || 0
    }
}
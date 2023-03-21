import Liga from "./Liga"


interface EquipoPropierties {
    id?: number
    nombre?: string
    entrenador?: string
    estadio?: string
    logo?: string
    liga?: Liga
}

export default class Equipo {
    id
    nombre
    entrenador
    estadio
    logo
    liga

    constructor(propierties: EquipoPropierties = {}) {
        this.id = propierties.id || 0
        this.nombre = propierties.nombre || ''
        this.entrenador = propierties.entrenador || ''
        this.estadio = propierties.estadio || ''
        this.logo = propierties.logo || ''
        this.liga = propierties.liga || new Liga()
    }

}
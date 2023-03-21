import Equipo from "./Equipo"
import User from "./User"


interface PartidoPropierties {
    id?: number
    arbitro?: User
    equipoLocal?: Equipo
    equipoVisita?: Equipo
    fecha?: Date
    hora?: string
    golesLocal?: number
    golesVisita?: number
    observaciones?: string
}

export default class Partido {
    id
    arbitro
    equipoLocal
    equipoVisita
    fecha
    hora
    golesLocal
    golesVisita
    observaciones
    constructor(propierties: PartidoPropierties = {}) {
        this.id = propierties.id || 0
        this.arbitro = propierties.arbitro || new User()
        this.equipoLocal = propierties.equipoLocal || new Equipo()
        this.equipoVisita = propierties.equipoVisita || new Equipo()
        this.fecha = propierties.fecha || new Date()
        this.hora = propierties.hora || ''
        this.golesLocal = propierties.golesLocal || 0
        this.golesVisita = propierties.golesVisita || 0
        this.observaciones = propierties.observaciones || ''

    }
}
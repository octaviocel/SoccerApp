import Equipo from "./Equipo"

interface JugadorPropierties {
    id?: number
    nombre?: string
    apePat?: string
    apeMat?: string
    fechaNacimiento?: Date | string
    altura?: number
    peso?: number
    numero?: number
    foto?: string
    equipo?: Equipo
    equipo_id?: number
}

export default class Jugador {
    id
    nombre
    apePat
    apeMat
    fechaNacimiento
    altura
    peso
    numero
    foto
    equipo
    equipo_id

    constructor(propierties: JugadorPropierties = {}) {
        this.id = propierties.id || 0
        this.nombre = propierties.nombre || ''
        this.apePat = propierties.apePat || ''
        this.apeMat = propierties.apeMat || ''
        this.fechaNacimiento = propierties.fechaNacimiento || new Date() || ''
        this.altura = propierties.altura || 0
        this.numero = propierties.numero || 0
        this.peso = propierties.peso || 0
        this.foto = propierties.foto || ''
        this.equipo = propierties.equipo || new Equipo()
        this.equipo_id = propierties.equipo_id || 0
    }

}
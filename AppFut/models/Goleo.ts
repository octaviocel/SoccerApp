import Jugador from "./Jugador"
import Partido from "./Partido"

interface GoleoPropierties {
    id?: number
    minuto?: number
    jugador?: Jugador
    partido?: Partido
}

export default class Goleo {
    id
    minuto
    jugador
    partido

    constructor(propierties: GoleoPropierties = {}) {
        this.id = propierties.id || 0
        this.minuto = propierties.minuto || 0
        this.jugador = propierties.jugador || new Jugador()
        this.partido = propierties.partido || new Partido()
    }
}
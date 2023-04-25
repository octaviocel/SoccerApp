interface PartidoPropierties {
    id?: number
    fecha?: Date
    hora?: string
    arbitroName?:string
    arbitroLast?:string
    local?:string
    visita?:string
    estadio?:string
    ubicacion?:string
}

export default class PartidoPen {
    id
    fecha
    hora
    arbitroName
    arbitroLast
    local
    visita
    estadio
    ubicacion
    constructor(propierties: PartidoPropierties = {}) {
        this.id = propierties.id || 0
        this.fecha = propierties.fecha || new Date()
        this.hora = propierties.hora || ''
        this.arbitroName = propierties.arbitroName || ''
        this.arbitroLast =propierties.arbitroLast||''
        this.local = propierties.local||''
        this.visita=propierties.visita||''
        this.estadio=propierties.visita||''
        this.ubicacion= propierties.visita||''

    }
}
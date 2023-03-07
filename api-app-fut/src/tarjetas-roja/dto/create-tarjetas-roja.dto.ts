import { Equipopartido } from './../../equipopartido/entities/equipopartido.entity';
import { Jugador } from './../../jugador/entities/jugador.entity';
import { IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateTarjetasRojaDto {
    @ApiProperty({
        description: 'Minuto de la Tarjeta Roja',
        nullable: false,
    })
    @IsNumber()
    munito: number;

    @ApiProperty({
        description: 'Jugador que recibi la tarjeta',
        nullable: false,
    })
    jugador_id: number;

    @ApiProperty({
        description: 'Partido en que se recibio la tarjeta',
        nullable: false,
    })
    partido_id: number;
}

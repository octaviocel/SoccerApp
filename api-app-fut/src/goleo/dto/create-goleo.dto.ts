import { Equipopartido } from './../../equipopartido/entities/equipopartido.entity';
import { Jugador } from './../../jugador/entities/jugador.entity';
import { IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateGoleoDto {
    @ApiProperty({
        description: 'Minuto del gol',
        nullable: false,
    })
    @IsNumber()
    munito: number;

    @ApiProperty({
        description: 'Jugador que anoto',
        nullable: false,
    })
    jugador_id: number;

    @ApiProperty({
        description: 'Partido en que se anoto el gol',
        nullable: false,
    })
    partido_id: number;
}

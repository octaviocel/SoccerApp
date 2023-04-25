import { Equipo } from './../../equipo/entities/equipo.entity';
import { IsString, IsDate, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateJugadorDto {

    @ApiProperty({
        description: 'Nombre del Jugador',
        nullable: false,
    })
    @IsString()
    nombre: string;

    @ApiProperty({
        description: 'Apellido Paterno del Jugador',
        nullable: false,
    })
    @IsString()
    apePat: string;

    @ApiProperty({
        description: 'Apellido Materno del Jugador',
        nullable: false,
    })
    @IsString()
    apeMat: string;

    @ApiProperty({
        description: 'Fecha de Nacimiento del Jugador',
        nullable: false,
    })
    @IsString()
    fechaNacimiento: string;

    @ApiProperty({
        description: 'Altura del Jugador en Metros',
        nullable: false,
    })
    @IsNumber()
    altura: number;

    @ApiProperty({
        description: 'Peso del Jugador en Kilogramos',
        nullable: false,
    })
    @IsNumber()
    peso: number;

    @ApiProperty({
        description: 'Numero que el jugador usa en el Equipo',
        nullable: false,
    })
    @IsNumber()
    numero: number;

    @ApiProperty({
        description: 'Foto del jugador',
        nullable: false,
    })
    @IsString()
    foto: string;

    @ApiProperty({
        description: 'Equipo del jugador',
        nullable: false,
    })
    equipo_id: number;
}

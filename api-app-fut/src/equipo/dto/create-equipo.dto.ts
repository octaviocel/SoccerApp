import { Liga } from './../../liga/entities/liga.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsEmail,
    IsNumber,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';


export class CreateEquipoDto {

    @ApiProperty({
        description: 'Nombre del Equipo',
        nullable: false,
    })
    @IsString()
    nombre: string;

    @ApiProperty({
        description: 'Nombre del Entrenador/Encargado del equipo',
        nullable: false,
    })
    @IsString()
    entrenador: string;

     @ApiProperty({
        description: 'Dirección del lugar y nombre del campo donde juega el equipo',
        nullable: false,
    })
    @IsString()
    estadio: string;

    @ApiProperty({
        description: 'Foto del Logo del equipo',
        nullable: false,
    })
    @IsString()
    logo: string;

    @ApiProperty({
        description: 'Liga a la que pertenece el equipo',
        nullable: false,
    })
    liga_id: number;
}

import { Rol } from './../../rol/entities/rol.entity';
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

export class CreateUsuarioDto {


    @ApiProperty({
        description: 'Nombre del usuario',
        nullable: false,
    })
    @IsString()
    nombre: string;

    @ApiProperty({
        description: 'Apellido Paterno del usuario',
        nullable: false,
    })
    @IsString()
    apepat: string;

    @ApiProperty({
        description: 'Apellido Materno del usuario',
        nullable: true,
    })
    @IsString()
    apemat: string;

    @ApiProperty({
        description: 'Email de logeo del usuario',
        nullable: false,
    })
    @IsString()
    email: string;

    @ApiProperty({
        description: 'Constraseña del usuario',
        nullable: false,
    })
    @IsString()
    password: string;

    @ApiProperty({
        description: 'rol del usuario',
        nullable: false,
    })
    @IsNumber()
    rol_id: number;
}

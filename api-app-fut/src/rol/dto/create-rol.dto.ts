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

export class CreateRolDto {

    @ApiProperty({
        description: 'Descripcion del rol',
        nullable: false,
    })
    @IsString()
    descripcion: string;
}

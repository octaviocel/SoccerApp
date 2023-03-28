import { IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateLigaDto {
    @ApiProperty({
        description: 'Nombre de la liga',
        nullable: false,
    })
    @IsString()
    nombre: string;

    @ApiProperty({
        description: 'Fecha de Creacion de la Liga',
        nullable: false,
    })
   // @IsDate()
   @IsString()
    fechaFundacion: string;

    @ApiProperty({
        description: 'Foto de la Liga',
        nullable: false,
    })
    @IsString()
    foto: string;

    @ApiProperty({
        description: 'Ubicacion de la Liga',
        nullable: false,
    })
    @IsString()
    ubicacion: string;

}

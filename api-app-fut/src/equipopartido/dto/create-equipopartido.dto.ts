import { Equipo } from './../../equipo/entities/equipo.entity';
import { Usuario } from './../../usuario/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';
export class CreateEquipopartidoDto {

    @ApiProperty({
        description: 'Arbitro que preside el partido',
        nullable: false,
    })
    arbitro_id: number;

    @ApiProperty({
        description: 'Id del equipo Local',
        nullable: false,
    })
    local_id: number;

     @ApiProperty({
        description: 'Id del equipo Visitante',
        nullable: false,
    })
    visita_id: number;

    @ApiProperty({
        description: 'Fecha en que se realiza',
        nullable: false,
    })
    @IsDate()
    fecha: Date;

    @ApiProperty({
        description: 'Horario Asignado',
        nullable: false,
    })
    @IsString()
    hora: string;

    @ApiProperty({
        description: 'Goles del equipo Local',
        nullable: false,
    })
    @IsNumber()
    golesLocal: number;

    @ApiProperty({
        description: 'Goles del equipo Visitante',
        nullable: false,
    })
    @IsNumber()
    golesVisita: number;
    
    
    @ApiProperty({
        description: 'Observaciones del encuentro',
        nullable: false,
    })
    @IsString()
    observaciones: string;
}

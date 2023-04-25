import { Equipo } from './../../equipo/entities/equipo.entity';
import { Usuario } from './../../usuario/entities/usuario.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsNumber, IsString } from 'class-validator';
export class CreateEquipopartidoDto {

    @ApiProperty({
        description: 'Arbitro que preside el partido',
        nullable: false,
    })
    @IsNumber()
    arbitro_id: number;

    @ApiProperty({
        description: 'Id del equipo Local',
        nullable: false,
    })
    @IsNumber()
    local_id: number;

     @ApiProperty({
        description: 'Id del equipo Visitante',
        nullable: false,
    })
    @IsNumber()
    visita_id: number;

    @ApiProperty({
        description: 'Fecha en que se realiza',
        nullable: false,
    })
    @IsString()
    fecha: string;

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

    @ApiProperty({
        description: 'Si el partido ya concluyo',
        nullable: false,
    })
    @IsBoolean()
    finalizado: boolean;
}

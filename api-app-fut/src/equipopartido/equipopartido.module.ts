import { Equipopartido } from './entities/equipopartido.entity';
import { Usuario } from './../usuario/entities/usuario.entity';
import { Equipo } from './../equipo/entities/equipo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { EquipopartidoService } from './equipopartido.service';
import { EquipopartidoController } from './equipopartido.controller';

@Module({
  controllers: [EquipopartidoController],
  providers: [EquipopartidoService],
  imports:[TypeOrmModule.forFeature([Equipopartido]),],

})
export class EquipopartidoModule {}

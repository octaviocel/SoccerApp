import { Equipo } from './entities/equipo.entity';
import { Module } from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { EquipoController } from './equipo.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Liga } from 'src/liga/entities/liga.entity';

@Module({
  controllers: [EquipoController],
  providers: [EquipoService],
  imports: [ TypeOrmModule.forFeature([Equipo]),],
  
})
export class EquipoModule {}

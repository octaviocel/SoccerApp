import { Goleo } from './entities/goleo.entity';
import { Equipopartido } from './../equipopartido/entities/equipopartido.entity';
import { Jugador } from './../jugador/entities/jugador.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { GoleoService } from './goleo.service';
import { GoleoController } from './goleo.controller';

@Module({
  controllers: [GoleoController],
  providers: [GoleoService],
  imports:[TypeOrmModule.forFeature([Goleo]),],
  //exports:[TypeOrmModule],
})
export class GoleoModule {}

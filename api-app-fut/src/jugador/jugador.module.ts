import { Jugador } from './entities/jugador.entity';
import { Equipo } from './../equipo/entities/equipo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { JugadorService } from './jugador.service';
import { JugadorController } from './jugador.controller';

@Module({
  controllers: [JugadorController],
  providers: [JugadorService],
  imports:[TypeOrmModule.forFeature([Jugador]),],
  //exports:[TypeOrmModule],
})
export class JugadorModule {}

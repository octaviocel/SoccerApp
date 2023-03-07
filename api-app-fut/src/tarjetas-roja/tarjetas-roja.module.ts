import { TarjetasRoja } from './entities/tarjetas-roja.entity';
import { Equipopartido } from './../equipopartido/entities/equipopartido.entity';
import { Jugador } from './../jugador/entities/jugador.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TarjetasRojaService } from './tarjetas-roja.service';
import { TarjetasRojaController } from './tarjetas-roja.controller';

@Module({
  controllers: [TarjetasRojaController],
  providers: [TarjetasRojaService],
  imports:[TypeOrmModule.forFeature([TarjetasRoja]),],
  //exports:[TypeOrmModule],
})
export class TarjetasRojaModule {}

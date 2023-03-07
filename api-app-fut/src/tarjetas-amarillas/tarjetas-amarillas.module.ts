import { TarjetasAmarilla } from './entities/tarjetas-amarilla.entity';
import { Equipopartido } from './../equipopartido/entities/equipopartido.entity';
import { Jugador } from './../jugador/entities/jugador.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { TarjetasAmarillasService } from './tarjetas-amarillas.service';
import { TarjetasAmarillasController } from './tarjetas-amarillas.controller';

@Module({
  controllers: [TarjetasAmarillasController],
  providers: [TarjetasAmarillasService],
  imports:[TypeOrmModule.forFeature([TarjetasAmarilla]),],
  //exports:[TypeOrmModule],
})
export class TarjetasAmarillasModule {}

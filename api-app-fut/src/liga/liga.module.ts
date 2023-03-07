import { Liga } from './entities/liga.entity';
import { Module } from '@nestjs/common';
import { LigaService } from './liga.service';
import { LigaController } from './liga.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [LigaController],
  providers: [LigaService],
  // exports: [TypeOrmModule]
  imports: [TypeOrmModule.forFeature([Liga])]
})
export class LigaModule { }

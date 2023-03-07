import { Usuario } from './entities/usuario.entity';
import { RolModule } from './../rol/rol.module';
import { Module } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from 'src/rol/entities/rol.entity';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService],
  imports : [TypeOrmModule.forFeature([Usuario])]
})
export class UsuarioModule {}

import { Usuario } from './entities/usuario.entity';
import { RolModule } from './../rol/rol.module';
import { Module, forwardRef } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UsuarioController } from './usuario.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rol } from 'src/rol/entities/rol.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UsuarioController],
  providers: [UsuarioService],
  imports : [TypeOrmModule.forFeature([Usuario]), forwardRef(() => AuthModule)],
  // https://docs.nestjs.com/fundamentals/circular-dependency
  exports:[TypeOrmModule],
})
export class UsuarioModule {}

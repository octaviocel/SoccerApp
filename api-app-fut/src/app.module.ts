import { LoggerMiddleware } from './utils/logger.middleware';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RolModule } from './rol/rol.module';
import { UsuarioModule } from './usuario/usuario.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LigaModule } from './liga/liga.module';
import { EquipoModule } from './equipo/equipo.module';
import { JugadorModule } from './jugador/jugador.module';
import { EquipopartidoModule } from './equipopartido/equipopartido.module';
import { GoleoModule } from './goleo/goleo.module';
import { TarjetasAmarillasModule } from './tarjetas-amarillas/tarjetas-amarillas.module';
import { TarjetasRojaModule } from './tarjetas-roja/tarjetas-roja.module';
import { S3Module } from './s3/s3.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    autoLoadEntities: true,
    synchronize: process.env.DB_SYNC === 'true' ? true : false,
    dropSchema: process.env.DB_SYNC === 'true' ? true : false,
    logging: ['error'],
  }),
    RolModule,
    UsuarioModule,
    LigaModule,
    EquipoModule,
    JugadorModule,
    EquipopartidoModule,
    GoleoModule,
    TarjetasAmarillasModule,
    TarjetasRojaModule,
    S3Module,
  //  AuthModule,
  ],
  controllers: [],
  providers: [],

})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');

  }
}

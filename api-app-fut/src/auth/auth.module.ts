import { AuthService } from './auth.service';
import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { JWTStrategy } from './strategies/jwt.strategy';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioModule } from 'src/usuario/usuario.module';

@Module({
    controllers: [AuthController],
    providers: [AuthService, JWTStrategy],
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),

        JwtModule.registerAsync({
            useFactory: () => {
                return {
                    secret: process.env.JWT_SECRET,
                    signOptions: { expiresIn: '365d' },
                }
            }
        }),

        UsuarioModule,
    ],
    exports:[JWTStrategy, PassportModule, JwtModule, AuthService],
})

export class AuthModule{}
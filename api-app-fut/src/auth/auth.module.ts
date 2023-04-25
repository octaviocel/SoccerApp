import { AuthService } from './auth.service';
import { Module, forwardRef } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { JWTStrategy } from './strategies/jwt.strategy';

import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { UsuarioModule } from 'src/usuario/usuario.module';
import { UsuarioService } from 'src/usuario/usuario.service';

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
            },
        }),

        forwardRef(() => UsuarioModule),
    ],
    exports:[JWTStrategy, PassportModule, JwtModule, AuthService],
})

export class AuthModule{}
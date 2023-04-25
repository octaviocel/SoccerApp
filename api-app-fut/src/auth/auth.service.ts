import { LoginUserDto } from './dto/login.dto';
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { JWTPayload } from './interfaces/jwt-payload.interface';
import { Usuario } from 'src/usuario/entities/usuario.entity';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Usuario)
        private readonly userRespositor: Repository<Usuario>,

        private readonly jwtService: JwtService,
    ) { }

    async login(loginUserDto: LoginUserDto) {
        const { password, email } = loginUserDto;

        const user = await this.userRespositor.findOne({
            where: { email },
            select: { email: true, password: true, id: true, nombre: true, apepat: true , apemat: true},
        });

        if (!user) throw new UnauthorizedException('Credenciales incorrectas');

        if (!bcrypt.compareSync(password, user.password))
            throw new UnauthorizedException('Credenciales incorrectas');

        delete user.password

        return { ...user, token: this.getJwtToken({ id: user.id }) };
    }

    getJwtToken(payload: JWTPayload) {
        const token = this.jwtService.sign(payload);
        return token;
    }
}
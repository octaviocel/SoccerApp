import { LoginUserDto } from './dto/login.dto';
import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";


@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('login')
    loginUser(@Body() loginDto: LoginUserDto) {
        return this.authService.login(loginDto);
    }
}
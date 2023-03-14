import { IsEmail, IsString } from "class-validator";


export class LoginUserDto {
    @IsEmail({}, { message: 'Debes colocar un correo' })
    email: string;

    @IsString()
    password: string;
}
import { UseGuards, applyDecorators } from "@nestjs/common";
import { ValidRols } from "../dto/validRols.enum";
import { RolProtected } from "./role-protected.decorator";
import { AuthGuard } from '@nestjs/passport';
import { UserRolGuard } from "../guards/user-rol.guard";

export function Auth(...roles: ValidRols[]) {
    return applyDecorators(
        RolProtected(...roles),
        UseGuards(AuthGuard(), UserRolGuard),
    )
}
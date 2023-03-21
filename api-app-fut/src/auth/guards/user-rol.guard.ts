
import { Observable } from "rxjs";
import { META_ROLES } from "../decorators/role-protected.decorator";
import { Usuario } from "src/usuario/entities/usuario.entity";
import { BadRequestException, CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";

@Injectable()
export class UserRolGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const validRoles: string[] = this.reflector.get(META_ROLES, context.getHandler())

        if (!validRoles) return true;
        if (validRoles.length === 0) return true;

        const req = context.switchToHttp().getRequest();
        const user = req.user as Usuario;

        if (!user) throw new BadRequestException('Usuario no encontrado')

        if (validRoles.includes(user.role.descripcion)) {
            return true;
        }

        throw new ForbiddenException(
            `User: ${user.nombre} no tienen permisos necesarios`
        );
    }
}
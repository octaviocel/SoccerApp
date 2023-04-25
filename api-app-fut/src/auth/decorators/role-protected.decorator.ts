import { SetMetadata } from "@nestjs/common";
import { ValidRols } from "../dto/validRols.enum";

export const META_ROLES = 'role';

export const RolProtected = (...args: ValidRols[]) => {
    return SetMetadata(META_ROLES, args);
}
import { PartialType } from '@nestjs/swagger';
import { CreateEquipopartidoDto } from './create-equipopartido.dto';

export class UpdateEquipopartidoDto extends PartialType(CreateEquipopartidoDto) {}

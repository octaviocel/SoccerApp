import { PartialType } from '@nestjs/swagger';
import { CreateTarjetasRojaDto } from './create-tarjetas-roja.dto';

export class UpdateTarjetasRojaDto extends PartialType(CreateTarjetasRojaDto) {}

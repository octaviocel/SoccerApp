import { PartialType } from '@nestjs/swagger';
import { CreateTarjetasAmarillaDto } from './create-tarjetas-amarilla.dto';

export class UpdateTarjetasAmarillaDto extends PartialType(CreateTarjetasAmarillaDto) {}

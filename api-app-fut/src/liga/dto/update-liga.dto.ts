import { PartialType } from '@nestjs/swagger';
import { CreateLigaDto } from './create-liga.dto';

export class UpdateLigaDto extends PartialType(CreateLigaDto) {}

import { PartialType } from '@nestjs/swagger';
import { CreateGoleoDto } from './create-goleo.dto';

export class UpdateGoleoDto extends PartialType(CreateGoleoDto) {}

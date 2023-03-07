import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TarjetasAmarillasService } from './tarjetas-amarillas.service';
import { CreateTarjetasAmarillaDto } from './dto/create-tarjetas-amarilla.dto';
import { UpdateTarjetasAmarillaDto } from './dto/update-tarjetas-amarilla.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('TarjetasAmarillas')
@Controller('tarjetas-amarillas')
export class TarjetasAmarillasController {
  constructor(private readonly tarjetasAmarillasService: TarjetasAmarillasService) {}

  @Post()
  create(@Body() createTarjetasAmarillaDto: CreateTarjetasAmarillaDto) {
    return this.tarjetasAmarillasService.create(createTarjetasAmarillaDto);
  }

  @Get()
  findAll() {
    return this.tarjetasAmarillasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tarjetasAmarillasService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTarjetasAmarillaDto: UpdateTarjetasAmarillaDto) {
    return this.tarjetasAmarillasService.update(+id, updateTarjetasAmarillaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tarjetasAmarillasService.remove(+id);
  }
}

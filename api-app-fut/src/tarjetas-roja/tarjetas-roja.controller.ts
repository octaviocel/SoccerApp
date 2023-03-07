import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TarjetasRojaService } from './tarjetas-roja.service';
import { CreateTarjetasRojaDto } from './dto/create-tarjetas-roja.dto';
import { UpdateTarjetasRojaDto } from './dto/update-tarjetas-roja.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('TarjetasRojas')
@Controller('tarjetas-roja')
export class TarjetasRojaController {
  constructor(private readonly tarjetasRojaService: TarjetasRojaService) {}

  @Post()
  create(@Body() createTarjetasRojaDto: CreateTarjetasRojaDto) {
    return this.tarjetasRojaService.create(createTarjetasRojaDto);
  }

  @Get()
  findAll() {
    return this.tarjetasRojaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tarjetasRojaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTarjetasRojaDto: UpdateTarjetasRojaDto) {
    return this.tarjetasRojaService.update(+id, updateTarjetasRojaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tarjetasRojaService.remove(+id);
  }
}

import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipopartidoService } from './equipopartido.service';
import { CreateEquipopartidoDto } from './dto/create-equipopartido.dto';
import { UpdateEquipopartidoDto } from './dto/update-equipopartido.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('EquipoxPartido')
@Controller('equipopartido')
export class EquipopartidoController {
  constructor(private readonly equipopartidoService: EquipopartidoService) {}

  @Post()
  create(@Body() createEquipopartidoDto: CreateEquipopartidoDto) {
    return this.equipopartidoService.create(createEquipopartidoDto);
  }

  @Get()
  findAll() {
    return this.equipopartidoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipopartidoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipopartidoDto: UpdateEquipopartidoDto) {
    return this.equipopartidoService.update(+id, updateEquipopartidoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipopartidoService.remove(+id);
  }
}

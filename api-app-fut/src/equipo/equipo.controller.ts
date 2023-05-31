import { Equipo } from './entities/equipo.entity';
import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { EquipoService } from './equipo.service';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Equipo')
@Controller('equipo')
export class EquipoController {
  constructor(private readonly equipoService: EquipoService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'Equipo creado', type: Equipo })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(@Body() createEquipoDto: CreateEquipoDto) {
    return this.equipoService.create(createEquipoDto);
  }

  @Get()
  findAll() {
    return this.equipoService.findAll();
  }

  @Get('liga/:id')
  findAllByLiga(@Param('id') id: string) {
    return this.equipoService.findAllByLiga(+id);
  }
  
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.equipoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEquipoDto: UpdateEquipoDto) {
    return this.equipoService.update(+id, updateEquipoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.equipoService.remove(+id);
  }
}

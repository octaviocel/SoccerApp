import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LigaService } from './liga.service';
import { CreateLigaDto } from './dto/create-liga.dto';
import { UpdateLigaDto } from './dto/update-liga.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Liga')
@Controller('liga')
export class LigaController {
  constructor(private readonly ligaService: LigaService) {}

  @Post()
  create(@Body() createLigaDto: CreateLigaDto) {
    return this.ligaService.create(createLigaDto);
  }

  @Get()
  findAll() {
    return this.ligaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ligaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLigaDto: UpdateLigaDto) {
    return this.ligaService.update(+id, updateLigaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ligaService.remove(+id);
  }
}

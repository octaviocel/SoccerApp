import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GoleoService } from './goleo.service';
import { CreateGoleoDto } from './dto/create-goleo.dto';
import { UpdateGoleoDto } from './dto/update-goleo.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Goleo')
@Controller('goleo')
export class GoleoController {
  constructor(private readonly goleoService: GoleoService) {}

  @Post()
  create(@Body() createGoleoDto: CreateGoleoDto) {
    return this.goleoService.create(createGoleoDto);
  }

  @Get()
  findAll() {
    return this.goleoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goleoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGoleoDto: UpdateGoleoDto) {
    return this.goleoService.update(+id, updateGoleoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goleoService.remove(+id);
  }
}

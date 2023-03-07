import { NotFoundException } from '@nestjs/common/exceptions';
import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { CreateEquipoDto } from './dto/create-equipo.dto';
import { UpdateEquipoDto } from './dto/update-equipo.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Equipo } from './entities/equipo.entity';
import { Repository } from 'typeorm';

@Injectable()
export class EquipoService {

  constructor(
    @InjectRepository(Equipo)
    private readonly equipoRepository: Repository<Equipo>
  ) { }

  async create(createEquipoDto: CreateEquipoDto) {
    try {
      const { ...data } = createEquipoDto;

      const team = this.equipoRepository.create({
        ...data,
      });

      await this.equipoRepository.save(team);

      return { team }
    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async findAll() {
    return await this.equipoRepository.find();
  }

  async findOne(id: number) {
    const team = await this.equipoRepository.findOneBy({ id });
    if (!team) {
      throw new NotFoundException(`Team not Found code ${id}`)
    }

    return team;
  }

  async update(id: number, updateEquipoDto: UpdateEquipoDto) {
    const find = await this.findOne(id);
    if (!find) {
      throw new NotFoundException(`Team not Found code ${id}`)

    }

    await this.equipoRepository.update(id, updateEquipoDto);
    return { message: "Team updated" }
  }

  async remove(id: number) {
    return `This action removes a #${id} equipo`;
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Intentalo de nuevo mas terde');
  }
}

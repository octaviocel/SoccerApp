import { NotFoundException } from '@nestjs/common/exceptions';
import { Equipopartido } from './entities/equipopartido.entity';
import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateEquipopartidoDto } from './dto/create-equipopartido.dto';
import { UpdateEquipopartidoDto } from './dto/update-equipopartido.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class EquipopartidoService {

  constructor(
    @InjectRepository(Equipopartido)
    private readonly partidoRepository: Repository<Equipopartido>
  ){}

  async create(createEquipopartidoDto: CreateEquipopartidoDto) {
    try {
      const { ...data } = createEquipopartidoDto;

      const game = this.partidoRepository.create({
        ...data,
      })

      await this.partidoRepository.save(game);

      return { game }
    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async findAll() {
    return await this.partidoRepository.find();
  }

  async findOne(id: number) {
    const partido = await this.partidoRepository.findOneBy({ id });
    if (!partido) {
      throw new NotFoundException(`Game not Found code ${id}`)
    }

    return partido;
  }

  async update(id: number, updateEquipopartidoDto: UpdateEquipopartidoDto) {
    await this.findOne(id)

    await this.partidoRepository.update(id, updateEquipopartidoDto);

    return { message: "Game updated" }
  }

  async remove(id: number) {
    const partido = await this.findOne(id);

    if (!partido) {
      throw new NotFoundException("Fail Removing")
    }
    
    await this.partidoRepository.delete(partido);

    return { message: "Delete Succesfully" }
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Intentalo de nuevo mas terde');
  }
}

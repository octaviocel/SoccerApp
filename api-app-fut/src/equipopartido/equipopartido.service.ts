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
  ) { }

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

  async findPartidosPendiente() {
    const partidos = await this.partidoRepository
      .createQueryBuilder('e')
      .addSelect('e.id','id')
      .addSelect('e.fecha','fecha')
      .addSelect('e.hora','hora')
      .addSelect('a.nombre','arbitroName')
      .addSelect('a.apepat','arbitroLast')
      .addSelect('e1.nombre','local')
      .addSelect('e2.nombre','visita')
      .addSelect('e1.estadio','estadio')
      .addSelect('l.ubicacion','ubicacion')
      .innerJoin('e.arbitro', 'a')
      .innerJoin('e.equipoLocal', 'e1')
      .innerJoin('e.equipoVisita', 'e2')
      .innerJoin('e1.liga', 'l')
      .where('e.finalizado = :finalizado', { finalizado: false })
      .groupBy('e.id,e.fecha, e.hora, a.nombre, a.apepat, e1.nombre, e1.estadio, e2.nombre, l.ubicacion')
      .orderBy('e.fecha', 'ASC')
      .getRawMany();

    if (!partidos) {
      throw new NotFoundException(`Game not Found code`)
    }

    return partidos;
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

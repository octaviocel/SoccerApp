import { NotFoundException } from '@nestjs/common/exceptions';
import { TarjetasAmarilla } from './entities/tarjetas-amarilla.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateTarjetasAmarillaDto } from './dto/create-tarjetas-amarilla.dto';
import { UpdateTarjetasAmarillaDto } from './dto/update-tarjetas-amarilla.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TarjetasAmarillasService {
  constructor(
    @InjectRepository(TarjetasAmarilla)
    private readonly amarillasRepository: Repository<TarjetasAmarilla>
  ) { }

  async create(createAmarrilaDto: CreateTarjetasAmarillaDto) {
    try {
      const { ...data } = createAmarrilaDto;

      const user = this.amarillasRepository.create({
        ...data,
      });

      await this.amarillasRepository.save(user)

      return { user }
    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async findAll() {
    return await this.amarillasRepository.find();
  }

  async findOne(id: number) {
    const user = await this.amarillasRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Yellow Card not Found code ${id}`)
    }

    return user;
  }

  async update(id: number, updateAmarrillaDto: UpdateTarjetasAmarillaDto) {
    const player = await this.findOne(id)

    if (!player) {
      throw new NotFoundException(`Yellow Card not Found code ${id}`)
    }

    await this.amarillasRepository.update(id, updateAmarrillaDto);

    return { message: "Yellow Card updated" }
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException("Fail Removing")
    }

    await this.amarillasRepository.delete(user);

    return { message: "Delete Succesfully" }
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Intentalo de nuevo mas terde');
  }

}

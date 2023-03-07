import { NotFoundException } from '@nestjs/common/exceptions';
import { TarjetasRoja } from './entities/tarjetas-roja.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateTarjetasRojaDto } from './dto/create-tarjetas-roja.dto';
import { UpdateTarjetasRojaDto } from './dto/update-tarjetas-roja.dto';
import { Repository } from 'typeorm';

@Injectable()
export class TarjetasRojaService {
  constructor(
    @InjectRepository(TarjetasRoja)
    private readonly rojasRepository: Repository<TarjetasRoja>
  ) { }

  async create(createRojaDto: CreateTarjetasRojaDto) {
    try {
      const { ...data } = createRojaDto;

      const user = this.rojasRepository.create({
        ...data,
      });

      await this.rojasRepository.save(user)

      return { user }
    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async findAll() {
    return await this.rojasRepository.find();
  }

  async findOne(id: number) {
    const user = await this.rojasRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Red Card not Found code ${id}`)
    }

    return user;
  }

  async update(id: number, updateRojaDto: UpdateTarjetasRojaDto) {
    const player = await this.findOne(id)

    if (!player) {
      throw new NotFoundException(`Yellow Card not Found code ${id}`)
    }

    await this.rojasRepository.update(id, updateRojaDto);

    return { message: "Red Card updated" }
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException("Fail Removing")
    }

    await this.rojasRepository.delete(user);

    return { message: "Delete Succesfully" }
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Intentalo de nuevo mas terde');
  }

}

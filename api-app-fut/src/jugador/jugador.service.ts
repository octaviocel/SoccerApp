import { NotFoundException } from '@nestjs/common/exceptions';
import { Jugador } from './entities/jugador.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CreateJugadorDto } from './dto/create-jugador.dto';
import { UpdateJugadorDto } from './dto/update-jugador.dto';
import { Repository } from 'typeorm';

@Injectable()
export class JugadorService {
  constructor(
    @InjectRepository(Jugador)
    private readonly jugadorRepository: Repository<Jugador>
  ) { }

  async create(createJugadorDto: CreateJugadorDto) {
    try {
      const { ...data } = createJugadorDto;

      const user = this.jugadorRepository.create({
        ...data,
      });

      await this.jugadorRepository.save(user)

      return { user }
    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async findAll() {
    return await this.jugadorRepository.find();
  }

  async findOne(id: number) {
    const user = await this.jugadorRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Player not Found code ${id}`)
    }

    return user;
  }

  async update(id: number, updateJugadorDto: UpdateJugadorDto) {
    const player = await this.findOne(id)

    if (!player) {
      throw new NotFoundException(`Player not Found code ${id}`)
    }

    await this.jugadorRepository.update(id, updateJugadorDto);

    return { message: "User updated" }
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    if (!user) {
      throw new NotFoundException("Fail Removing")
    }

    await this.jugadorRepository.delete(user);

    return { message: "Delete Succesfully" }
  }

  private handleDBErrors(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Intentalo de nuevo mas terde');
  }

}

